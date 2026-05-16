import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { eq, count, sql } from 'drizzle-orm';
import { invalidateOnboardedCache } from '@/server/system-cache';
import { db } from '@/db';
import { seedOnboardingDefaults } from '@/db/seed-onboarding';
import {
	branches,
	currencies,
	languages,
	roles,
	settings,
	systemSettings,
	userRoles,
	users
} from '@/db/schemas';

import { onboardingSchema } from '@/schemas/onboarding';

export const load: PageServerLoad = async () => {
	const system = await db.query.systemSettings.findFirst();

	if (system?.isOnboarded) {
		throw redirect(303, '/');
	}

	const [currList, langList, roleCount] = await Promise.all([
		db
			.select({
				id: currencies.id,
				name: currencies.name,
				symbol: currencies.symbol
			})
			.from(currencies)
			.where(eq(currencies.status, 'ACTIVE')),

		db
			.select({
				id: languages.id,
				name: languages.name,
				code: languages.code
			})
			.from(languages)
			.where(eq(languages.status, 'ACTIVE')),

		db.select({ count: count() }).from(roles).where(eq(roles.name, 'Admin'))
	]);

	const form = await superValidate(
		{
			branchName: 'Main Branch',
			branchAddress: '123 Main St, Anytown, USA',
			branchEmail: 'admin@bitez.aakash.dev',
			branchPhone: '+91 9876543210',
			companyName: 'BiteZ',
			companyEmail: 'admin@bitez.aakash.dev',
			companyPhone: '+91 9876543210',
			companyAddress: '123 Main St, Anytown, USA'
		},
		valibot(onboardingSchema)
	);

	return {
		form,
		currencies: currList,
		languages: langList,
		hasAdminRole: roleCount[0].count > 0
	};
};

export const actions: Actions = {
	importDefaults: async ({ locals }) => {
		if (!locals.user) {
			return fail(401, {
				success: false,
				message: 'Unauthorized'
			});
		}

		try {
			await seedOnboardingDefaults();

			return {
				success: true,
				message: 'Defaults Imported Successfully'
			};
		} catch (error) {
			console.error('Error importing defaults:', error);

			return fail(500, {
				success: false,
				message: 'Failed to import defaults'
			});
		}
	},
	setup: async ({ request, locals }) => {
		const system = await db.query.systemSettings.findFirst();
		if (system?.isOnboarded) {
			throw redirect(303, '/');
		}

		const form = await superValidate(request, valibot(onboardingSchema));
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await db.transaction(async (tx) => {
				await tx.execute(sql`SELECT pg_advisory_xact_lock(123456789)`);

				const currentSystem = await tx.query.systemSettings.findFirst();
				if (currentSystem?.isOnboarded) {
					throw new Error('ALREADY_ONBOARDED');
				}

				let adminRole = await tx
					.select({ id: roles.id })
					.from(roles)
					.where(eq(roles.name, 'Admin'))
					.limit(1);

				if (adminRole.length === 0) {
					adminRole = await tx
						.insert(roles)
						.values({
							name: 'Admin',
							description: 'System Administrator'
						})
						.returning();
				}

				const adminRoleId = adminRole[0].id;

				await tx
					.insert(settings)
					.values([
						{ group: 'company', key: 'company_name', value: form.data.companyName },
						{ group: 'company', key: 'company_email', value: form.data.companyEmail },
						{ group: 'company', key: 'company_phone', value: form.data.companyPhone || '' },
						{ group: 'company', key: 'company_address', value: form.data.companyAddress || '' }
					])
					.onConflictDoUpdate({
						target: [settings.group, settings.key],
						set: { value: sql`excluded.value`, updatedAt: new Date() }
					});

				await tx
					.insert(settings)
					.values([
						{ group: 'site', key: 'site_default_currency', value: form.data.defaultCurrencyId },
						{ group: 'site', key: 'site_default_language', value: form.data.defaultLanguage },
						{ group: 'site', key: 'site_timezone', value: form.data.timezone },
						{ group: 'site', key: 'site_tax_enabled', value: String(form.data.taxEnabled) }
					])
					.onConflictDoUpdate({
						target: [settings.group, settings.key],
						set: { value: sql`excluded.value`, updatedAt: new Date() }
					});

				const [newBranch] = await tx
					.insert(branches)
					.values({
						name: form.data.branchName,
						email: form.data.branchEmail || null,
						phone: form.data.branchPhone || null,
						address: form.data.branchAddress,
						status: 'ACTIVE'
					})
					.returning({ id: branches.id });

				if (locals.user?.id) {
					await tx
						.insert(userRoles)
						.values({
							userId: locals.user.id,
							roleId: adminRoleId
						})
						.onConflictDoNothing();

					await tx
						.update(users)
						.set({ branchId: newBranch.id })
						.where(eq(users.id, locals.user.id));
				}

				if (!currentSystem) {
					await tx.insert(systemSettings).values({ isOnboarded: true });
				} else {
					await tx.update(systemSettings).set({ isOnboarded: true });
				}

				invalidateOnboardedCache();
			});
		} catch (err) {
			if (err instanceof Error && err.message === 'ALREADY_ONBOARDED') {
				throw redirect(303, '/');
			}
			console.error('Onboarding failed:', err);
			return message(form, 'Setup failed. Please try again.', { status: 500 });
		}

		throw redirect(303, '/');
	}
};
