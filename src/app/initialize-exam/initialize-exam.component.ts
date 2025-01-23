import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SelectQuestionsComponent } from "../select-questions/select-questions.component";
import { TypeExamEnum } from '../enums/type-exam.enum';
import { DescriptiveQuestionsComponent } from "../questionType/descriptive-questions/descriptive-questions.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-initialize-exam',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SelectQuestionsComponent
  ],
  templateUrl: './initialize-exam.component.html',
  styleUrl: './initialize-exam.component.css'
})
export class InitializeExamComponent implements OnInit {
  examForm!: FormGroup;
  subjectSelected: string = 'finance';
  typeExamSelected: TypeExamEnum = TypeExamEnum.DESCRIPTIVE;
  startExam: boolean = false;
  optionsTypeExam: any[] = [
    { value: TypeExamEnum.DESCRIPTIVE, text: 'Descriptive' },
    { value: TypeExamEnum.MULTISELECTION, text: 'Multiselection' },
    { value: TypeExamEnum.TRUE_FALSE, text: 'True/False' },
  ];

  optionsTypeSubject: any[] = [
    { value: 'finance', text: 'Finance' },
    { value: 'math', text: 'Math' },
    { value: 'geography', text: 'Geography' },
  ];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.examForm = this.fb.group({
      subject: ['finance'],
      typeExam: ['descriptive']
    });
  }

  initExam() {
    this.subjectSelected = this.examForm.value.subject;
    if (this.subjectSelected === 'finance') {
      let type = this.examForm.value.typeExam;
      this.startExam = true;
      this.typeExamSelected = type;
    } else {
      this.toastr.warning(`The exam for ${this.subjectSelected} is not available yet`);
    }
  }

  handleBack() {
    this.startExam = false;
  }
}
