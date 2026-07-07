// Shared API Response Type

export type ApiResponse<T = any> = {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}