import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '../../common/base-component.component';
import { ToastrService } from 'ngx-toastr';
import { TypeExamEnum } from '../../enums/type-exam.enum';
import { Exam } from '../../models/exam.model';

@Component({
  selector: 'app-multiple-choice-questions',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './multiple-choice-questions.component.html',
  styleUrl: './multiple-choice-questions.component.css'
})
export class MultipleChoiceQuestionsComponent extends BaseComponent implements OnInit {

  @Input() subject: string = '';
  currentStep: number = 0;

  questionsList: { id: number, question: string; options: string[], answer: any[] }[] = [
    {
      id: 1,
      question: 'Describe your experience with Angular.',
      options: [
        'I have over 3 years of experience.',
        'I am currently learning Angular.',
        'I have worked on several Angular projects.',
        'I have minimal experience with Angular.'
      ],
      answer: []
    },
    {
      id: 2,
      question: 'What are the main features of Angular?',
      options: [
        'Two-way data binding',
        'Dependency injection',
        'Directives and components',
        'Comprehensive testing tools'
      ],
      answer: []
    },
    {
      id: 3,
      question: 'How do you handle state management in Angular?',
      options: [
        'I use NgRx for state management.',
        'I use services to manage state.',
        'I prefer using BehaviorSubject for state management.',
        'I use third-party libraries like Akita or MobX.'
      ],
      answer: []
    },
    {
      id: 4,
      question: 'Explain the Angular lifecycle hooks.',
      options: [
        'They allow developers to hook into key events in a component’s lifecycle.',
        'Lifecycle hooks include OnInit, OnDestroy, and others.',
        'They are methods called by Angular to perform specific tasks.',
        'They are optional but useful for handling logic during the lifecycle.'
      ],
      answer: []
    }
  ];

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    super();
  }

  ngOnInit(): void {
    let jsonSaved = localStorage.getItem(TypeExamEnum.MULTISELECTION);
    if (jsonSaved) {
      let answersPreSaved = JSON.parse(jsonSaved);
      this.questionsList.forEach(
        (item) => {
          item.answer = answersPreSaved.find((answer: any) => answer.id === item.id)?.answer || '';
        }
      );
    }
  }

  onCheckboxChange(event: any, questionId: number, option: string) {
    const question = this.questionsList.find(q => q.id === questionId);
    if (question) {
      if (event.target.checked) {
        question.answer.push(option);
      } else {
        const index = question.answer.indexOf(option);
        if (index > -1) {
          question.answer.splice(index, 1);
        }
      }
    }

    localStorage.setItem(`${TypeExamEnum.MULTISELECTION}`, JSON.stringify(this.questionsList));
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
    const question = this.questionsList[this.currentStep];
    return question.answer.length > 0; 
  }

  override back(): void {
    this.emitActionBack();
  }

  override goToScore(): void {
    const result = this.questionsList.map((item, index) => ({
      question: item.question,
      answers: item.answer
    }));

    const response = {
      "examType": TypeExamEnum.MULTISELECTION,
      "subject": this.subject,
      "questionList": result
    };

    const exam = Exam.fromJSON(response);
    this.emitActionGoToScore(exam);
  }
}
