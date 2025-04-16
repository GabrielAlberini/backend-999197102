const form = document.querySelector("form")

form.addEventListener("submit", (event) => {
  event.preventDefault()
  const i1 = form.querySelector("#i1").value
  const i2 = form.querySelector("#i2").value
  const result = document.querySelector("#result")

  result.textContent = i1 + i2
})