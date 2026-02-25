import api from './api';
import type { AuthResponse, User } from '../types';

export const authService = {
  register: async (data: { name: string; email: string; password: string; password_confirmation: string }) => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  getMe: async () => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  updateProfile: async (data: { name?: string; email?: string; password?: string; password_confirmation?: string }) => {
    const response = await api.put<User>('/auth/profile', data);
    return response.data;
  },
};