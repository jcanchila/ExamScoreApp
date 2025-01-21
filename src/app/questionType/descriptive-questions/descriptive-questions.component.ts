import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-descriptive-questions',
  templateUrl: './descriptive-questions.component.html',
  styleUrls: ['./descriptive-questions.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class DescriptiveQuestionsComponent implements OnInit {
  questionsForm: FormGroup;
  questionsList: string[] = [
    'Describe your experience with Angular.',
    'What are the main features of Angular?',
    'How do you handle state management in Angular?',
    'Explain the Angular lifecycle hooks.'
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.questionsForm = this.fb.group({
      questions: this.fb.array(this.questionsList.map(() => this.fb.control('')))
    });
  }

  ngOnInit(): void {
    console.log('DescriptiveQuestionsComponent initialized');
  }

  get questions() {
    return this.questionsForm.get('questions') as FormArray;
  }

  getQuestionText(index: number): string {
    return this.questionsList[index];
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  navigateToScore() {
    this.router.navigate(['/score']);
  }
}
