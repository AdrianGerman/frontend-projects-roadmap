const picker = datepicker("#birthdate", {
  formatter: (input, date) => {
    const value = date.toISOString().split("T")[0]
    input.value = value
  },
  maxDate: new Date()
})

document.getElementById("ageForm").addEventListener("submit", function (event) {
  event.preventDefault()

  const birthdateInput = document.getElementById("birthdate").value

  if (!birthdateInput) {
    document.getElementById("result").innerText =
      "Please, enter a valid date of birth."
    return
  }

  const birthDate = luxon.DateTime.fromISO(birthdateInput)
  const now = luxon.DateTime.now()

  const diff = now.diff(birthDate, ["years", "months", "days"]).toObject()
  const years = Math.floor(diff.years)
  const months = Math.floor(diff.months)
  const days = Math.floor(diff.days)

  const yearsText = `<strong>${years} years</strong>`
  const monthsText = `<strong>${months} months</strong>`
  const daysText = `<strong>${days} days</strong>`

  document.getElementById(
    "result"
  ).innerHTML = `You are ${yearsText} ${monthsText} and ${daysText} old`
})
