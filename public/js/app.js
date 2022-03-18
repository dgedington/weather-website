const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const searchText = searchElement.value

    const div = document.getElementById('output')
    div.innerHTML = ""
    const para = document.createElement("p")
    para.innerHTML = 'Loading...'
    div.appendChild(para)
    
    fetch(`http://localhost:3000/weather?address=${searchText}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            const div = document.getElementById('output')
            div.innerHTML = ""
            const para = document.createElement("p")
            para.innerHTML = `<strong>Error:</strong> ${data.error}`
            div.appendChild(para)
        } else {
            const div = document.getElementById('output')
            div.innerHTML = ""
            const para = document.createElement("p")
            para.innerHTML = `<strong>Location:</strong> ${data.location}`
            const para1 = document.createElement("p")
            para1.innerHTML = `<strong>Weather:</strong> ${data.weather}`
            div.appendChild(para)
            div.appendChild(para1)
            }
        })
    })
})