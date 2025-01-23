import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '../../common/base-component.component';
import { ToastrService } from 'ngx-toastr';
import { TypeExamEnum } from '../../enums/type-exam.enum';
import { Exam } from '../../models/exam.model';

@Component({
  selector: 'app-multiple-choice-questions',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './multiple-choice-questions.component.html',
  styleUrl: './multiple-choice-questions.component.css'
})
export class MultipleChoiceQuestionsComponent extends BaseComponent implements OnInit {

  @Input() subject: string = '';
  questionsForm!: FormGroup;
  questionsList: { question: string; options: string[] }[] = [
    {
      question: 'Describe your experience with Angular.',
      options: [
        'I have over 3 years of experience.',
        'I am currently learning Angular.',
        'I have worked on several Angular projects.',
        'I have minimal experience with Angular.'
      ]
    },
    {
      question: 'What are the main features of Angular?',
      options: [
        'Two-way data binding',
        'Dependency injection',
        'Directives and components',
        'Comprehensive testing tools'
      ]
    },
    {
      question: 'How do you handle state management in Angular?',
      options: [
        'I use NgRx for state management.',
        'I use services to manage state.',
        'I prefer using BehaviorSubject for state management.',
        'I use third-party libraries like Akita or MobX.'
      ]
    },
    {
      question: 'Explain the Angular lifecycle hooks.',
      options: [
        'They allow developers to hook into key events in a component’s lifecycle.',
        'Lifecycle hooks include OnInit, OnDestroy, and others.',
        'They are methods called by Angular to perform specific tasks.',
        'They are optional but useful for handling logic during the lifecycle.'
      ]
    }
  ];

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    super();
  }

  ngOnInit(): void {
    this.questionsForm = this.fb.group({});

    this.questionsList.forEach((_, index) => {
      const controlKey = 'question' + index;
      const savedAnswers = JSON.parse(localStorage.getItem(`${TypeExamEnum.MULTISELECTION}-${controlKey}`) || '[]');
      this.questionsForm.addControl(controlKey, new FormControl(savedAnswers, Validators.required));
    });
  }

  onCheckboxChange(event: Event, questionKey: string, option: string) {
    const selectedOptions: string[] = this.questionsForm.get(questionKey)?.value || [];

    if ((event.target as HTMLInputElement).checked) {
      selectedOptions.push(option);
    } else {
      const index = selectedOptions.indexOf(option);
      if (index > -1) {
        selectedOptions.splice(index, 1);
      }
    }

    this.questionsForm.get(questionKey)?.setValue(selectedOptions);
    localStorage.setItem(`${TypeExamEnum.MULTISELECTION}-${questionKey}`, JSON.stringify(selectedOptions));
  }

  override back(): void {
    this.emitActionBack();
  }

  override goToScore(): void {
    if (this.questionsForm.invalid) {
      this.toastr.warning('Warning', 'Please answer all the questions');
      return;
    }
    const answers = this.questionsForm.value;

    const result = this.questionsList.map((item, index) => ({
      question: item.question,
      answers: [answers['question' + index] || 'No answer']
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
