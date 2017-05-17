import { AuthToken } from './auth-token'

export class AuthResponse {
    success: boolean;
    auth_token: AuthToken;
}