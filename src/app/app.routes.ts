import { Routes } from '@angular/router';
import { DescriptiveQuestionsComponent } from './questionType/descriptive-questions/descriptive-questions.component';
import { InitializeExamComponent } from './questionType/initialize-exam/initialize-exam.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: 'home', component: InitializeExamComponent },
  { path: 'descriptive-questions', component: DescriptiveQuestionsComponent },
  // Add other routes here
];