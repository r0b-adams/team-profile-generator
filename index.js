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

    const teamTemplate = getHtmlTemplate ();

    fs.writeFile('./dist/team-profile.html', teamTemplate, (err) =>
    err ? console.error(err) : console.log('HTML successfully generated!')
    );

}

function getHtmlTemplate() {

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="./reset.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="./style.css">

    <title>Team Profile</title>

</head>

<body>

    <header>
        <h1>
            My Team
        </h1>
    </header>

    <main>

        <!-- team section -->
        <section class="flex-container">
            ${getCards()}
        </section> <!-- end manager section -->

    </main>

</body>

</html> 
`;
}


function getCards() {

    let htmlCards = "";

    for (let i = 0; i < teamArray.length; i++) {

        const role = teamArray[i].getRole();
        let roleIcon;
        let uniqueDataName;
        let uniqueData;

        if (role === "Manager") {

            roleIcon = "<i class='fa fa-coffee fa-3x'>";
            uniqueDataName = "office #:";
            uniqueData = teamArray[i].getOfficeNumber();

        } else if (role === "Engineer") {

            roleIcon = "<i class='fa fa-cogs fa-3x'>";
            uniqueDataName = "github:";
            uniqueData = teamArray[i].getGithub();

        } else { // role === "Intern"

            roleIcon = "<i class='fa fa-graduation-cap fa-3x'>";
            uniqueDataName = "school:";
            uniqueData = teamArray[i].getSchool();
        }

        htmlCards += `
        <section class="card">        
            <h2><b>${teamArray[i].name}</b></h2>
            <table class="info-table">
                <tr>
                    <th class="icon-box">${roleIcon}</i></th>
                    <td><b>${role}</b></td>
                </tr>
                <tr>
                    <th>id:</th>
                    <td>${teamArray[i].id}</td>
                </tr>
                <tr>
                    <th>email:</th>
                    <td>${teamArray[i].email}</td>
                </tr>
                <tr>
                    <th>${uniqueDataName}</th>
                    <td>${uniqueData}</td>
                </tr>
            </table>
        </section><!-- end card -->
        `;
    }

    return htmlCards;
}

