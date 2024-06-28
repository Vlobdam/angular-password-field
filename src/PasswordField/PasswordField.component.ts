import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PasswordStrength } from "../types";
import { NgFor } from "@angular/common";

@Component({
  selector: 'password-field',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  styleUrls: ['./PasswordField.component.css'],
  template: `
    <div class="field">
      <input type="password" [formControl]="password" (ngModelChange)="onChange()">
      <div class="strength" [class]="passwordStrength">
        <ng-container *ngFor="let _ of [].constructor(3)">
          <div class="strength-bar"></div>
        </ng-container>
      </div>
      <div>
    </div>

  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
}) export class PasswordField {
  password = new FormControl('');
  passwordStrength: PasswordStrength = PasswordStrength.EMPTY;

  passwordChecks: ((password: string) => boolean)[]= [
    (p: string) => /[!-\/:-@[-`{-~]/.test(p),
    (p: string) => /\d/.test(p),
    (p: string) => /[A-Za-z]/.test(p),
  ];

  calculatePasswordStrength() {
    const maxPasswordStrength = this.passwordChecks.length;

    const passwordStrengthNumber = this.passwordChecks.reduce((acc, check) => {
      return acc + +check(this.password.value ?? '');
    }, 0);

    const weakThreshold = 1;
    const mediumThreshold = Math.ceil(maxPasswordStrength / 2);
    const strongThreshold = maxPasswordStrength;

    switch (true) {
      case passwordStrengthNumber < weakThreshold:
        this.passwordStrength = PasswordStrength.EMPTY;
        break;
      case passwordStrengthNumber < mediumThreshold:
        this.passwordStrength = PasswordStrength.WEAK;
        break;
      case passwordStrengthNumber < strongThreshold:
        this.passwordStrength = PasswordStrength.MEDIUM;
        break;
      case passwordStrengthNumber >= strongThreshold:
        this.passwordStrength = PasswordStrength.STRONG;
        break;
      default:
        break;
    }
  }

  onChange() {
    this.calculatePasswordStrength()
  }
}
