import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectQuestionsComponent } from '../select-questions/select-questions.component';
import { TypeExamEnum } from '../enums/type-exam.enum';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-start-exam',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SelectQuestionsComponent
  ],
  templateUrl: './start-exam.component.html',
  styleUrl: './start-exam.component.css'
})
export class StartExamComponent implements OnInit {
  subject: string = '';
  typeExam!: TypeExamEnum;
  startExam: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {
    let examType = this.route.snapshot.paramMap.get('typeExam');
    if (examType) {
      this.typeExam = examType as TypeExamEnum;
    }
    this.subject = this.route.snapshot.paramMap.get('subject')!;
  }

  initExam() {
     this.startExam = true;
  }

  handleBack() {
    this.router.navigate(['/home'])
  }
}
