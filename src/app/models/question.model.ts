export class Question {
    question?: string;
    answers?: string[];

    static fromJSON(json: any): Question {
        const question = new Question();
        Object.assign(question, json);
        return question;
    }
}