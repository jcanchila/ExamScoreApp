export class QuestionStatus {
  questionsAnswered?: number;
  quantityQuestions?: number;

  static fromJSON(json: any): QuestionStatus {
      const questionStatus = new QuestionStatus();
      Object.assign(questionStatus, json);
      return questionStatus;
  }
}