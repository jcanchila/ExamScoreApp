import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from '../../common/base-component.component';
import { ToastrService } from 'ngx-toastr';
import { TypeExamEnum } from '../../enums/type-exam.enum';
import { Exam } from '../../models/exam.model';
import { QuestionStatus } from '../../models/questions-rate.model';
import { CommunicationService } from '../../services/comunication.service';

@Component({
  selector: 'app-multiple-choice-questions',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './multiple-choice-questions.component.html',
  styleUrl: './multiple-choice-questions.component.css'
})
export class MultipleChoiceQuestionsComponent extends BaseComponent implements OnInit {

  @Input() subject: string = '';
  currentStep: number = 0;
  questionsQuantity: number = 0;
  questionStatus = new QuestionStatus();

  questionsList: { id: number, question: string; options: string[], answer: any[] }[] = [
    {
      id: 1,
      question: 'What is the average annual rate of return mentioned in the document?',
      options: [
        'A) 5%',
        'B) 8%',
        'C) 10%',
        'D) 12%.'
      ],
      answer: []
    },
    {
      id: 2,
      question: 'What is one of the critical parts of financial planning mentioned in the document?',
      options: [
        'A) Income statements',
        'B) Cash flow statements',
        'C) Tax returns',
        'D) Investment portfolios'
      ],
      answer: []
    },
    {
      id: 3,
      question: 'What does the Dodd-Frank Act of 2008 aim to address?',
      options: [
        'A) Increase in taxes',
        'B) Regulatory framework',
        'C) Consumer protection',
        'D) Stock market growth.'
      ],
      answer: []
    },
    {
      id: 4,
      question: 'What is the main focus of finance as described in the document?',
      options: [
        'A) Maximizing profits',
        'B) Trade-off between risk and expected return',
        'C) Minimizing costs',
        'D) Increasing market share'
      ],
      answer: []
    }
  ];

  constructor(private fb: FormBuilder, private toastr: ToastrService, private communicationService: CommunicationService) {
    super();
  }

  ngOnInit(): void {
    let jsonSaved = localStorage.getItem(TypeExamEnum.MULTISELECTION);
    if (jsonSaved) {
      let answersPreSaved = JSON.parse(jsonSaved);
      this.questionsList.forEach(
        (item) => {
          item.answer = answersPreSaved.find((answer: any) => answer.id === item.id)?.answer || '';
        }
      );
    }

    const lastPositioned = localStorage.getItem(`QUESTION-POSITIONED-${TypeExamEnum.MULTISELECTION}`);
    this.currentStep = lastPositioned == null ? 0 : Number(lastPositioned);

    this.questionsQuantity = this.questionsList.length;

    this.notifyChangePage();
  }

  notifyChangePage(){
    localStorage.setItem(`QUESTION-POSITIONED-${TypeExamEnum.MULTISELECTION}`, this.currentStep.toString());
    this.questionStatus.quantityQuestions = this.questionsQuantity;
    this.questionStatus.questionsAnswered = this.currentStep + 1;
    this.communicationService.changeValue(this.questionStatus);
  }

  onCheckboxChange(event: any, questionId: number, option: string) {
    const question = this.questionsList.find(q => q.id === questionId);
    if (question) {
      if (event.target.checked) {
        question.answer.push(option);
      } else {
        const index = question.answer.indexOf(option);
        if (index > -1) {
          question.answer.splice(index, 1);
        }
      }
    }

    localStorage.setItem(`${TypeExamEnum.MULTISELECTION}`, JSON.stringify(this.questionsList));
  }

  nextStep(): void {
    if (this.currentStep < this.questionsList.length - 1) {
      this.currentStep++;
      this.notifyChangePage();
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.notifyChangePage();
    }
  }

  isCurrentStepValid(): boolean {
    const question = this.questionsList[this.currentStep];
    return question.answer.length > 0;
  }

  override back(): void {
    this.emitActionBack();
  }

  override goToScore(): void {
    const result = this.questionsList.map((item, index) => ({
      question: item.question,
      answers: item.answer
    }));

    const response = {
      "examType": TypeExamEnum.MULTISELECTION,
      "subject": this.subject,
      "questionList": result
    };

    const exam = Exam.fromJSON(response);
    this.emitActionGoToScore(exam);
  }
}
