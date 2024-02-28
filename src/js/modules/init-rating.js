const stars = document.querySelectorAll('[data-stars');
const ratings = document.querySelectorAll('.rating');

const changeRating = (element, value) => {
	if (value <= 1) {
		element.style.setProperty('--width', `${value * 18}px`);
	}
	if (value > 1 && value <= 2) {
		element.style.setProperty('--width', `${value * 18 + 3}px`);
	}
	if (value > 2 && value <= 3) {
		element.style.setProperty('--width', `${value * 18 + 6}px`);
	}
	if (value > 3 && value <= 4) {
		element.style.setProperty('--width', `${value * 18 + 9}px`);
	}
	if (value > 4 && value <= 5) {
		element.style.setProperty('--width', `${value * 18 + 12}px`);
	}
};

const createStars = () => {
	stars.forEach((star) => {
		const value = star.dataset.stars;
		changeRating(star, value);
	});
};

ratings.forEach((rating) => {
	const wrapper = rating.querySelector('.rating__wrapper');
	const input = rating.querySelector('input:checked');
	changeRating(wrapper, input.value);
});

const onRatingChange = (e) => {
	if (e.target.name === 'rating') {
		const rating = e.target.parentElement.parentElement;
		changeRating(rating, e.target.value);
	}
};

const createRating = () => {
	document.addEventListener('change', onRatingChange);
};

export const initRating = () => {
	createStars();
	createRating();
};
