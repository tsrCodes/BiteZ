import { db } from '@/db';

import { currencies, languages } from '@/db/schemas';

export async function seedOnboardingDefaults() {
	await db
		.insert(languages)
		.values({
			name: 'English',
			code: 'en',
			displayMode: 'LTR',
			status: 'ACTIVE'
		})
		.onConflictDoNothing({
			target: languages.code
		});

	await db
		.insert(currencies)
		.values([
			{
				name: 'US Dollar',
				symbol: '$',
				code: 'USD',
				exchangeRate: '1.000000',
				status: 'ACTIVE'
			},
			{
				name: 'Indian Rupee',
				symbol: '₹',
				code: 'INR',
				exchangeRate: '83.500000',
				status: 'ACTIVE'
			},
			{
				name: 'Euro',
				symbol: '€',
				code: 'EUR',
				exchangeRate: '0.920000',
				status: 'ACTIVE'
			},
			{
				name: 'UAE Dirham',
				symbol: 'د.إ',
				code: 'AED',
				exchangeRate: '3.670000',
				status: 'ACTIVE'
			}
		])
		.onConflictDoNothing({
			target: currencies.code
		});

	console.log('✅ Onboarding seed data inserted');
}
