import { validateForm } from './validate-form.js';
import { createFiles } from './create-files.js';

const feedback = document.querySelector('.feedback');
const forms = document.querySelectorAll('[data-form]');

const sendFeedback = () => {
	const form = feedback.querySelector('.feedback__form');
	const success = feedback.querySelector('.feedback__success');

	form.classList.add('hidden');
	success.classList.add('visible');
};

export const sendForm = () => {
	window.addEventListener('DOMContentLoaded', () => {
		forms.forEach((form) => {
			form.addEventListener('submit', async (e) => {
				e.preventDefault();

				const data = new FormData(form);
				data.delete('files');
				createFiles(data);

				const error = validateForm(form);
				if (error === 0) {
					if (form.classList.contains('feedback__form')) {
						sendFeedback();

						for (const [key, value] of data) {
							if (key === 'files') {
								// eslint-disable-next-line
								console.log(value);
							} else {
								// eslint-disable-next-line
								console.log(`${key} - ${value}`);
							}
						}
					}
					setTimeout(() => {
						form.reset();
					}, 300);
				}
			});
		});
	});
};
