import * as v from 'valibot';

export const onboardingSchema = v.object({
	// Company
	companyName: v.pipe(v.string(), v.minLength(2, 'Company name must be at least 2 characters')),

	companyEmail: v.pipe(v.string(), v.email('Please enter a valid email')),

	companyPhone: v.optional(v.string()),

	companyAddress: v.optional(v.string()),

	// Branch
	branchName: v.pipe(v.string(), v.minLength(2, 'Branch name must be at least 2 characters')),

	branchEmail: v.optional(v.pipe(v.string(), v.email())),

	branchPhone: v.optional(v.string()),

	branchAddress: v.pipe(v.string(), v.minLength(1, 'Branch address is required')),

	// Localization
	defaultCurrencyId: v.pipe(v.string(), v.uuid('Please select a valid currency')),

	defaultLanguage: v.pipe(v.string(), v.minLength(1, 'Please select a language')),

	timezone: v.pipe(v.string(), v.minLength(1, 'Please select a timezone')),

	taxEnabled: v.optional(v.boolean(), true)
});

export type OnboardingSchema = v.InferOutput<typeof onboardingSchema>;
