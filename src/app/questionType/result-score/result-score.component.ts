import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-score',
  imports: [],
  templateUrl: './result-score.component.html',
  styleUrl: './result-score.component.css'
})
export class ResultScoreComponent {
  
  constructor(private router: Router){ }
   
  score: string = '10/10';
  total: string = '20';

  navigateHome() {
    this.router.navigate(['/home']);
  }
}
