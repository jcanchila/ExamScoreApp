import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
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
  imports: [CommonModule, ReactiveFormsModule]
})
export class DescriptiveQuestionsComponent extends BaseComponent implements OnInit {

  @Input() subject: string = '';

  questionsForm!: FormGroup;
  questionsList: string[] = [
    'Describe your experience with Angular.',
    'What are the main features of Angular?',
    'How do you handle state management in Angular?',
    'Explain the Angular lifecycle hooks.'
  ];

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    super();
  }

  ngOnInit(): void {
    this.questionsForm = this.fb.group({});
    this.questionsList.forEach((_, index) => {
      const controlName = 'question' + index;
      const savedAnswer = localStorage.getItem(`${TypeExamEnum.DESCRIPTIVE}-${controlName}`) || '';
      this.questionsForm.addControl(controlName, new FormControl(savedAnswer, Validators.required));
    });
  }

  onAnswerChange(controlName: string, value: any) {
    localStorage.setItem(`${TypeExamEnum.DESCRIPTIVE}-${controlName}`, value.target.value);
    console.log(`Respuesta guardada para ${controlName}: ${value}`);
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
      question: item,
      answers: [answers['question' + index] || '']
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
