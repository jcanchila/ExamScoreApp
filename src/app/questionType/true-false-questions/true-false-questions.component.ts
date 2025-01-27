import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '../../common/base-component.component';
import { Exam } from '../../models/exam.model';
import { ToastrService } from 'ngx-toastr';
import { TypeExamEnum } from '../../enums/type-exam.enum';

@Component({
  selector: 'app-true-false-questions',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './true-false-questions.component.html',
  styleUrl: './true-false-questions.component.css'
})
export class TrueFalseQuestionsComponent extends BaseComponent {

  @Input() subject: string = '';

  currentStep: number = 0; 

  questionsList: { id: number, question: string; answers: string[], answer: string }[] = [
    { id: 1, question: 'Cash flow statements are not important for financial planning.?', answers: ['True', 'False'], answer: '' },
    { id: 2, question: 'The average annual rate of return mentioned in the document is 10%.', answers: ['True', 'False'], answer: '' },
    { id: 3, question: 'Diversity in boards of directors is considered an important quality.', answers: ['True', 'False'], answer: '' },
    { id: 4, question: 'Inflation risk occurs when investors have more purchasing power from their investments due to rising prices.', answers: ['True', 'False'], answer: '' }
  ];

  constructor(private toastr: ToastrService) {
    super();
  }

  ngOnInit(): void {
    let jsonSaved = localStorage.getItem(TypeExamEnum.TRUE_FALSE);
    if (jsonSaved) {
      let answersPreSaved = JSON.parse(jsonSaved);
      this.questionsList.forEach(
        (item) => {
          item.answer = answersPreSaved.find((answer: any) => answer.id === item.id)?.answer || '';
        }
      );
    }
  }

  onAnswerChange(answer: string): void {
    this.questionsList[this.currentStep].answer = answer;
    localStorage.setItem(`${TypeExamEnum.TRUE_FALSE}`, JSON.stringify(this.questionsList));
  }

  nextStep(): void {
    if (this.currentStep < this.questionsList.length - 1) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  isCurrentStepValid(): boolean {
    return this.questionsList[this.currentStep].answer !== ''; 
  }

  override back(): void {
    this.emitActionBack();
  }

  override goToScore(): void {
    const result = this.questionsList.map((item, index) => ({
      question: item.question,
      answers: [item.answer || '']
    }));

    const response = {
      "examType": TypeExamEnum.TRUE_FALSE,
      "subject": this.subject,
      "questionList": result
    };

    const exam = Exam.fromJSON(response);
    this.emitActionGoToScore(exam);
  }
}
