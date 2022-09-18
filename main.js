// Check js file Connected
// console.log('hi')
// Create variable to access dropdown (select) -> then in fetch (create option elements for each name, give distinct value attributes, append 'option' to 'select')
const dropDown = document.getElementById(`dropDown`);

//Variables for 'ShoutOut' Elements
const form = document.querySelector(`form`);
const list = document.querySelector(`ul`);

// // Create fetch function variable
const fetchInfo = () => {
  fetch(`https://ghibliapi.herokuapp.com/people`)
    .then((resp) => resp.json())
    .then((respJson) => {
      respJson.forEach(({ name, age, eye_color, hair_color }) => {
        const option = document.createElement(`option`);
        option.value = name;
        option.innerText = name;
        dropDown.append(option);

        // Variables for 'info' div
        const personInfo = document.createElement(`article`);
        personInfo.classList.add("hidden");
        personInfo.id = `${name}`;
        personInfo.innerHTML = `
            <h4>${name}</h4>
            <p>Age: ${age}</p>
            <p>Eye Color: ${eye_color}</p>
            <p>Hair Color: ${hair_color}</p>`;

        document.getElementById(`info`).append(personInfo);
      });
    });
};
// // Call fetch function
fetchInfo();
// ADD EVENT LISTENER TO DROPDOWN
dropDown.addEventListener(`change`, (e) => {
  // conditional to remove previous errors if correct selcetion is made
  if (document.querySelectorAll(`.error`).length) {
    document.querySelectorAll(`.error`).forEach((err) => err.remove());
  }
  // conditional to remove previous person's info before displaying the next selection
  if (document.querySelector(`.show`)) {
    document.querySelector(`.show`).classList.toggle("hidden");
    document.querySelector(`.show`).classList.remove("show");
  }
  document.getElementById(`${e.target.value}`).classList.toggle(`hidden`);
  document.getElementById(`${e.target.value}`).classList.add(`show`);
});

// Event Listener for form (only availabe if a person is selected)
form.addEventListener(`submit`, (event) => {
  event.preventDefault();
  // CREATE ERRORS
  if (dropDown.value === `Please Make A Selection`) {
    const error = document.createElement(`p`);
    error.classList.add(`error`);
    error.innerText = `Please Select A Person`;
    const shoutOutSection = document.querySelector(`.shoutOutInput`);
    shoutOutSection.append(error);
  } else if (event.target.shoutout.value === ``) {
    const shoutoutError = document.createElement(`p`);
    shoutoutError.classList.add(`shoutoutError`);
    shoutoutError.innerText = `Please add a shoutout for <${dropDown.value}>`;
    form.append(shoutoutError);
  } else if (
    dropDown.value !== "Please Me A Selection" &&
    event.target.shoutout.value !== ``
  ) {
    //REMOVE SHOUTOUT ERROR (IF ANY) WHEN CORECT CONDITIONALS ARE MET
    if (document.querySelectorAll(`.shoutoutError`).length) {
      document.querySelectorAll(`.shoutoutError`)
        .forEach((shouterr) => shouterr.remove());
    }
    //   CREATE LI FOR SHOUTOUT AND APPEND
    const listItem = document.createElement(`li`);
    listItem.innerHTML = `
        <strong>${dropDown.value}: </strong>
        ${event.target.shoutout.value}`;
    list.append(listItem);
  }
  form.reset();
});

// EVENT LISTENER FOR REMOVE SHOUTOUT BUTTON
const removeButton = document.getElementById(`reset-shoutouts`)
removeButton.addEventListener(`click`, (e) => {
    e.preventDefault()
    list.innerHTML = ``
})
