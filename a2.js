/********************************************************************************
*  WEB700 – Assignment 2 
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.   
*  No part of this assignment has been copied manually or electronically from any other source 
*  (including web sites) or distributed to other students. 
*  
*  Name: Nate Joshua Student ID: njoshua2 Date: 30/1/2024 
* 
********************************************************************************/

const { error } = require('console');
const collegedata = require('./modules/collegeData'); // import the collegedata module

collegedata.initialize().then((datacollection) => { // initialize first so the other functions can access the data
    // retrieve data for students, courses and TAs, catching any error that happens
    collegedata.getallstudents(datacollection).then((studentlist) => {
        console.log(`Successfully retrieved ${studentlist.length} students`);
    }).catch((error) => {
        console.error(`Error retrieving students: ${error}`);
    })

    collegedata.getcourses(datacollection).then((courselist) => {
        console.log(`Successfully retrieved ${courselist.length} courses`);
    }).catch((error) => {
        console.error(`Error retrieving courses: ${error}`);
    })

    collegedata.getTAs(datacollection).then((talist) => {
        console.log(`Successfully retrieved ${talist.length} TAs`);
    }).catch((error) => {
        console.error(`Error retrieving TAs: ${error}`)
    })
}).catch((error) => {
    console.error(`Error importing data: ${error}`) // catching error if collegedata fails to read data or the module fails to import
})