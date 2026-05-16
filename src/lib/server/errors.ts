export class AppError extends Error {
	public readonly code: string;
	public readonly status: number;
	constructor(code: string, message: string, status: number = 400) {
		super(message);
		this.code = code;
		this.status = status;
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}
export class NotFoundError extends AppError {
	constructor(message: string = 'Resource not found') {
		super('NOT_FOUND', message, 404);
	}
}
export class PermissionError extends AppError {
	constructor(message: string = 'Insufficient permissions') {
		super('FORBIDDEN', message, 403);
	}
}
export class AuthError extends AppError {
	constructor(message: string = 'Authentication required') {
		super('UNAUTHORIZED', message, 401);
	}
}
export class ValidationError extends AppError {
	constructor(message: string) {
		super('VALIDATION_ERROR', message, 400);
	}
}
export class ConflictError extends AppError {
	constructor(message: string) {
		super('CONFLICT', message, 409);
	}
}
