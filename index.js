const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require('inquirer');
const fs = require('fs');
/*
--testing class imports--
const testManager = new Manager("Bob", 1, "bob@bob.bob", 42);
console.log(testManager);

const testEngineer = new Engineer("Bob", 1, "bob@bob.bob", 42);
console.log(testEngineer);

const testIntern = new Intern("Bob", 1, "bob@bob.bob", 42);
console.log(testIntern);

--testing inquirer--
inquirer
  .prompt([
      {
        name: "test",
        type: "input",
        message: "What is your quest?",
      }
  ])
  .then(answers => {
    console.log(answers);
  })
  .catch(error => {
    console.log(error);
  });
*/

const newTeamMemberQuestions = [
    {
        name: 'name',
        type: 'input',
        message: 'modify this question based on employee type selected:',
    },

    {
        name: 'id',
        type: 'input',
        message: 'Enter employee ID:',
    },

    {
        name: 'email',
        type: 'input',
        message: 'Enter email:',
        // validate: (Function) Receive the user input and answers hash. 
        // Should return true if the value is valid, and an error message (String) otherwise. 
        // If false is returned, a default error message is provided.

        // function that takes a str as input and makes sure it contains an @ and no spaces
    },

    {
        name: 'misc',
        type: 'input',
        message: 'modify this question based on employee type selected:',
        // validate: 
    },
 ];

 const mainMenuChoices = [
    {
        type: 'list',
        message: 'add a team member?',
        name: 'choice',
        choices: ['add an engineer', 'add an intern', 'finish building my team',],
      },
 ];

// PSEUDOCODE


const teamArray = []; // stores team
addManager();

// adds a manager to the team
function addManager() {

    newTeamMemberQuestions[0].message = "what is the team manager’s name?"
    newTeamMemberQuestions[3].message = "what is the team manager’s office number?"

    inquirer
    .prompt(newTeamMemberQuestions)
    .then((newEmployee) => {

        const manager = new Manager(newEmployee.name, newEmployee.id, newEmployee.email, newEmployee.misc);
        teamArray.push(manager);
        mainMenu();
        
    });

}

// asks user if they would like to add another team member
// or finish building the team
function mainMenu() {

    inquirer
    .prompt(mainMenuChoices)
    .then((data) => {

        // console.log(data.choice);

        if (data.choice === 'add an engineer') {
            addEngineer();

        } else if (data.choice === 'add an intern') {
            addIntern();

        } else {
            console.log("not yet implemented, terminating...");
            console.log(teamArray);
            // writeHTML();
        }
    });
}

function addEngineer() {
    console.log("inside add ENGINEER function!");

    newTeamMemberQuestions[0].message = "what is the engineer’s name?"
    newTeamMemberQuestions[3].message = "what is the engineer’s office number?"

    inquirer
    .prompt(newTeamMemberQuestions)
    .then((newEmployee) => {

        const newEngineer = new Engineer(newEmployee.name, newEmployee.id, newEmployee.email, newEmployee.misc);
        teamArray.push(newEngineer);
        mainMenu();
        
    });

}

function addIntern() {
    console.log("inside add INTERN function!");

//   newTeamMemberQuestions[0].message = "what is the intern’s name?"
//   newTeamMemberQuestions[3].message = "what is the intern’s school?"

//     inquirer
//     .prompt(newTeamMemberQuestions)
//     .then((answers) => {

//         console.log(answers);

        // make new Intern
        // push to teamArray
        // mainMenu();

    // });
    mainMenu();
}

/*
function writeHTML() {

const teamTemplate = "";
for each team member 
    enter the following into a string template literal:
        name
        role
          icon corresponding to role
        id
        email
        office#/githubLink/school

    teamTemplate += stringTemplateLiteral;

place teamTemplate string into larger template

note: data must be a string
fs.writeFile('teamprofile.html', data, (err) =>
  err ? console.error(err) : console.log('HTML successfully generated!')
);

}
*/