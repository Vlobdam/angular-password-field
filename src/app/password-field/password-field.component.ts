import { Component, forwardRef } from "@angular/core";
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgFor } from "@angular/common";
import { PasswordStrengthService } from "./password-strength.service";
import { ControlValueAccessor } from "@angular/forms";

@Component({
  selector: 'password-field',
  standalone: true,
  imports: [NgFor, FormsModule],
  styleUrls: ['./password-field.component.css'],
  templateUrl: './password-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordField),
      multi: true
    }
  ]
}) export class PasswordField implements ControlValueAccessor {
  constructor(public passwordStrengthService : PasswordStrengthService) { }

  password = '';
  private onChange = (val: any) => {};
  private onTouched = () => {};


  writeValue(value: string): void {
    this.password = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onPasswordChangeEvent(event: Event) {
    const eventTarget = event.target as HTMLInputElement;

    this.password = eventTarget.value;
    this.passwordStrengthService.updatePasswordStrength(this.password)

    this.onChange(this.password);
  }
}
