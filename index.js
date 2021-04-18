const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require('inquirer');
const fetch = require("node-fetch");
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
const uniqueIDs = [];

const newTeamMemberQuestions = [
    {
        name: 'name',
        type: 'input',
        message: 'modify this question based on employee type selected:',
    },

    {
        // validate this so id is unique
        name: 'id',
        type: 'input',
        message: 'Enter employee ID:',
        // validate: function (value) {
        //     if ((/.+/).test(value)) { return true; }
        //     return 'name is required';
        // }
        
    },

    {
        name: 'email',
        type: 'input',
        message: 'Enter email:',
        validate: function (userInput) {
            const hasNoSpaces = userInput.indexOf(" ") === -1;
            const hasAt = userInput.includes("@");
            const hasDot = userInput.includes(".");
            if (hasAt && hasDot && hasNoSpaces) {
                 return true; 
                }
            return 'Please enter a valid e-mail address';
        }
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

const teamArray = []; // stores team
addManager();

// adds a manager to the team array
function addManager() {

    newTeamMemberQuestions[0].message = "what is the team manager’s name?"
    newTeamMemberQuestions[3].message = "what is the team manager’s office number?"

    inquirer
    .prompt(newTeamMemberQuestions)
    .then((newEmployee) => {

        uniqueIDs.push(newEmployee.id);
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

        if (data.choice === 'add an engineer') {
            addEngineer();

        } else if (data.choice === 'add an intern') {
            addIntern();

        } else {
            console.log("writeHTML not yet implemented");
            console.log("here's the team you created:");
            console.log(teamArray);
            // writeHTML();
        }
    });
}

// adds an engineer to the team array
function addEngineer() {

    newTeamMemberQuestions[0].message = "what is the engineer’s name?"
    newTeamMemberQuestions[3].message = "what is the engineer’s github handle?"

    const engineerQuestion = {
        name: 'misc',
        type: 'input',
        message: 'modify this question based on employee type selected:',
        validate: (userInput) => {
            const hasNoSpaces = userInput.indexOf(" ") === -1;
            const hasAt = userInput.includes("@");
            const hasDot = userInput.includes(".");
            if (hasAt && hasDot && hasNoSpaces) {
                 return true; 
                }
            return 'Please enter a valid e-mail address';
        }
    }
    newTeamMemberQuestions.push(engineerQuestion);

    inquirer
        .prompt(newTeamMemberQuestions)
        .then((newEmployee) => {
            uniqueIDs.push(newEmployee.id);
            const newEngineer = new Engineer(newEmployee.name, newEmployee.id, newEmployee.email, newEmployee.misc);
            teamArray.push(newEngineer);
            newTeamMemberQuestions.pop(engineerQuestion);
            console.log(newTeamMemberQuestions);
            mainMenu();
        });
}

// adds an intern to the team array
function addIntern() {

  newTeamMemberQuestions[0].message = "what is the intern’s name?"
  newTeamMemberQuestions[3].message = "what is the intern’s school?"

    inquirer
        .prompt(newTeamMemberQuestions)
        .then((newEmployee) => {
            uniqueIDs.push(newEmployee.id);
            const newIntern = new Intern(newEmployee.name, newEmployee.id, newEmployee.email, newEmployee.misc);
            teamArray.push(newIntern);
            mainMenu();
        });
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