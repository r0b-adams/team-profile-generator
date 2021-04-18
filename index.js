const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require('inquirer');

// testing class imports
// const testManager = new Manager("Bob", 1, "bob@bob.bob", 42);
// console.log(testManager);

// const testEngineer = new Engineer("Bob", 1, "bob@bob.bob", 42);
// console.log(testEngineer);

// const testIntern = new Intern("Bob", 1, "bob@bob.bob", 42);
// console.log(testIntern);

// testing inquirer
// inquirer
//   .prompt([
//       {
//         name: "test",
//         type: "input",
//         message: "What is your quest?",
//       }
//   ])
//   .then(answers => {
//     console.log(answers);
//   })
//   .catch(error => {
//     console.log(error);
//   });