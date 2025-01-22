import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-true-false-questions',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './true-false-questions.component.html',
  styleUrl: './true-false-questions.component.css'
})
export class TrueFalseQuestionsComponent {
  questionsList: { question: string; answers: string[] }[] = [];

  questionsForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // Transformar las preguntas en formato de respuesta True/False
    this.questionsList = [
      { question: 'Is your experience with Angular sufficient?', answers: ['True', 'False'] },
      { question: 'Does Angular provide dependency injection?', answers: ['True', 'False'] },
      { question: 'Can state management in Angular be done with services?', answers: ['True', 'False'] },
      { question: 'Are Angular lifecycle hooks mandatory?', answers: ['True', 'False'] }
    ];

    // Crear un formulario reactivo con controles dinámicos
    this.questionsForm = this.fb.group(
      this.questionsList.reduce((controls: { [key: string]: FormControl }, _, index) => {
        controls['question' + index] = new FormControl('', Validators.required);
        return controls;
      }, {})
    );
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  navigateToScore() {
    this.router.navigate(['/score']);

  }
}
