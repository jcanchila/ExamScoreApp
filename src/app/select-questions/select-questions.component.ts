import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { DescriptiveQuestionsComponent } from '../questionType/descriptive-questions/descriptive-questions.component';
import { CommonModule } from '@angular/common';
import { TypeExamEnum } from '../enums/type-exam.enum';
import { MultipleChoiceQuestionsComponent } from '../questionType/multiple-choice-questions/multiple-choice-questions.component';
import { TrueFalseQuestionsComponent } from "../questionType/true-false-questions/true-false-questions.component";
import { Router } from '@angular/router';
import { Exam } from '../models/exam.model';
import { SecondsToTimePipe } from "../pipes/seconds-to-time.pipe";
import { CommunicationService } from '../services/comunication.service';
import { QuestionStatus } from '../models/questions-rate.model';
import { Subscription } from 'rxjs';

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

  timeInSeconds: number = 600;
  timer: any;

  private subscription!: Subscription;
  questionsAnswered: string = '0';
  quantityQuestions: string = '0';

  constructor(private router: Router,
    private communicationService: CommunicationService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscription = this.communicationService.currentValue.subscribe((status: QuestionStatus) => {
      this.questionsAnswered = (status.questionsAnswered ?? 0).toString();
      this.quantityQuestions = (status.quantityQuestions ?? 0).toString();
  
      this.cdRef.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['typeExam'].currentValue) {
    }
    this.loadTime();
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    clearInterval(this.timer);
  }

  handleBack() {
    this.actionBack.emit();
  }

  handleGoToScore(exam: Exam) {
    this.router.navigate(['/score']);
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
