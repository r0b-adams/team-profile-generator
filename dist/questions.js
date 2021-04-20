const newEmployee = [
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

 const mainMenu = [
    {
        type: 'list',
        message: 'add a team member?',
        name: 'choice',
        choices: ['add an engineer', 'add an intern', 'finish building my team',],
      },
 ];

module.exports = {
    newEmployee,
    mainMenu,
}