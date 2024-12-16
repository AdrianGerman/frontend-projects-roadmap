const temperatureInput = document.getElementById("temperature")
const fromUnitSelect = document.getElementById("from-unit")
const toUnitSelect = document.getElementById("to-unit")
const convertBtn = document.getElementById("convert-btn")
const resultParagraph = document.getElementById("result")

function validateForm() {
  if (
    temperatureInput.value !== "" &&
    fromUnitSelect.value !== "" &&
    toUnitSelect.value !== ""
  ) {
    convertBtn.disabled = false
  } else {
    convertBtn.disabled = true
  }
}

temperatureInput.addEventListener("input", validateForm)
fromUnitSelect.addEventListener("change", validateForm)
toUnitSelect.addEventListener("change", validateForm)

convertBtn.addEventListener("click", () => {
  const temperature = parseFloat(temperatureInput.value)
  const fromUnit = fromUnitSelect.value
  const toUnit = toUnitSelect.value

  let convertedTemperature

  if (fromUnit === toUnit) {
    convertedTemperature = temperature
  } else if (fromUnit === "celsius" && toUnit === "fahrenheit") {
    convertedTemperature = (temperature * 9) / 5 + 32
  } else if (fromUnit === "celsius" && toUnit === "kelvin") {
    convertedTemperature = temperature + 273.15
  } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
    convertedTemperature = ((temperature - 32) * 5) / 9
  } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
    convertedTemperature = ((temperature - 32) * 5) / 9 + 273.15
  } else if (fromUnit === "kelvin" && toUnit === "celsius") {
    convertedTemperature = temperature - 273.15
  } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
    convertedTemperature = ((temperature - 273.15) * 9) / 5 + 32
  } else {
    resultParagraph.textContent = "Error: Unidades no válidas."
    return
  }

  if (isNaN(convertedTemperature)) {
    resultParagraph.textContent = "Error: La conversión no se pudo realizar."
    return
  }

  resultParagraph.textContent = `${temperature} ${capitalize(
    fromUnit
  )} is ${convertedTemperature.toFixed(2)} ${capitalize(toUnit)}`
})

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
