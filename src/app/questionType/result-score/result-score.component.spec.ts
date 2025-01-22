import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultScoreComponent } from './result-score.component';

describe('ResultScoreComponent', () => {
  let component: ResultScoreComponent;
  let fixture: ComponentFixture<ResultScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
