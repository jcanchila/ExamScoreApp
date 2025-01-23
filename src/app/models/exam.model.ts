export class Question {
    question: string;
    answers: string[];
  
    constructor(question: string, answers: string[]) {
      this.question = question;
      this.answers = answers;
    }
  
    static fromJSON(json: any): Question {
      return new Question(json.question, json.answers);
    }
  }
  
  export class Exam {
    examType: string;
    subject: string;
    questionList: Question[];
  
    constructor(examType: string, subject: string, questionList: Question[]) {
      this.examType = examType;
      this.subject = subject;
      this.questionList = questionList;
    }
  
    static fromJSON(json: any): Exam {
      const questionList = json.questionList.map((q: any) => Question.fromJSON(q));
      return new Exam(json.examType, json.subject, questionList);
    }
  }