import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initialize-exam',
  imports: [],
  templateUrl: './initialize-exam.component.html',
  styleUrl: './initialize-exam.component.css'
})
export class InitializeExamComponent {
  constructor(private router: Router) {}

  selectQuestionType(type: string) {
    if (type === 'descriptive') {
      this.router.navigate(['/descriptive-questions']);
    }
    // Add navigation for other question types here
  }
}
