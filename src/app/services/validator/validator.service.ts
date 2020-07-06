import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

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
}
