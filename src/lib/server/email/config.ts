import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import type { EmailConfig } from './types';
import {
	SMTP_HOST,
	SMTP_PORT,
	SMTP_SECURE,
	SMTP_USER,
	SMTP_PASS,
	EMAIL_FROM,
	EMAIL_FROM_NAME,
	APP_NAME,
	NODE_ENV
} from '$env/static/private';

export function validateEmailConfig(): void {
	const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'EMAIL_FROM'];
	const missing = required.filter((key) => !process.env[key]);

	if (missing.length > 0) {
		throw new Error(`Missing email configuration: ${missing.join(', ')}`);
	}
}

export const emailConfig: EmailConfig = {
	host: SMTP_HOST,
	port: parseInt(SMTP_PORT, 10),
	secure: SMTP_SECURE === 'true' || parseInt(SMTP_PORT, 10) === 465,
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASS
	},
	from: {
		name: EMAIL_FROM_NAME || APP_NAME || 'BiteZ',
		email: EMAIL_FROM
	},
	pool: true,
	maxConnections: 5,
	rateLimit: 10
};

let transporterInstance: Transporter | null = null;

export function getTransporter(): Transporter {
	if (!transporterInstance) {
		transporterInstance = nodemailer.createTransport({
			host: emailConfig.host,
			port: emailConfig.port,
			secure: emailConfig.secure,
			auth: {
				user: emailConfig.auth.user,
				pass: emailConfig.auth.pass
			},
			pool: emailConfig.pool,
			maxConnections: emailConfig.maxConnections,
			rateLimit: emailConfig.rateLimit,
			tls: {
				rejectUnauthorized: NODE_ENV === 'production'
			}
		} as nodemailer.TransportOptions);

		if (NODE_ENV !== 'production') {
			verifyConnection();
		}
	}
	return transporterInstance;
}

async function verifyConnection(): Promise<void> {
	try {
		await transporterInstance!.verify();
		console.log('✅ SMTP connection verified successfully');
	} catch (error) {
		console.error('❌ SMTP connection failed:', error);
	}
}
