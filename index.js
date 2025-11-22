/*** Light Mode ***
  
  Purpose:
  - Use this starter code to add a light mode feature to your website.

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/

// Step 1: Select the theme button
let themeButton = document.getElementById("theme-button");
// Select the logo image
let headerLogo = document.getElementById("header-logo");

// Step 2: Write the callback function
const toggleLightMode = () => {
  document.body.classList.toggle("light-mode");
  // This section will run whenever the button is clicked
}

// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener("click", toggleLightMode);

/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

  When To Modify:
  - [ ] Project 6 (REQUIRED FEATURE)
  - [ ] Project 6 (STRETCH FEATURE) 
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: Add your query for the submit RSVP button here
let rsvpButton = document.getElementById("rsvp-button");
let count = 3;
const addParticipant = (event, person) => {
  // Step 2: Write your code to manipulate the DOM here
  // let name = document.getElementById("name").value;
  // let state = document.getElementById("state").value;

  // create a new <p> element
  let newParticipant = document.createElement("p");
  newParticipant.textContent = "🌟 " + person.name + " from " + person.homeState + " has RSVP'd.";
  // get rsvp-participants div and add new <p> element to it
  let participants = document.querySelector(".rsvp-participants");
  participants.appendChild(newParticipant);
  
  // Update RSVP count:
  // get rsvp-count element, remove it, and add a new element with updated count
  let rsvpCount = document.getElementById("rsvp-count");
  rsvpCount.remove();
  count = count + 1;

  let newCounter = document.createElement("p");
  newCounter.id = "rsvp-count";
  newCounter.textContent = "🌙 " + count + " people have RSVP'd to this event!";
  participants.appendChild(newCounter);

  event.preventDefault(); /* Stop page from refreshing after Submit RSVP is pressed */
}

// Step 3: Add a click event listener to the submit RSVP button here
// rsvpButton.addEventListener("click", addParticipant);

/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

  When To Modify:
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 7 (STRETCH FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.
const rsvpForm = document.getElementById("rsvp-form");

// Step 2: Write the callback function
const validateForm = (event) => {
  let containsErrors = false;

  var rsvpInputs = document.querySelectorAll("#rsvp-form input[type='text']");
  
  let person = {
    name: rsvpInputs[0].value,
    homeState: rsvpInputs[1].value,
    email: rsvpInputs[2].value
  }
  // Loop through all inputs
  for (let i = 0; i < rsvpInputs.length; i++) {
    // Inside loop, validate the value of each input
    if (rsvpInputs[i].value.trim().length < 2) {
      containsErrors = true;
      rsvpInputs[i].classList.add('error');
    }
    else {
      rsvpInputs[i].classList.remove('error');
    }
  }

  // Validation for email address input
  let email = document.getElementById("email");
  if (!email.value.includes("@")) {
    containsErrors = true;
    email.classList.add('error');
  }
  else {
    email.classList.remove('error');
  }

  // If no errors, call addParticipant() and clear fields
  if (!containsErrors) {
    addParticipant(event, person);
    toggleModal(person);
    for (let i = 0; i < rsvpInputs.length; i++) {
      rsvpInputs[i].value = "";
    }
  }
  event.preventDefault();
}
// Step 3: Replace the form button's event listener with a new one that calls validateForm()
rsvpForm.addEventListener("submit", validateForm);

/*** Animations [PLACEHOLDER] [ADDED IN UNIT 8] ***/

/*** Modal ***
  
  Purpose:
  - Use this starter code to add a pop-up modal to your website.

  When To Modify:
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Project 9 (STRETCH FEATURE)
  - [ ] Any time after
***/

let motionEnabled = true; // true = animations ON, false = animations OFF

const toggleModal = (person) => {
  let modal = document.getElementById("success-modal");
  let modalContent = document.getElementById("modal-text")

  // TODO: Update modal display to flex
  modal.style.display = "flex";

  // TODO: Update modal text to personalized message
  modalContent.textContent = "Thanks for RSVPing, " + person.name + 
  "! We'll be sending an email reminder about the event the day before event day. We can't wait to see you then!";

  let intervalId = setInterval(animateImage, 500);
  // Set modal timeout to 7 seconds
  setTimeout(() => {
    // Update modal display to none
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 7000); 
}

// TODO: animation variables and animateImage() function
let rotateFactor = 0;
let modalImage = document.getElementById("modal-img");
const animateImage  = () => {
  if (!motionEnabled) {
    return; // return out of function early to prevent image from rotating
  }
  rotateFactor = rotateFactor === 0 ? -10 : 0;

  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
}

/* X button functionality to remove modal early */
let modalButton = document.getElementById("modal-exit");
const closeModal = () => {
  // remove the whole modal
  let modal = document.getElementById("success-modal");
  modal.style.display = "none";
}

modalButton.addEventListener("click", closeModal);

/* Reduce Motion button functionality */
let motionButton = document.getElementById("motion-button");
const reduceMotion = () => {
  motionEnabled = !motionEnabled;
  motionButton.textContent = motionEnabled? "Reduce Motion OFF" : "Reduce Motion ON";
}
motionButton.addEventListener("click", reduceMotion);