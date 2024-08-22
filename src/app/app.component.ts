import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numSeats: number = 1;
  bookedSeats: number[] = [];
  seatRows: any[] = [];
  maxSeatsInRow: number = 7;

  constructor() {
    this.initializeSeats();
  }

  // Initialize seats with numbers and status
  initializeSeats() {
    const totalSeats = 80;
    this.seatRows = [];
    let row = [];
    for (let i = 1; i <= totalSeats; i++) {
      row.push({ number: i, status: 'available' });
      if (i % this.maxSeatsInRow === 0 || i === totalSeats) {
        this.seatRows.push(row);
        row = [];
      }
    }
  }

  // Function to reserve seats
  reserveSeats() {
    if (this.numSeats < 1 || this.numSeats > 7) {
      alert('Please enter a number between 1 and 7.');
      return;
    }

    const availableSeats = this.findAvailableSeats(this.numSeats);
    const totalAvailableSeats = this.seatRows.flat().filter(seat => seat.status === 'available').length;

    if (totalAvailableSeats === 0) {
      alert('No seats left.');
      return;
    } else if (availableSeats.length < this.numSeats) {
      if (totalAvailableSeats < this.numSeats) {
        alert(`Only ${totalAvailableSeats} seats left.`);
      } else {
        alert('Not enough seats available.');
      }
      return;
    }

    // Mark seats as booked
    availableSeats.forEach(seat => {
      seat.status = 'booked';
    });

    this.bookedSeats = availableSeats.map(seat => seat.number);
    alert(`Seats booked successfully: ${this.bookedSeats.join(', ')}`);
  }

  // Function to find available seats
  findAvailableSeats(count: number) {
    let seatsToBook = [];
    let seatCount = 0;

    // First try to book seats in the same row
    for (let row of this.seatRows) {
      const availableSeatsInRow = row.filter(seat => seat.status === 'available');
      if (availableSeatsInRow.length >= count) {
        seatsToBook = availableSeatsInRow.slice(0, count);
        seatCount = count;
        break;
      }
    }

    // If not enough seats in one row, book nearby seats
    if (seatCount < count) {
      this.seatRows.forEach(row => {
        const availableSeatsInRow = row.filter(seat => seat.status === 'available');
        seatsToBook = seatsToBook.concat(availableSeatsInRow);
        seatCount = seatsToBook.length;
        if (seatCount >= count) {
          seatsToBook = seatsToBook.slice(0, count);
          return;
        }
      });
    }

    return seatsToBook;
  }

  // Function to handle seat booking click event
  bookSeat(seat: any) {
    if (seat.status === 'available') {
      this.reserveSeatsForSingle(seat.number);
    }
  }

  // Function to reserve a seat by number
  reserveSeatsForSingle(seatNumber: number) {
    const seat = this.seatRows.flat().find(s => s.number === seatNumber);
    if (seat && seat.status === 'available') {
      seat.status = 'booked';
      this.bookedSeats = [seatNumber];
      alert(`Seat ${seatNumber} booked successfully.`);
    }
  }
}
