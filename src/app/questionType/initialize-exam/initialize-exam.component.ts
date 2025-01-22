import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initialize-exam',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './initialize-exam.component.html',
  styleUrl: './initialize-exam.component.css'
})
export class InitializeExamComponent {
  examForm: FormGroup;
  subject: string = 'financiera';
  typeExam: string = 'descriptive';
  optionsTypeExam: any[] = [
    { value: 'descriptive', text: 'Descriptive' },
    { value: 'multiselection', text: 'Multiselection' },
    { value: 'true-false', text: 'True/False' },
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.examForm = this.fb.group({
      subject: ['financiera'],
      typeExam: ['descriptive']
    });
  }

  selectQuestionType(type: string) {
    if (type === 'descriptive') {
      this.router.navigate(['/descriptive-questions']);
    }
    // Add navigation for other question types here
  }

  startExam() {
    let type = this.examForm.value.typeExam;
    switch (type) {
      case 'descriptive':
        this.router.navigate(['/descriptive-questions']);
        break;
      case 'multiselection':
        this.router.navigate(['/multiple-choice-questions']);
        break;
      case 'true-false':
        this.router.navigate(['/true-false-questions']);
        break;
      default:
        console.error('Tipo de examen no reconocido:', type);
        break;
    }
  }
}
