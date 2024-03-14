export class UserResponseDto<T = any> {
    success: boolean;
    status: number;
    data?: T;
    message: string;

    constructor(success: boolean, status: number, message: string, data?: T) {
        this.success = success;
        this.status = status;
        this.message = message;
        this.data = data;
    }
}