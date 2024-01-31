import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Person } from '../interfaces/person';

export const getPeople = () => inject(HttpClient).get<Person[]>('/api/people');