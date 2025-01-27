import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, FormControl, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BaseComponent } from '../../common/base-component.component';
import { ToastrService } from 'ngx-toastr';
import { TypeExamEnum } from '../../enums/type-exam.enum';
import { Exam } from '../../models/exam.model';

@Component({
  selector: 'app-descriptive-questions',
  templateUrl: './descriptive-questions.component.html',
  styleUrls: ['./descriptive-questions.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class DescriptiveQuestionsComponent extends BaseComponent implements OnInit {

  @Input() subject: string = '';
  currentStep: number = 0;

  questionsList: any[] = [
    { id: 1, question: 'Describe your experience with Angular.', answer: '', min: 1, max: 2000 },
    { id: 2, question: 'What are the main features of Angular?', answer: '', min: 10, max: 2000 },
    { id: 3, question: 'How do you handle state management in Angular?', answer: '', min: 1, max: 2000 },
    { id: 4, question: 'Explain the Angular lifecycle hooks.', answer: '', min: 1, max: 2000 }
  ];

  constructor(private toastr: ToastrService) {
    super();
  }

  ngOnInit(): void {
    let jsonSaved = localStorage.getItem(TypeExamEnum.DESCRIPTIVE);
    if (jsonSaved) {
      let answersPreSaved = JSON.parse(jsonSaved);
      this.questionsList.forEach(
        (item)=> {
          item.answer = answersPreSaved.find((answer: any) => answer.id === item.id)?.answer || '';
        }
      );
    }
  }

  onAnswerChange() {
    localStorage.setItem(`${TypeExamEnum.DESCRIPTIVE}`, JSON.stringify(this.questionsList));
  }

  override back(): void {
    this.emitActionBack();
  }

  isCurrentStepValid(): boolean {
    return !!this.questionsList[this.currentStep].answer;
  }

  nextStep() {
    if (!this.questionsList[this.currentStep].answer) {
      this.toastr.warning('Warning', 'Please answer the question');
      return;
    }

    if (this.questionsList[this.currentStep].answer.length < this.questionsList[this.currentStep].min) {
      this.toastr.warning('Warning', 'Please answer the question with at least ' + this.questionsList[this.currentStep].min + ' characters');
      return;
    }
    if (this.currentStep < this.questionsList.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  override goToScore(): void {
    const result = this.questionsList.map((item, index) => ({
      question: item,
      answers: [item.answer || '']
    }));

    const response = {
      "examType": TypeExamEnum.DESCRIPTIVE,
      "subject": this.subject,
      "questionList": result
    };

    const exam = Exam.fromJSON(response);
    this.emitActionGoToScore(exam);
  }
}
