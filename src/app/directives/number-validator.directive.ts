import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appNumberValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: NumberValidatorDirective, multi: true}]
})
export class NumberValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    throw new Error('Method not implemented.');
  }

  

}
