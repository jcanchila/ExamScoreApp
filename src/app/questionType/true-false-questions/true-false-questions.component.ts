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
    { id: 1, question: 'Is your experience with Angular sufficient?', answers: ['True', 'False'], answer: '' },
    { id: 2, question: 'Does Angular provide dependency injection?', answers: ['True', 'False'], answer: '' },
    { id: 3, question: 'Can state management in Angular be done with services?', answers: ['True', 'False'], answer: '' },
    { id: 4, question: 'Are Angular lifecycle hooks mandatory?', answers: ['True', 'False'], answer: '' }
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
