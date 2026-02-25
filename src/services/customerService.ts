import api from './api';
import type { Customer } from '../types';

export const customerService = {
  getAll: async () => {
    const response = await api.get<Customer[]>('/customers');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Customer>(`/customers/${id}`);
    return response.data;
  },

  create: async (data: Omit<Customer, 'id' | 'created_at' | 'updated_at'>) => {
    const response = await api.post<Customer>('/customers', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Omit<Customer, 'id' | 'created_at' | 'updated_at'>>) => {
    const response = await api.put<Customer>(`/customers/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/customers/${id}`);
    return response.data;
  },
};