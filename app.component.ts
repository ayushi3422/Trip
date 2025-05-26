import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
// trip.model.ts
export interface Trip {
  start: string;
  end: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule, MatButtonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'trip-pr';
   trips = [{ start: '', end: '' }];
 
  get tripSegments() {
    const segments: any[] = [];
    for (let i = 0; i < this.trips.length; i++) {
      const { start, end } = this.trips[i];
      const startAbbr = (start || '').substring(0, 3).toUpperCase();
      const endAbbr = (end || '').substring(0, 3).toUpperCase();
 
      let type = 'continued';
      let level = 'level-1';
 
      if (i > 0) {
        const prevEnd = this.trips[i - 1].end?.substring(0, 3).toUpperCase();
        if (startAbbr !== prevEnd) {
          type = 'non-continued';
        }
      }
 
      if (startAbbr === endAbbr) {
        type = 'same';
        level = 'level-2';
      }
 
      segments.push({ start: startAbbr, end: endAbbr, type, level });
    }
    return segments;
  }
 
  addTrip() {
    this.trips.push({ start: '', end: '' });
  }
}
