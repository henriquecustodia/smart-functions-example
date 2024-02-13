import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { createPerson } from './create-person';

describe('createPerson()', () => {
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpController = TestBed.inject(HttpTestingController);
  });

  it('should make a http request', () => {
    TestBed.runInInjectionContext(() => {
      const fakePayload = {
        name: 'fake-name',
      };

      const observable = createPerson(fakePayload);
      
      observable.subscribe((response) => {
        expect(response).toEqual(fakeResponse);
      });

      const fakeResponse = {
        id: 'fake-id',
        name: 'fake-name',
      };

      const request = httpController.expectOne('/api/people');
      
      request.flush(fakeResponse);
    });
  });
});
