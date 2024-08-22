import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeatService {
  private rows: number[][] = Array.from({ length: 10 }, (_, i) =>
    i === 9 ? Array(3).fill(0) : Array(7).fill(0)
  );
  private seatNumber = 1;

  constructor() {
    this.initializeSeats();
  }

  private initializeSeats() {
    this.rows.forEach((row) => row.fill(0));
  }

  public getSeats() {
    return this.rows;
  }

  public bookSeats(numSeats: number): number[] {
    const bookedSeats: number[] = [];
    for (let i = 0; i < this.rows.length; i++) {
      const row = this.rows[i];
      let count = 0;
      let start = -1;

      for (let j = 0; j < row.length; j++) {
        if (row[j] === 0) {
          if (start === -1) start = j;
          count++;
          if (count === numSeats) {
            for (let k = start; k < start + numSeats; k++) {
              row[k] = this.seatNumber++;
              bookedSeats.push(i * 10 + k + 1);
            }
            return bookedSeats;
          }
        } else {
          count = 0;
          start = -1;
        }
      }
    }
    return bookedSeats;
  }
}
