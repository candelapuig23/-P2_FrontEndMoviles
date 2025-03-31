import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'toNumber',
  standalone: true,
})
@Injectable({
  providedIn: 'root',
})
export class ToNumberPipe implements PipeTransform {
  transform(value: string | number): number {
    if (typeof value === 'number') return value;
    if (!value) return 0;

    let stringValue = value.toString().trim();

    // Detectamos alturas en formato pies y pulgadas (ejemplo: 6'10")
    const feetInchesRegex = /^(\d+)'(\d+)\"?$/;
    const match = stringValue.match(feetInchesRegex);

    if (match) {
      const feet = parseInt(match[1], 10); // Captura la parte en pies
      const inches = parseInt(match[2], 10); // Captura la parte en pulgadas
      const decimalHeight = feet + inches / 12; // Convertimos a decimal (6'10" -> 6.833)
      console.log(
        `ToNumberPipe (Feet/Inches): ${stringValue} -> ${decimalHeight}`
      );
      return decimalHeight;
    }

    // Eliminamos cualquier otro carácter no numérico y convertimos
    const cleanValue = stringValue.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(cleanValue);

    console.log(`ToNumberPipe: ${stringValue} -> ${numericValue}`);
    return isNaN(numericValue) ? 0 : numericValue;
  }
}
