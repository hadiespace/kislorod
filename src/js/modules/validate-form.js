import { onNameDigits, onPhoneDigits } from './util.js';

const nameInputs = document.querySelectorAll('input[name="name"]');
const phoneInputs = document.querySelectorAll('input[name="phone"]');

if (nameInputs) {
	nameInputs.forEach((input) => {
		input.addEventListener('keydown', onNameDigits);
	});
}

if (phoneInputs) {
	phoneInputs.forEach((input) => {
		input.addEventListener('keydown', onPhoneDigits);
	});
}

const addError = (input) => {
	input.parentElement.classList.add('field--error');
};

const removeError = (input) => {
	input.parentElement.classList.remove('field--error');
	setTimeout(() => {
		if (input.parentElement.querySelector('.field__error')) {
			input.parentElement.querySelector('.field__error').textContent = '';
		}
	}, 300);
};

const emailText = (input) => !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
const phoneText = (input) => /^[A-Za-zА-Яа-яЁё]/g.test(input.value);

export const validateForm = (form) => {
	let error = 0;

	const requiredInputs = form.querySelectorAll('.required');
	const emails = form.querySelectorAll('.validate-email');

	emails.forEach((email) => {
		email.addEventListener('input', () => {
			removeError(email);
		});

		if (email.classList.contains('validate-email')) {
			if (email.value && emailText(email)) {
				addError(email);
				error++;
			}
		}
	});

	requiredInputs.forEach((input) => {
		input.addEventListener('input', () => {
			removeError(input);
		});

		if (input.classList.contains('validate-name')) {
			const errorText = input.parentElement.querySelector('.field__error');

			if (/[0-9]/.test(input.value)) {
				if (errorText) {
					errorText.textContent = 'Имя не должно содержать цифры';
				}
				addError(input);
				error++;
			} else if (input.value.trim() === '') {
				if (errorText) {
					errorText.textContent = 'Обязательное поле';
				}
				addError(input);
				error++;
			}
		} else if (input.classList.contains('validate-phone')) {
			const errorText = input.parentElement.querySelector('.field__error');

			if (/[_]/.test(input.value)) {
				if (errorText) {
					errorText.textContent = 'Некорректный формат';
				}
				addError(input);
				error++;
			} else if (phoneText(input)) {
				if (errorText) {
					errorText.textContent = 'Некорректный формат';
				}
				addError(input);
				error++;
			} else if (input.value.trim() === '') {
				if (errorText) {
					errorText.textContent = 'Обязательное поле';
				}
				addError(input);
				error++;
			}
		} else if (input.value.trim() === '') {
			const errorText = input.parentElement.querySelector('.field__error');

			if (errorText) {
				errorText.textContent = 'Обязательное поле';
			}
			addError(input);
			error++;
		}
	});

	return error;
};
