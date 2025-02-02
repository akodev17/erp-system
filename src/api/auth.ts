import api from './axios';
import { AuthResponse, SignUpPayload, SignInPayload, User } from '../types/types';

export const authApi = {
  signUp: (data: SignUpPayload) =>
    api.post<AuthResponse>('/auths/sign-up', data),
  
  signIn: (data: SignInPayload) =>
    api.post<AuthResponse>('/auths/sign-in', data),
  
  getInfo: () => 
    api.get<User>('/auths/get-info'),
};