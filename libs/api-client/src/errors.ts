/**
 * API client error with status and optional validation details
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string, public readonly issues?: unknown) {
    super(message, 400, issues);
    this.name = 'ValidationError';
  }
}
