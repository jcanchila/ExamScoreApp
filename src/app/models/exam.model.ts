import { Question } from "./question.model";

export class Exam {
    examType?: string;
    subject?: string;
    questionList?: Question[];

    static fromJSON(json: any): Exam {
        const exam = new Exam();
        exam.questionList = json.questionList?.map((q: any) => Question.fromJSON(q));
        Object.assign(exam, json);
        return exam;
    }
}