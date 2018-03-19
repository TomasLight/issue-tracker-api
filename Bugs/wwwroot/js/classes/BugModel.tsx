﻿var enumUrgency = Object.freeze({
    "First": 1,
    "Second": 2,
    "Third": 3,
    "Fourth": 4
})
var enumCriticality = Object.freeze({
    "Low": 1,
    "Medium": 2,
    "High": 3,
    "Critical": 4
})
var enumStatus = Object.freeze({
    "New": 1,
    "Opened": 2,
    "Resolved": 3,
    "Closed": 4
})

class BugModel{

    //constructor() {
    //    this.id = 0;
    //    this.name = "";
    //    this.priority = enumUrgency.Fourth;
    //    this.reproSteps = "";
    //    this.severity = enumCriticality.Low;
    //    this.status = enumStatus.New;
    //    this.statusComment = "";
    //    this.histories = [];
    //}
    constructor(bug) {
        this.id = bug.id;
        this.name = bug.name;
        this.priority = bug.priority;
        this.reproSteps = bug.reproSteps;
        this.severity = bug.severity;
        this.status = bug.status;
        this.statusComment = bug.statusComment;
        this.histories = bug.histories;
    }
}

export { enumUrgency, enumCriticality, enumStatus, BugModel };