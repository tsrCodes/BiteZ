export interface VerificationEmailData {
	email: string;
	name: string;
	verificationUrl: string;
}

export interface PasswordResetEmailData {
	email: string;
	name: string;
	resetUrl: string;
}

export interface WelcomeEmailData {
	email: string;
	name: string;
	loginUrl: string;
}

export interface CustomEmailData {
	to: string | string[];
	subject: string;
	html: string;
	text?: string;
	priority?: 'high' | 'normal' | 'low';
}

export interface EmailConfig {
	host: string;
	port: number;
	secure: boolean;
	auth: {
		user: string;
		pass: string;
	};
	from: {
		name: string;
		email: string;
	};
	pool?: boolean;
	maxConnections?: number;
	rateLimit?: number;
}
