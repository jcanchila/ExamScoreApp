import { Routes } from '@angular/router';
import { DescriptiveQuestionsComponent } from './questionType/descriptive-questions/descriptive-questions.component';
import { InitializeExamComponent } from './questionType/initialize-exam/initialize-exam.component';
import { MultipleChoiceQuestionsComponent } from './questionType/multiple-choice-questions/multiple-choice-questions.component';
import { TrueFalseQuestionsComponent } from './questionType/true-false-questions/true-false-questions.component';
import { ResultScoreComponent } from './questionType/result-score/result-score.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: 'home', component: InitializeExamComponent },
  { path: 'descriptive-questions', component: DescriptiveQuestionsComponent },
  { path: 'multiple-choice-questions', component: MultipleChoiceQuestionsComponent },
  { path: 'true-false-questions', component: TrueFalseQuestionsComponent },
  { path: 'score', component: ResultScoreComponent },
  // Add other routes here
];