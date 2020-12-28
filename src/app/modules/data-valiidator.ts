import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface DdValidationErrors {
  [key: string]: any;
}

export interface DdValidator {
  validate(value: any): DdValidationErrors | null;
  // registerOnValidatiorChange(fn: () => void): void
}

export class ProviderDataValidators {
  // custom validator to check that two fields.
  static MustSpriceGreatThanPrice(price: string, sprice: string) {
    return (formGroup: FormGroup) => {
      const priceControl = formGroup.controls[price];
      const sPriceControl = formGroup.controls[sprice];
      // set error on matchingControl if validation fails
      if (Number(sPriceControl.value) > Number(priceControl.value)) {
        sPriceControl.setErrors(null);
      } else {
        sPriceControl.setErrors({
          priceComparison: true,
        });
      }
    };
  }

  static priceValidator(price: number, sprice: number): any {
    if (typeof Number(sprice) === 'number' && Number(sprice) > price) {
      return {
        priceCheck: {
          value: true,
        },
      };
    } else {
      return {
        priceCheck: {
          value: false,
          msg: '*Selling price needs to be greater than cost price.',
        },
      };
    }
  }

  static numberRequired(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // Quick fix for failing cases in case of string in put
      const value = Number(control.value);
      if (!value || !Number.isFinite(value)) {
        return { numberRequired: { msg: 'Number is required.' } };
      }
      return null;
    };
  }

  static required(msg = 'This field is required.'): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (
        control.value === '' ||
        control.value === undefined ||
        control.value === null ||
        control.value.toString().length === 0
      ) {
        return { required: { msg: msg } };
      } else if (control.value['id'] === null) {
        return { required: { msg: msg } };
      } else {
        return null;
      }
    };
  }

  static alphaNumeric(event?: any): ValidatorFn | any {
    const regexp = new RegExp('^[0-9a-zA-Z ]+$');
    if (event) {
      if (!regexp.test(event)) {
        return {
          alphaNumeric: {
            value: false,
            msg: '*Name has to be alphanumeric.',
          },
        };
      } else {
        return {
          alphaNumeric: {
            value: true,
          },
        };
      }
    } else {
      return (control: AbstractControl): { [key: string]: any } | null => {
        if (!regexp.test(event ? event : control.value)) {
          return {
            alphaNumeric: { msg: '*Name has to be alphanumeric.' },
          };
        }
      };
    }
  }

  static nullValidator(): ValidatorFn {
    return (value: any): { [key: string]: any } | null => {
      return null;
    };
  }
}
