const cleanButtons = () => {
	const buttons = document.querySelectorAll(".race-type-box")
	buttons.forEach((e) => {
		e.classList.remove("race-type-box-active")
	})
}

const setValue = (e) => {
	document.querySelector("#race_typo").value = e.target.dataset.value
	cleanButtons()
	e.target.classList.add("race-type-box-active")
}


const formRace = () => {
	const buttons = document.querySelectorAll(".race-type-box")
	if (buttons != null) {
		buttons.forEach((e) => {
			e.addEventListener("click", setValue)
		})
	}

}

export {formRace}
