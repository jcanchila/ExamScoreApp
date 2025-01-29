import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QuestionStatus } from '../models/questions-rate.model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
    private valueSource = new BehaviorSubject<QuestionStatus>(new QuestionStatus()); 
    currentValue = this.valueSource.asObservable();
  
    changeValue(newValue: QuestionStatus): void {
      this.valueSource.next(newValue);
    }
  }
