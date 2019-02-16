export class Question {
    // konstruktorimetodi joka rakentaa question-olion
    constructor(
        public _id: string, // mongon lisäämä _id
        public question: string,
        public option1: string,
        public option2: string,
        public option3: string,
        public option4: string,
        public answer: number) { }
}