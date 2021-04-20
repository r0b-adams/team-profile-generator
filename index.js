const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const fs = require('fs');

// assist with user input
const inquirer = require('inquirer');

// helper code
const htmlGenerator = require('./dist/generator');

// imported questions for inquirer prompt
const questions = require('./dist/questions');
const mainMenuQs = questions.mainMenu;
const newEmpQs = questions.newEmployee;

// stores team members
const teamArray = []; 

// initialize with manager
addManager();

// asks user if they would like to add another team member
function mainMenu() {

    inquirer
    .prompt(mainMenuQs)
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

    newEmpQs[0].message = "what is the team manager’s name?"
    newEmpQs[3].message = "what is the team manager’s office number?"

    inquirer
    .prompt(newEmpQs)
    .then((newEmployee) => {

        const manager = new Manager(newEmployee.name, newEmployee.id, newEmployee.email, newEmployee.misc);
        teamArray.push(manager);
        mainMenu();
        
    });

}

// adds an engineer to the team array
function addEngineer() {

    newEmpQs[0].message = "what is the engineer’s name?"
    newEmpQs[3].message = "what is the engineer’s github handle?"

    inquirer
    .prompt(newEmpQs)
    .then((newEmployee) => {

        const newEngineer = new Engineer(newEmployee.name, newEmployee.id, newEmployee.email, newEmployee.misc);
        teamArray.push(newEngineer);
        mainMenu();
        
    });
}

// adds an intern to the team array
function addIntern() {

    newEmpQs[0].message = "what is the intern’s name?"
    newEmpQs[3].message = "what is the intern’s school?"

    inquirer
    .prompt(newEmpQs)
    .then((newEmployee) => {

        const newIntern = new Intern(newEmployee.name, newEmployee.id, newEmployee.email, newEmployee.misc);
        teamArray.push(newIntern);
        mainMenu();

  });
}

// writes HTML template to file
function writeHTML() {

    const sortedRoles = getSortedRoles();
    const teamTemplate = htmlGenerator.getTeamPage(sortedRoles);

    fs.writeFile('./dist/team.html', teamTemplate, (err) =>
    err ? console.error(err) : console.log('HTML successfully generated!')
    );
}

// iterates over teamArray and returns an object with arrays sorted by role
function getSortedRoles() {
    const sortedArrays = {
        managers: [],
        engineers: [],
        interns: [],
    };

    for (const employee of teamArray) {
        role = employee.getRole();
        switch (role) {
            case "Manager":
                sortedArrays.managers.push(employee);
              break;
            case "Engineer":
                sortedArrays.engineers.push(employee);
              break;
            default:
              sortedArrays.interns.push(employee);
          }
      }

    // for (let i = 0; i < teamArray.length; i++)  {

    //     const currEmployee = teamArray[i]

    //     if (teamArray[i].getRole() === "Manager") {
    //         sortedArrays.managers.push(currEmployee);

    //     } else if (teamArray[i].getRole() === "Engineer") {
    //         sortedArrays.engineers.push(currEmployee);

    //     } else { // (teamArray[i].getRole() === "Intern")
    //         sortedArrays.interns.push(currEmployee);
    //     } 
    // }

    return sortedArrays;
}





