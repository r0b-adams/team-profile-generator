// accepts an object with an array associated to each key
// returns html of team page
function getTeamPage(rolesObj) { 

    const teamSections = getSections(rolesObj);

    let template = `
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
        ${teamSections}
    </main>

</body>

</html>
`;
    return template;
}

// accepts an object with an array associated to each key
// returns html sections of employee cards
function getSections(rolesObj) {

    let roleSection = "";

    // for each role, make a section
    for (const role in rolesObj) {

        currRoleArray = rolesObj[role]; // gives each array

        // if there are any employees of that type
        // add that section
        if (rolesObj[role].length > 0) {

            // get cards and append to sections
            roleSection += `
            <section class="flex-container">
                ${getTeamCards(currRoleArray)}
            </section> <!-- end section -->
            `;
        }
    }
    return roleSection;
}

// accepts an array of a particular role
// returns the cards in a section for a particular role
function getTeamCards(roleArray) {

    let roleCards = "";

    // for every employee with that role
    // add a card to the template
    for (const employee of roleArray) {
        roleCards += getCard(employee);
      }

    return roleCards
}

// accepts an employee object
// returns template for a single card
function getCard(employee) {

    const roleName = employee.getRole();
    const roleInfo = getRoleInfo(employee);

    return `
<section class="card">        
    <h2><b>${employee.name}</b></h2>
    <table class="info-table">
        <tr>
            <th class="icon-box">${roleInfo.icon}</th>
            <td><b>${roleName}</b></td>
        </tr>
        <tr>
            <th>id:</th>
            <td>${employee.id}</td>
        </tr>
        <tr>
            <th>email:</th>
            <td>${employee.email}</td>
        </tr>
        <tr>
            <th>${roleInfo.label}</th>
            <td>${roleInfo.content}</td>
        </tr>
    </table>
</section><!-- end card -->
`;
}

// accepts an employee object
// returns obj with content unique to person/role
function getRoleInfo(employee) {

    const roleName = employee.getRole();

    if (roleName === "Manager") {
        return {
            icon: "<i class='fa fa-coffee fa-3x'>", 
            label: "office #:", 
            content: employee.getOfficeNumber(),
        }

    } else if (roleName === "Engineer") {

        const githubName = employee.getGithub();
        return {
            icon: "<i class='fa fa-cogs fa-3x'>", 
            label: "github:", 
            content: `<a href="https://github.com/${githubName}">${githubName}</a>`,
        }

    } else { // roleName === "Intern"

        return {
            icon: "<i class='fa fa-graduation-cap fa-3x'>", 
            label: "school:", 
            content: employee.getSchool(),
        }
    }
}

module.exports = {
    getTeamPage,
}