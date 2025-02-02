import api from './axios';
import { Company } from '../types/types';

export const companiesApi = {
  getAll: () => 
    api.get<Company[]>('/companies/get-all'),
  
  getById: (id: number) => 
    api.get<Company>(`/companies/get/${id}`),
  
  add: (data: Omit<Company, 'id'>) => {
    const token = JSON.parse(localStorage.getItem('data') || '{}');
    if (!token) {
      console.error('Authorization token is missing.');
      throw new Error('Unauthorized: No token provided');
    }
    return api.post<Company>('/companies/add', data);
  },

  update: (data: Company) =>
    api.put<Company>('/companies/update', data),
  
  delete: (id: number) =>
    api.delete(`/companies/delete/by-id?id=${id}`),
};
