import { HttpStatus, HttpException } from '@nestjs/common';

export class ApiError extends HttpException {
  constructor(message: string, status: HttpStatus, errors: any[] = []) {
    super({ message, errors }, status);
  }

  static UnauthorizedError() {
    return new ApiError('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  static BadRequest(message: string, errors: any[] = []) {
    return new ApiError(message, HttpStatus.BAD_REQUEST, errors);
  }

  static DoesNotExist(message: string, errors: any[] = []) {
    return new ApiError(message, HttpStatus.NOT_FOUND, errors);
  }

  static NumberAlreadyExists(message: string) {
    return new ApiError(message, HttpStatus.BAD_REQUEST);
  }
}
