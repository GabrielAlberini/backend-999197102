const fetchingData = async () => {
  const response = await fetch("https://rickandmortyapi.com/api/character")
  const data = await response.json()

  data.results.forEach(character => {
    const { name, status, species, gender, origin } = character
    console.log(name)
    console.log(status)
    console.log(species)
    console.log(gender)
    console.log(origin)
  })
}

fetchingData()