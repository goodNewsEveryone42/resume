const form = document.forms['formSkills'];
const allCheckboxes = [...form.elements];
const variableArrayCheckedCheckbox = [];
let previosVariableArrayCheckedCheckbox = [];

//function handler for the checkboxes
function changeHandler(e) {
	if (e.target.checked) {
		previosVariableArrayCheckedCheckbox = [...variableArrayCheckedCheckbox];
		variableArrayCheckedCheckbox.push(variableArrayCheckedCheckbox.length);
		calcRotation();
	}
	else {
		previosVariableArrayCheckedCheckbox = [...variableArrayCheckedCheckbox];
		variableArrayCheckedCheckbox.shift();
		calcRotation();
	}
}

//function that creates an array of marked checkboxes
function createArrayCheckedCheckbox() {
	const checkedCheckboxes = form.querySelectorAll('input:checked');
	return [...checkedCheckboxes].reduce((acc, item) => {
		item = 1;
		acc + item;
		return variableArrayCheckedCheckbox.push(acc);
	}, 0);
}

//function that calculates the angle of rotation of the indicator arrow
function calcRotation() {
	const arrow = document.querySelector('.indicator__arrow');
	let angleOfRotation = -35 + ((185 / allCheckboxes.length) * variableArrayCheckedCheckbox.length);
	arrow.style.transform = `rotate(${angleOfRotation}deg)`;
	changeCounterValue();
}

//function changes the counter
function changeCounterValue() {
	const counter = document.querySelector('.counter__value');
	let initialValue = (3000 / allCheckboxes.length) * variableArrayCheckedCheckbox.length;
	let previousInitialValue = (3000 / allCheckboxes.length) * previosVariableArrayCheckedCheckbox.length;
	counter.value = previousInitialValue;

	if (initialValue > previousInitialValue) {
		for (let i = previousInitialValue; i <= initialValue; i++) {
			setTimeout(() => {
				counter.value = i;
			}, 0.2 * i)
		}
	} else if (previousInitialValue > initialValue) {
		for (let i = previousInitialValue; i >= initialValue; i--) {
			setTimeout(() => {
				counter.value = previousInitialValue--;
			}, 0.2 * i);
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	allCheckboxes.forEach((element) => {
		element.addEventListener('change', changeHandler);
	});

	createArrayCheckedCheckbox();
	calcRotation();
	changeCounterValue();
})
