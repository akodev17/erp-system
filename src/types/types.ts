export interface SignUpPayload {
  fullName: string;
  login: string;
  password: string;
}

export interface SignInPayload {
  login: string;
  password: string;
}

export interface User {
  id: number;
  fullName: string;
  login: string;
}

export interface Company {
  id: string; // Using string for UUID
  name: string;
  count: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}