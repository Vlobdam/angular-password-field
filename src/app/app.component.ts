import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PasswordField } from './password-field/password-field.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PasswordField],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'password-test';
}
