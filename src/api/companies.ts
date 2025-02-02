import api from './axios';
import { Company } from '../types/types';

export const companiesApi = {
  getAll: () => 
    api.get<Company[]>('/companies/get-all'),
  
  getById: (id: string) => 
    api.get<Company>(`/companies/get/${id}`),
  
  add: (data: Omit<Company, 'id'>) => 
    api.post<Company>('/companies/add', data),
  
  update: (data: Company) =>
    api.put<Company>('/companies/update', data),
  
  delete: (id: string) => 
    api.delete('/companies/delete/by-id', {
      data: id, // Send the raw ID string without JSON.stringify
      headers: {
        'Content-Type': 'application/json'
      }
    }),
};
