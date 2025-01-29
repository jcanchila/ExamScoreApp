import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../common/base-component.component';
import { ToastrService } from 'ngx-toastr';
import { TypeExamEnum } from '../../enums/type-exam.enum';
import { Exam } from '../../models/exam.model';
import { CommunicationService } from '../../services/comunication.service';
import { QuestionStatus } from '../../models/questions-rate.model';

@Component({
  selector: 'app-descriptive-questions',
  templateUrl: './descriptive-questions.component.html',
  styleUrls: ['./descriptive-questions.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class DescriptiveQuestionsComponent extends BaseComponent implements OnInit {

  @Input() subject: string = '';
  currentStep: number = 0;
  questionsQuantity: number = 0;
  questionStatus = new QuestionStatus();

  questionsList: any[] = [
    { id: 1, question: 'How Does a Company Recognize a Sale and an Expense.?', answer: '', min: 10, max: 2000 },
    { id: 2, question: 'When Should a Company Capitalize or Expense an Item?', answer: '', min: 10, max: 2000 },
    { id: 3, question: 'What Is a Fixed Asset?', answer: '', min: 10, max: 2000 },
    { id: 4, question: 'What Is Depreciation.?', answer: '', min: 10, max: 2000 }
  ];

  constructor(private toastr: ToastrService, private communicationService: CommunicationService) {
    super();
  }

  ngOnInit(): void {
    let questionsAnswered: number = 0;
    let jsonSaved = localStorage.getItem(TypeExamEnum.DESCRIPTIVE);
    if (jsonSaved) {
      let answersPreSaved = JSON.parse(jsonSaved);
      this.questionsList.forEach(
        (item) => {
          item.answer = answersPreSaved.find((answer: any) => answer.id === item.id)?.answer || '';
          questionsAnswered += item.answer != '' ? 1 : 0;
        }
      );
    }

    const lastPositioned = localStorage.getItem(`QUESTION-POSITIONED-${TypeExamEnum.DESCRIPTIVE}`);
    this.currentStep = lastPositioned == null ? 0 : Number(lastPositioned);

    this.questionsQuantity = this.questionsList.length;

    this.notifyChangePage();

  }

  notifyChangePage(){
    localStorage.setItem(`QUESTION-POSITIONED-${TypeExamEnum.DESCRIPTIVE}`, this.currentStep.toString());
    this.questionStatus.quantityQuestions = this.questionsQuantity;
    this.questionStatus.questionsAnswered = this.currentStep + 1;
    this.communicationService.changeValue(this.questionStatus);
  }

  onAnswerChange() {
    localStorage.setItem(`${TypeExamEnum.DESCRIPTIVE}`, JSON.stringify(this.questionsList));
  }

  override back(): void {
    this.emitActionBack();
  }

  isCurrentStepValid(): boolean {
    return !!this.questionsList[this.currentStep].answer;
  }

  nextStep() {
    if (!this.questionsList[this.currentStep].answer) {
      this.toastr.warning('Warning', 'Please answer the question');
      return;
    }

    if (this.questionsList[this.currentStep].answer.length < this.questionsList[this.currentStep].min) {
      this.toastr.warning('Warning', 'Please answer the question with at least ' + this.questionsList[this.currentStep].min + ' characters');
      return;
    }
    if (this.currentStep < this.questionsList.length - 1) {
      this.currentStep++;
      
      this.notifyChangePage();
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.notifyChangePage();
    }
  }

  override goToScore(): void {
    const result = this.questionsList.map((item, index) => ({
      question: item,
      answers: [item.answer || '']
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
