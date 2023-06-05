import axios from 'axios';
import Cheerio from 'cheerio';

const url = `https://books.toscrape.com/catalogue/category/books/health_47/index.html`;
const book_data = [];

const getGenre = async (search = '') => {
    try {
        const response = await axios.get(url + search);
        const $ = Cheerio.load(response.data);
        const books = $('article');
        books.each(function() {
            const title = $(this).find('h3 a').text();
            const price = $(this).find('.price_color').text();
            book_data.push({title, price});
        })
        console.table(book_data);
    } catch (error) {
        console.log(error);
    }
}


const search = process.argv[2];

getGenre(search);