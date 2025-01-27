import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTime'
})
export class SecondsToTimePipe implements PipeTransform {

  transform(seconds: number): unknown {
    if (isNaN(seconds) || seconds < 0) {
      return 'Invalid time';
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let timeString = '';

    if (hours > 0) {
      timeString += `${hours}h `;
    }

    if (minutes > 0 || hours > 0) {
      timeString += `${minutes}m `;
    }

    timeString += `${remainingSeconds}s`;

    return timeString;
  }

}
