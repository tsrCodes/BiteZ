import { getTransporter, emailConfig } from './config';
import { renderEmail } from './renderer';
import type {
	VerificationEmailData,
	PasswordResetEmailData,
	WelcomeEmailData,
	CustomEmailData
} from './types';
import { VerificationEmail, ResetPasswordEmail, WelcomeEmail } from '$lib/emails';
import { APP_NAME, NODE_ENV } from '$env/static/private';
import type { Component } from 'svelte';

class EmailService {
	private async sendMail(
		to: string | string[],
		subject: string,
		html: string,
		priority?: 'high' | 'normal' | 'low'
	): Promise<void> {
		const transporter = getTransporter();
		await transporter.sendMail({
			from: `${emailConfig.from.name} <${emailConfig.from.email}>`,
			to,
			subject,
			html,
			priority
		});

		if (NODE_ENV !== 'production') {
			console.log(`📧 Email sent to ${to} (${subject})`);
		}
	}

	async sendVerificationEmail(data: VerificationEmailData): Promise<void> {
		const html = await renderEmail(VerificationEmail as Component, {
			name: data.name,
			verificationUrl: data.verificationUrl,
			appName: APP_NAME || 'BiteZ'
		});

		await this.sendMail(data.email, `Verify Your Email Address - ${APP_NAME || 'BiteZ'}`, html);
	}

	async sendPasswordResetEmail(data: PasswordResetEmailData): Promise<void> {
		const html = await renderEmail(ResetPasswordEmail as Component, {
			name: data.name,
			resetUrl: data.resetUrl,
			appName: APP_NAME || 'BiteZ'
		});

		await this.sendMail(data.email, `Reset Your Password - ${APP_NAME || 'BiteZ'}`, html);
	}

	async sendWelcomeEmail(data: WelcomeEmailData): Promise<void> {
		const html = await renderEmail(WelcomeEmail as Component, {
			name: data.name,
			loginUrl: data.loginUrl,
			appName: APP_NAME || 'BiteZ'
		});

		await this.sendMail(data.email, `Welcome to ${APP_NAME || 'BiteZ'}!`, html, 'high');
	}

	async sendCustomEmail(data: CustomEmailData): Promise<void> {
		const transporter = getTransporter();
		await transporter.sendMail({
			from: `${emailConfig.from.name} <${emailConfig.from.email}>`,
			to: data.to,
			subject: data.subject,
			html: data.html,
			text: data.text,
			priority: data.priority
		});
	}

	async verifyConnection(): Promise<boolean> {
		try {
			const transporter = getTransporter();
			await transporter.verify();
			return true;
		} catch (error) {
			console.error('Email connection verification failed:', error);
			return false;
		}
	}
}

// Export singleton instance
export const emailService = new EmailService();
