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

  questionsList: { question: string; answers: string[] }[] = [
    { question: 'Is your experience with Angular sufficient?', answers: ['True', 'False'] },
    { question: 'Does Angular provide dependency injection?', answers: ['True', 'False'] },
    { question: 'Can state management in Angular be done with services?', answers: ['True', 'False'] },
    { question: 'Are Angular lifecycle hooks mandatory?', answers: ['True', 'False'] }
  ];

  questionsForm!: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    super();
  }

  ngOnInit(): void {
    this.questionsForm = this.fb.group({});
    this.questionsList.forEach((_, index) => {
      const controlName = 'question' + index;
      const savedAnswer = localStorage.getItem(`${TypeExamEnum.TRUE_FALSE}-${controlName}`) || '';
      this.questionsForm.addControl(controlName, new FormControl(savedAnswer, Validators.required));
    });
  }

  onAnswerChange(questionKey: string, value: string) {
    localStorage.setItem(`${TypeExamEnum.TRUE_FALSE}-${questionKey}`, value);
    console.log(`Respuesta guardada para ${questionKey}: ${value}`);
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
      "examType": TypeExamEnum.TRUE_FALSE,
      "subject": this.subject,
      "questionList": result
    };

    const exam = Exam.fromJSON(response);
    this.emitActionGoToScore(exam);
  }
}
