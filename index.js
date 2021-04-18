const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require('inquirer');
const fs = require('fs');

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
    },

    {
        name: 'misc',
        type: 'input',
        message: 'modify this question based on employee type selected:',
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

// initialize with manager
addManager();

// adds a manager to the team array
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
function mainMenu() {

    inquirer
    .prompt(mainMenuChoices)
    .then((data) => {

        if (data.choice === 'add an engineer') {
            addEngineer();

        } else if (data.choice === 'add an intern') {
            addIntern();

        } else { // data.choice === 'finish building my team'
            writeHTML();
        }
    });
}

// adds an engineer to the team array
function addEngineer() {

    newTeamMemberQuestions[0].message = "what is the engineer’s name?"
    newTeamMemberQuestions[3].message = "what is the engineer’s github handle?"

    inquirer
    .prompt(newTeamMemberQuestions)
    .then((newEmployee) => {

        const newEngineer = new Engineer(newEmployee.name, newEmployee.id, newEmployee.email, newEmployee.misc);
        teamArray.push(newEngineer);
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

      const newIntern = new Intern(newEmployee.name, newEmployee.id, newEmployee.email, newEmployee.misc);
      teamArray.push(newIntern);
      mainMenu();
      
  });
}

// writes HTML
function writeHTML() {

    const teamTemplate = "does this thing work?";

    fs.writeFile('./dist/team-profile.html', teamTemplate, (err) =>
    err ? console.error(err) : console.log('HTML successfully generated!')
    );

}
