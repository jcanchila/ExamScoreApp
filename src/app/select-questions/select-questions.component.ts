import { Component, EventEmitter, input, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { DescriptiveQuestionsComponent } from '../questionType/descriptive-questions/descriptive-questions.component';
import { CommonModule } from '@angular/common';
import { TypeExamEnum } from '../enums/type-exam.enum';
import { MultipleChoiceQuestionsComponent } from '../questionType/multiple-choice-questions/multiple-choice-questions.component';
import { TrueFalseQuestionsComponent } from "../questionType/true-false-questions/true-false-questions.component";
import { Router } from '@angular/router';
import { Exam } from '../models/exam.model';
import { ApiService } from '../services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SecondsToTimePipe } from "../pipes/seconds-to-time.pipe";

@Component({
  selector: 'app-select-questions',
  imports: [
    CommonModule,
    DescriptiveQuestionsComponent,
    MultipleChoiceQuestionsComponent,
    TrueFalseQuestionsComponent,
    SecondsToTimePipe
  ],
  templateUrl: './select-questions.component.html',
  styleUrl: './select-questions.component.css'
})
export class SelectQuestionsComponent implements OnChanges, OnDestroy {

  @Input() subject: string = '';
  @Input() typeExam!: TypeExamEnum;
  @Output() actionBack = new EventEmitter<void>();

  timeInSeconds: number = 65;
  timer: any;

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['typeExam'].currentValue) {
      this.typeExam = changes['typeExam'].currentValue;
    }
    this.loadTime();
    this.startTimer();
  }

  handleBack() {
    this.actionBack.emit();
  }

  handleGoToScore(exam: Exam) {
    this.router.navigate(['/score']);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  saveTime(): void {
    localStorage.setItem('time', this.timeInSeconds.toString());
  }

  loadTime(): void {
    const savedTime = localStorage.getItem('time');
    if (savedTime && parseInt(savedTime) === 0) {
      this.router.navigate(['/score']);
    } else {
      this.timeInSeconds = savedTime ? parseInt(savedTime) : this.timeInSeconds;
    }
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      if (this.timeInSeconds > 0) {
        this.timeInSeconds--;
        this.saveTime();
      } else {
        clearInterval(this.timer);
        this.router.navigate(['/score']);
      }
    }, 1000);
  }
}
