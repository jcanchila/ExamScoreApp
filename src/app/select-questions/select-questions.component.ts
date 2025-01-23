import { Component, EventEmitter, input, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DescriptiveQuestionsComponent } from '../questionType/descriptive-questions/descriptive-questions.component';
import { CommonModule } from '@angular/common';
import { TypeExamEnum } from '../enums/type-exam.enum';
import { MultipleChoiceQuestionsComponent } from '../questionType/multiple-choice-questions/multiple-choice-questions.component';
import { TrueFalseQuestionsComponent } from "../questionType/true-false-questions/true-false-questions.component";
import { Router } from '@angular/router';
import { Exam } from '../models/exam.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-select-questions',
  imports: [
    CommonModule,
    DescriptiveQuestionsComponent,
    MultipleChoiceQuestionsComponent,
    TrueFalseQuestionsComponent
  ],
  templateUrl: './select-questions.component.html',
  styleUrl: './select-questions.component.css'
})
export class SelectQuestionsComponent implements OnChanges {

  @Input() subject: string = '';
  @Input() typeExam!: TypeExamEnum;
  @Output() actionBack = new EventEmitter<void>();

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['typeExam'].currentValue) {
      this.typeExam = changes['typeExam'].currentValue;
    }
  }

  handleBack() {
    this.actionBack.emit();
  }

  handleGoToScore(exam: Exam) {
    this.apiService.post(exam).subscribe(
      (response) => {
        this.router.navigate(['/score']);
      },
      (error) => {
        console.error('Error:', error);
      }
    );

  }
}
