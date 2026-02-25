import api from './api';
import type { Invoice } from '../types';

export const invoiceService = {
  getAll: async () => {
    const response = await api.get<Invoice[]>('/invoices');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Invoice>(`/invoices/${id}`);
    return response.data;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create: async (data: any) => {
    const response = await api.post<Invoice>('/invoices', data);
    return response.data;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update: async (id: number, data: any) => {
    const response = await api.put<Invoice>(`/invoices/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/invoices/${id}`);
    return response.data;
  },
};