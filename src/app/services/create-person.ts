import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Person } from '../interfaces/person';

export const createPerson = (payload: Omit<Person, 'id'>) => {
  const httpClient = inject(HttpClient);
  return httpClient.post('/api/people', payload);
};
