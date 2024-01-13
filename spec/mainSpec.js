import jsdom from 'jsdom';
import fetch from 'node-fetch';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-nft-jasmine/';

const getData = async () => {
	return fetch(url)
		.then((res) => {
			return res.text();
		})
		.then((body) => {
			const { document } = new JSDOM(body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	it('should have a number type of card image width and height', () => {
		const cardImgEl = document.querySelector('.card__image img');
		const cardImgWidth = parseInt(cardImgEl.getAttribute('width'));
		const cardImgHeight = parseInt(cardImgEl.getAttribute('height'));

		expect(cardImgWidth).toBeInstanceOf(Number);
		expect(cardImgHeight).toBeInstanceOf(Number);
	});

	it("should have a title element that contains 'Equilibrium #3429' word", () => {
		const cardTitleEl = document.querySelector('.card__title');
		const cardTitle = cardTitleEl.textContent.trim();

		expect(cardTitle).toContain('Equilibrium #3429');
	});

	it('should have two children inside of the article element', () => {
		const articleEl = document.querySelector('article');
		const articleChildrenEls = articleEl.children;

		expect(articleChildrenEls).toHaveSize(2);
	});

	it('should have an empty alt attribute value of card image element', () => {
		const cardImgEl = document.querySelector('.card__image img');
		const cardImgAlt = cardImgEl.getAttribute('alt');

		expect(cardImgAlt).toBe('');
	});
});
