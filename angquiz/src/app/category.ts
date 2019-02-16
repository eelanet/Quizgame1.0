export class Category {
    // konstruktorimetodi joka rakentaa student-olion
    constructor(
        public _id: string, // mongon lisäämä _id
        public catname: string,
        public catquestions: Array<{}>) { }
}