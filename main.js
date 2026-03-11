const modeBtn = document.getElementById('modeBtn')
const countryName = document.querySelector('.list')
const countryList = document.querySelector('input') // ✅ shu inputni topadi

let countries = []

modeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    document.querySelector('header').classList.toggle('darks')
    countryList.classList.toggle('darks')
})

async function getCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name')
        const data = await response.json()
        countries = data
        showCountries(countries)
    } catch (error) {
        console.error('Error fetching countries:', error)
    }
}

function showCountries(arr){
    countryName.innerHTML = ""
    arr.forEach(c => {
        const div = document.createElement('div')
        div.classList.add('country')
        div.innerHTML = `<h2>${c.name.common}</h2>`
        countryName.appendChild(div)
    })
}

function searchCountries() {
    const searchTerm = countryList.value.toLowerCase()
    const filtered = countries.filter(c =>
        c.name.common.toLowerCase().includes(searchTerm)
    )
    showCountries(filtered)
}

// Input event
countryList.addEventListener('input', () => {
    if (countries.length > 0) searchCountries()
})

getCountries()