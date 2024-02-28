import autosize from 'autosize';

const textareas = document.querySelectorAll('.field__textarea');

export const resizeTextarea = () => {
	textareas.forEach((textarea) => {
		autosize(textarea);
	});
};
