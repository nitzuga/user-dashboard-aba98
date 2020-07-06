import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  isAddress(address: any): boolean {
    if ( this.isEmpty(address) ) {
      return false;
    }

    if ( typeof address !== 'string' ) {
      return false;
    }

    // max 400char
    if ( address.length > 400 ) {
      return false;
    }

    return true;
  } // end func address

  isAge(age: any) {
    if ( this.isEmpty(age) ) {
      return false;
    }

    if ( typeof age !== 'number' ) {
      return false;
    }

    // int
    if  ( !Number.isInteger(age) ) {
      return false;
    }

    // min age
    if ( age < 18 ) {
      return false;
    }

    // max age 120 for ref
    if ( age < 120 ) {
      return false;
    }

    return true;
  } // end func isAge

  isRut(rutDV: string): boolean {
    // does it have DV?
    if ( rutDV.indexOf('-') === -1 ) {
      // not valid format, no DV
      return false;
    }
    // separte number from DV
    const rutArray = rutDV.split('-');
    if ( rutArray.length !== 2 ) {
      // invalid format
      return false;
    }

    // remove dots
    const rut = rutArray[0].split('.').join('');
    // formta DV in case value = K
    const dv = rutArray[1].toUpperCase();

    // check min length
    if ( rut.length < 7 ) {
      // rut too short
      return false;
    }

    if ( rut.length > 8 || dv.length > 1 ) {
      // rut or dv too long
      return false;
    }

    return this.rutValidation(rutDV, rut, dv);
  } // end func isRut

  /**
   * @description
   * Standard formula used for rut verification. C
   */
  private rutValidation(rutDV: string, rut: string, dv: string) {
    let aux = 0;
    let mult = 2;

    let dvInt = 0;
    // exceptions values: 0 and K
    switch (dv) {
      case 'K':
        dvInt = 10;
        break;
      case '0':
        dvInt = 11;
        break;
      default:
        dvInt = parseInt(dv, 10);
        break;
    }

    for ( let i = 1; i <= rut.length; i++ ) {
      const index = mult * parseInt(rutDV.charAt( (rut.length - i) ), 10);
      aux = aux + index;
      if ( mult < 7 ) {
        mult = mult + 1;
      } else {
        mult = 2;
      }
    }

    //  Calc DV based on mod 11
    const dvExpected = 11 - (aux % 11);

    //  Validar que el Cuerpo coincide con su Dígito Verificador
    if (dvExpected !== dvInt) {
      return false;
    }

    return true;
  } // end func rutValidation

  /**
   * @description
   * Verifies name length and format.
   */
  isName(name: any): boolean {
    if ( this.isEmpty(name) ) {
      return false;
    }

    if ( typeof name !== 'string' ) {
      return false;
    }

    if ( name.length < 1 ) {
      return false;
    }

    // max 50char
    if ( name.length > 50 ) {
      return false;
    }
    return true;
  } // end func isName

  /**
   * @description
   * Verifies lastname length and format.
   */
  isLastName(lastname: any): boolean {
    if ( this.isEmpty(lastname) ) {
      return false;
    }

    if ( typeof lastname !== 'string' ) {
      return false;
    }

    if ( lastname.length < 1 ) {
      return false;
    }

    // max 50char
    if ( lastname.length > 60 ) {
      return false;
    }
    return true;
  } // end func isName

  /**
   * @description
   * Email validation, using regular expression.
   * @param email string with email
   */
  isEmail(email: string): boolean {
    if ( email.length === 0 || email.length >= 100 ) {
      // email too short or too long
      return false;
    }

    // standard regular expression for valid email
    // tslint:disable-next-line:max-line-length
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(email);
  } // end func email

  isEmpty(v: any): boolean {
    return !(v !== null && v !== undefined);
  } // notEmpty
} // ValidatorService
