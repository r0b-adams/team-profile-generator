const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const fs = require('fs');

const htmlGenerator = require('./generator');
const inquirer = require('inquirer');

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

 // TESTING
const teamArray = [
    new Manager("MANAGER", "newEmployee.id", "newEmployee.email", "OFFICE NUMBER"),
    new Engineer('ENGINEER 1', 'newEmployee.id', 'newEmployee.email', 'GITHUB'),
    new Intern('INTERN 1', 'newEmployee.id,', 'newEmployee.email', 'SCHOOL'),
    new Engineer('ENGINEER 2', 'newEmployee.id', 'newEmployee.email', 'GITHUB'),
    new Intern('INTERN 2', 'newEmployee.id,', 'newEmployee.email', 'SCHOOL'),
    new Engineer('ENGINEER 3', 'newEmployee.id', 'newEmployee.email', 'GITHUB'),
    new Intern('INTERN 3', 'newEmployee.id,', 'newEmployee.email', 'SCHOOL'),
]; // stores team

// initialize with manager
// addManager();

// console.log(teamArray);
console.log(htmlGenerator.getTeamPage(getSortedRoles()));


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

    const sortedRoles = getSortedRoles();
    const teamTemplate = htmlGenerator.getTeamPage(sortedRoles);

    fs.writeFile('./dist/team-profile.html', teamTemplate, (err) =>
    err ? console.error(err) : console.log('HTML successfully generated!')
    );

}

// iterates over teamArray function and returns
// an object with arrays sorted by role
function getSortedRoles() {
    const sortedArrays = {
        managers: [],
        engineers: [],
        interns: [],
    };

    for (let i = 0; i < teamArray.length; i++)  {

        const currEmployee = teamArray[i]

        if (teamArray[i].getRole() === "Manager") {
            sortedArrays.managers.push(currEmployee);

        } else if (teamArray[i].getRole() === "Engineer") {
            sortedArrays.engineers.push(currEmployee);

        } else { // (teamArray[i].getRole() === "Intern")
            sortedArrays.interns.push(currEmployee);
        } 
    }

    return sortedArrays;
}





