// types/api.ts

export interface ApiSuccessResponse<T> {
    success: true;
    message: string;
    data: T;
}

export interface ApiErrorResponse {
    success: false;
    message: string;
    errors?: Record<string, unknown>;
}

export type ApiResponse<T> =
    | ApiSuccessResponse<T>
    | ApiErrorResponse;