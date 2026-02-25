import api from './api';
import type { Quotation } from '../types';

export const quotationService = {
  getAll: async () => {
    const response = await api.get<Quotation[]>('/quotations');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Quotation>(`/quotations/${id}`);
    return response.data;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create: async (data: any) => {
    const response = await api.post<Quotation>('/quotations', data);
    return response.data;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update: async (id: number, data: any) => {
    const response = await api.put<Quotation>(`/quotations/${id}`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/quotations/${id}`);
    return response.data;
  },
};