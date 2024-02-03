const fs = require("node:fs"); // require fs to read our json files
const { types } = require("node:util");

class data { // create the data class
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

var datacollection = null; // create an empty datacollection variable

module.exports.initialize = () => {
    return new Promise((resolve, reject) => {
        fs.readFile("./data/students.json", "utf8", (err, filedata) => { // open and read the file, using promises because it's asynchronous
            if (err) {
                reject("Unable to read students.json");
            }
            let studentdata = JSON.parse(filedata);

            fs.readFile("./data/courses.json", "utf8", (err, filedata) => { // start reading the second file under the first one, executing only after the first one has finished
                if (err) {
                    reject("Unable to read courses.json");
                }
                let coursedata = JSON.parse(filedata);

                var datacollection = new data(studentdata, coursedata); // use the empty variable to create a new object of the data class
                resolve(datacollection);
            })
        })
    })
}

module.exports.getallstudents = (datacollection) => { // gets an array of students from datacollection
    return new Promise((resolve, reject) => {
        if (typeof datacollection.students.length == 0) {
            reject("No entries found");
        } else {
            resolve(datacollection.students);
        }
    })
}

module.exports.getcourses = (datacollection) => { // gets an array of courses from datacollection
    return new Promise((resolve, reject) => {
        if (typeof datacollection.courses.length == 0) {
            reject("No entries found");
        } else {
            resolve(datacollection.courses);
        }
    })
}

module.exports.getTAs = (datacollection) => { // gets an array of TAs from datacollection
    return new Promise((resolve, reject) => {
        var listofta = [];
        for (var i = 0; i < datacollection.students.length ; i++) { // loop through the array and append students who have their TA value set to true to an empty array
            if (datacollection.students[i]['TA'] == true) {
                listofta.push(datacollection.students[i]);
            }
        }
        if (listofta.length == 0) {
            reject("No entries found");
        } else {
            resolve(listofta);
        }
    })
}