// Check js file Connected
// console.log('hi')
// Create variable to access dropdown (select) -> then in fetch (create option elements for each name, give distinct value attributes, append 'option' to 'select')
const dropDown = document.getElementById(`dropDown`)
console.log(dropDown)

// Create fetch function variable
const fetchInfo = () => {
    fetch(`https://ghibliapi.herokuapp.com/people`)
    .then(resp => resp.json())
    .then(respJson => {
        respJson.forEach(({name, age, eye_color, hair_color}) => {
            const option = document.createElement(`option`)
            option.value = name
            option.innerText = name
            dropDown.append(option)

            // Variables for 'info' div
            const personInfo = document.createElement(`article`)
            personInfo.classList.add('hidden')
            personInfo.id = `${name}`
            personInfo.innerHTML = `
            <h4>${name}</h4>
            <p>Age: ${age}</p>
            <p>Eye Color: ${eye_color}</p>
            <p>Hair Color: ${hair_color}</p>`

            document.getElementById(`info`).append(personInfo)

        })
    })
}
// Call fetch function
// fetchInfo()
// ADD EVENT LISTENER TO DROPDOWN 
dropDown.addEventListener(`change`, (e) => {
    // conditional to remove previous person's info before displaying the next selection
    if(document.querySelector(`.show`)){
        document.querySelector(`.show`).classList.toggle('hidden')
        document.querySelector(`.show`).classList.remove('show')
}
    document.getElementById(`${e.target.value}`).classList.toggle(`hidden`)
    document.getElementById(`${e.target.value}`).classList.add(`show`)

})