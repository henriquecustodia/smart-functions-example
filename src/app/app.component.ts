import {
  Component,
  EnvironmentInjector,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { getPeople } from './services/get-people';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { createPerson } from './services/create-person';

@Component({
  standalone: true,
  selector: 'smart-functions-example-root',
  imports: [AsyncPipe, ReactiveFormsModule],
  template: `
    <input
      type="text"
      placeholder="Name"
      [formControl]="control"
      (keydown.enter)="addPerson()"
    />

    <ul>
      @for (person of people$ | async; track person.id) {
      <li>{{ person.name }}</li>
      }
    </ul>
  `,
})
export class AppComponent {
  environmentInjector = inject(EnvironmentInjector);

  control = new FormControl();

  people$ = getPeople();

  addPerson() {
    runInInjectionContext(this.environmentInjector, () => {
      createPerson({ name: this.control.value }).subscribe(() => {
        runInInjectionContext(this.environmentInjector, () => {
          this.people$ = getPeople();
        });
      });
    });
  }
}
