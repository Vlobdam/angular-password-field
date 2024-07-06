import { Injectable } from '@angular/core';
import { RULESET } from './ruleset';

@Injectable({
  providedIn: 'root'
})
export class PasswordStrengthService {
  ruleset: ((string: string) => boolean)[] = RULESET;
  public passwordStrength = 0;

  updatePasswordStrength(password: string): void {
    const validRulesAmount = this.ruleset.reduce((acc, curFunc) => {
      return acc + Number(curFunc(password));
    }, 0);

    this.passwordStrength = validRulesAmount;
  }
}
