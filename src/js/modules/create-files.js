import { createUniqueNumber } from './util.js';

const upload = document.querySelector('.upload');
const uploadList = upload.querySelector('.upload__list');
const feedbackUpload = document.querySelector('#feedback-upload');

const fileNumber = createUniqueNumber(0, 100000);

let feedbackArray = [];
let finalArray = [];

const filterArray = () => {
	feedbackArray = Array.from(feedbackUpload.files).filter((file) => {
		if (
			file.type === 'image/jpeg' && file.size <= '10485760' ||
			file.type === 'image/png' && file.size <= '10485760'
		) {
			return file;
		}
	});
};

const itemContent = `
	<button class="upload__close" type="button">
		<svg width="12" height="12" aria-hidden="true">
			<use xlink:href="img/sprite.svg#upload-close"></use>
		</svg>
	</button>
`;

const createItems = () => {
	feedbackArray.forEach((file) => {
		if (!upload.classList.contains('upload--files')) {
			upload.classList.add('upload--files');
		}

		const dataItem = fileNumber();
		finalArray.push({[dataItem]: file});

		const item = document.createElement('li');
		item.classList.add('upload__item');
		item.innerHTML = `${itemContent}`;
		item.setAttribute('data-item', `${dataItem}`);

		const reader = new FileReader();
		reader.onload = function(e) {
			const image = document.createElement('img');
			image.src = e.target.result;
			image.setAttribute('alt', '');
			image.setAttribute('data-fancybox', '');
			item.appendChild(image);
		};

		reader.readAsDataURL(file);
		uploadList.append(item);
	});
};

const onItemRemoveClick = (e) => {
	if (e.target.classList.contains('upload__close')) {
		const item = e.target.parentElement;

		finalArray = finalArray.filter((file) => {
			if (Object.keys(file)[0] !== item.dataset.item) {
				return file;
			}
		});

		item.remove();

		if (uploadList.childElementCount === 1) {
			upload.classList.remove('upload--files');
		}
	}
};

upload.addEventListener('click', onItemRemoveClick);

const onFeedbackChange = () => {
	filterArray();
	createItems();
};

feedbackUpload.addEventListener('change', onFeedbackChange);

export const createFiles = (data) => {
	Array.from(finalArray).forEach((file) => {
		data.append('files', Object.values(file)[0]);
	});
};
