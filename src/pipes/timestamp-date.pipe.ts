import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: "timestampDate"})
export class TimestampDatePipe implements PipeTransform {
date: any;

  transform(value: number): Date {
    if (value) {
      this.date = new Date(value * 1000);
      return this.date;
    }
  }
}