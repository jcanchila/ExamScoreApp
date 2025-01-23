import { EventEmitter, Output, Component } from "@angular/core";

import { } from "@angular/core";
import { Exam } from "../models/exam.model";

@Component({
    selector: 'app-base-component',
    template: ''
})
export abstract class BaseComponent {
    @Output() actionBack = new EventEmitter<void>();
    @Output() actionGoToScore = new EventEmitter<Exam>();


    abstract back(): void;

    abstract goToScore(): void;

    protected emitActionBack() {
        this.actionBack.emit();
    }

    protected emitActionGoToScore(exam: Exam) {
        this.actionGoToScore.emit(exam);
    }
}