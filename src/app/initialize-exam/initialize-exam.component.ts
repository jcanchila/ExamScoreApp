import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeExamEnum } from '../enums/type-exam.enum';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';

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
export class InitializeExamComponent implements OnInit {
  examForm!: FormGroup;
  subjectSelected: string = 'finance';
  typeExamSelected: TypeExamEnum = TypeExamEnum.DESCRIPTIVE;
  startExam: boolean = false;
  optionsTypeExam: any[] = [];

  optionsTypeSubject: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private readonly apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getExamType();
    this.getSubjetc();
    this.examForm = this.fb.group({
      subject: ['finance'],
      typeExam: ['descriptive']
    });
  }

  getSubjetc() {
    this.apiService.getSubject().subscribe(
      (response) => {
        this.optionsTypeSubject = response;
      },
      (erro) => {
        this.toastr.error('Ups!! Something went wrong');
      }
    );
  }

  getExamType() {
    this.apiService.getExamType().subscribe(
      (response) => {
        response.forEach((element: any) => {
          switch (element.code.toLowerCase()) {
            case 'descriptive':
              this.optionsTypeExam.push({ value: TypeExamEnum.DESCRIPTIVE, text: element.type });
              break;
            case 'multiselection':
              this.optionsTypeExam.push({ value: TypeExamEnum.MULTISELECTION, text: element.type });
              break;
            case 'true-false':
              this.optionsTypeExam.push({ value: TypeExamEnum.TRUE_FALSE, text: element.type });
              break;
          }
        });
      },
      (error) => {
        this.toastr.error('Ups!! Something went wrong');
      }
    );
  }

  initExam(){
    this.subjectSelected = this.examForm.value.subject;
    if (this.subjectSelected === 'finance') {
      let type = this.examForm.value.typeExam;
      this.typeExamSelected = type;
      this.startExam = true;
    } else {
      this.toastr.warning(`The exam for ${this.subjectSelected} is not available yet`);
    }
  }

  goToQuestions() {
    this.router.navigate(['/start-exam/type-exam', this.typeExamSelected, 'subject' ,this.subjectSelected]);
  }
}
