import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multiple-choice-questions',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './multiple-choice-questions.component.html',
  styleUrl: './multiple-choice-questions.component.css'
})
export class MultipleChoiceQuestionsComponent {

  questionsForm: FormGroup;
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

  constructor(private fb: FormBuilder, private router: Router) {
    this.questionsForm = this.fb.group(
      this.questionsList.reduce((controls: { [key: string]: FormControl }, _, index) => {
        controls['question' + index] = new FormControl('', Validators.required);
        return controls;
      }, {})
    );
  }

  ngOnInit(): void {
    console.log('DescriptiveQuestionsComponent initialized');
  }


  navigateHome() {
    this.router.navigate(['/home']);
  }

  navigateToScore() {
    this.router.navigate(['/score']);
  }
}
