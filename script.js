const Stack = require('./Stack.js');
//Here we import the prompt-sync npm package.
const prompt = require('prompt-sync')();
// second step
//Here we create a global variable that holds the default page.
let currentPage = 'Default page';
// ------------------------------

// first step Initialization
// backPages variable is created to model the history of visited pages.
const backPages = new Stack();
// nextPages variable is created to model the pages that get moved when an old page from the backpages stack is revisited.
const nextPages = new Stack();
// ------------------------------

// third step
// We create helper functions to helps us implement the basic operations of this program.
function showCurrentPage(action) {
  console.log(`\n${action}`);
  console.log(`Current page = ${currentPage}`);
  console.log('Back page = ', backPages.peek());
  console.log('Next Page = ', nextPages.peek());
}
// ------------------------------

//Fourth step
function newPage(page) {
  //Here we push currentPage to the backPages stack.
  backPages.push(currentPage);
  // Here we update currentPage to be page.
  currentPage = page;

  //Here we clear the nextPages stack.
  while(!nextPages.isEmpty()) {
    nextPages.pop();
  }
  //Here we show the current page by calling the helper function defined in task 1.
  showCurrentPage("New: ");
}
// ------------------------------

//fifth step
//here we created another helper function that takes in no parameter. This function is called when we nav backward a page.
backPage = () => {
  //Here we push currentPage into nextPages stack as we will no longer display it.
  nextPages.push(currentPage);
  //Here we remove the top item from the backpages stack and set it as the current page.
  currentPage = backPages.pop();
  //here we display the new current page using the helper func we created in task 1 and pass an argument to denote the back operation.
  showCurrentPage("Back: ");
}
// ------------------------------

//sixth step
// Here we created the last helper function in which is parallel to the backPage function.
nextPage = () => {
  // Here we push the current page to the backPages stack as we no longer will display.
  backPages.push(currentPage);
  // Here we remove the top item from the nextpages stack and set it as the currentpage.
    currentPage = nextPages.pop();
  // Here we display the new currentpage and denote the next operation.
  showCurrentPage("Next: ");
}
// ------------------------------


// ------------------------------
// User Interface Part 1
// ------------------------------

//seventh step
//Here we created a global variable that controls the termination of a while loop that takes in user input.
let finish = false;
// ------------------------------

//eighth step
// This is going to control when the back and front navigation operations are enabled.
let showBack = false;
let showNext = false;
// ------------------------------

//ninth step
// Here we call the function that shows a default page when the program is started.
showCurrentPage('Default: ');
// ------------------------------

//10th step and 11th
//Here we implement a while loop that utilizes the finish global variable as a condition.
while(finish === false) {
  /*The following strings are used to prompt the user. These strings contain user input instructions that will be referenced in the while loop.
 */
const baseInfo = '\nEnter a url';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'Where would you like to go today? '

  let instructions = baseInfo;
  // if backpages is not empty we want to append backinfo to instructions seperated by a comma.
  if (!backPages.isEmpty()) {
    instructions = `${instructions},
     ${backInfo}`;
     // Here we enable backward nav using showback. Otherwise we want to disable backward navigation.
     showBack = true;
  } else {
    showBack = false;
  }

 // ------------------------------

 //12th step
 //Parallel to step 11 we are implemented a similar logic to nextPages stack.
 //If nexytpages is not empty we want to append nextInfo to instructions seperated by a comma.
if (!nextPages.isEmpty()) {
    instructions = `${instructions},
    ${nextInfo}`;
    // Here we want to enable or disable forward navigation.
    showNext = true;
} else {
  showNext = false;
}
// ------------------------------

 //13th step
 // Here we want to enable the user to quit the program by adding quitinfo to instructions and display the final format of instructions to the user.
 instructions = `${instructions},
 ${quitInfo}.`;
 console.log(instructions);
// ------------------------------
// User Interface Part 2 focuses on prompting the user for input and processing user input while inside the while loop.
// ------------------------------

//14th step
//Here we prompt for user input.
const answer = prompt(question);
// ------------------------------

//15th step
//since we accept both lowercase and uppercase inputs we want to lowercase our response without overriding the original response.
let lowerCaseAnswer = answer.toLowerCase();
// ------------------------------

//16th step
// this checks to see what the user input is. We only want to display a new page if it is a url string. and we want to display what that url is.
 if ((lowerCaseAnswer !== 'n') && (lowerCaseAnswer !== 'b') && (lowerCaseAnswer !== 'q')) {
    newPage(answer);
  }
// ------------------------------

//17th step
// Here we write an else if statement that navigates back and forward a page utilizing the showNext and showback statuses.
 else if ((showNext === true) && (lowerCaseAnswer === 'n')) {
    // we navigate forward a page
    nextPage();
  } else if ((showBack === true) && (lowerCaseAnswer === 'b')) {
    // we navigate back a page
    backPage();
  }
// ------------------------------

//18th step
//Here we provide messages that lets user know they cannot proceed with that option.
  else if (lowerCaseAnswer === 'b') {
    // invalid input to a non-available option
    console.log('Cannot go back a page. Stack is empty.');
  } else if (lowerCaseAnswer === 'n') {
    // invalid input to a non-available option
    console.log('Cannot go to the next page. Stack is empty.');
  }
// ------------------------------

//19th step
//Here we allow the user to be able to quit the program.
else if (lowerCaseAnswer === 'q') {
  finish = true;
}
// ------------------------------
}
//20th step
//now we execute node script.js on the terminal.
