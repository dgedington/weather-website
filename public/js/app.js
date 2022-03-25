const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    let searchText = searchElement.value
    const div = document.getElementById('output')
    div.innerHTML = ""
    const para = document.createElement("p")
    para.innerHTML = 'Loading...'
    div.appendChild(para)
    
    fetch('/weather?address=' + searchText).then((response) => {
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
            para.innerHTML = `<strong>Weather for location:</strong> ${data.location}`
            div.appendChild(para)
            const para1 = document.createElement("p")
            para1.innerHTML = `<img src="${data.weather.icon}" />`
            div.appendChild(para1)
            const para2 = document.createElement("p")
            para2.innerHTML = `<strong>Current conditions: </strong> ${data.weather.description}`
            div.appendChild(para2)
            const para3 = document.createElement("p")
            para3.innerHTML = `<strong>Temperature: </strong> ${data.weather.temperature}&#176;C, feels like ${data.weather.feelslike}&#176;C`
            div.appendChild(para3)
            const para4 = document.createElement("p")
            para4.innerHTML = `<strong>Humidity: </strong> ${data.weather.humidity}%.`
            div.appendChild(para4)
            const para5 = document.createElement("p")
            para5.innerHTML = `<strong>Pressure: </strong> ${data.weather.pressure}hPa.`
            div.appendChild(para5)
            }
        })
    })

    searchElement.value = ""
    
})