const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../src/app');
const Quotes = require('../../src/models/Quotes');

describe('/quotes', () => {
  let db;

  beforeAll(async () => {
    db = await mongoose.connect('mongodb://localhost:27017/quote-a-lang-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(async () => {
    await Quotes.deleteMany({}).exec();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  describe('/getAll', () => {
    test('POST returns all quotes', async () => {
      const savedQuotes = await Quotes.create([
        {
          _id: 1,
          autor: 'Lao Tzu',
          dados: [
            {
              fontes: [
                'https://www.brainyquote.com/quotes/lao_tzu_398196',
              ],
              frases: [
                {
                  autor: 'Lao Tzu',
                  language: 'en',
                  quote: 'Do the difficult things while they are easy and do the great things while they are small. A journey of a thousand miles must begin with a single step.',
                },
              ],
            },
          ],
        },
        {
          _id: 2,
          autor: 'Pablo Picasso',
          dados: [
            {
              fontes: [
                'http://spanish-learning-corner.com/pablo-picasso-quotes.html',
              ],
              frases: [
                {
                  autor: 'Pablo Picasso',
                  language: 'es',
                  quote: 'Yo hago lo imposible, porque lo posible lo hace cualquiera.',
                },
              ],
            },
          ],
        },
      ]);
      const expectedQuotes = [
        {
          author: 'Lao Tzu',
          language: 'fr',
          quote: {
            autor: 'Lao Tzu',
            language: 'en',
            quote: 'Do the difficult things while they are easy and do the great things while they are small. A journey of a thousand miles must begin with a single step.',
          },
          source: 'https://www.brainyquote.com/quotes/lao_tzu_398196',
        },
        {
          author: 'Pablo Picasso',
          language: 'fr',
          quote: {
            autor: 'Pablo Picasso',
            language: 'es',
            quote: 'Yo hago lo imposible, porque lo posible lo hace cualquiera.',
          },
          source: 'http://spanish-learning-corner.com/pablo-picasso-quotes.html',
        },
      ];

      await request(app)
        .post('/quotes/getAll')
        .send()
        .expect(200, expectedQuotes);
    });
  });

  describe('/fetchOne', () => {
    test('POST returns one quote for author', async () => {
      const author = 'John Doe';
      const savedQuote = await Quotes.create({
        _id: 1,
        autor: author,
      });

      await request(app)
        .post('/quotes/fetchOne')
        .send({ author })
        .expect(200, [savedQuote.toJSON()]);
    });
  });

  xdescribe('/fetchNew', () => {
    test('POST sends author to crawler', async () => {

    });
  });
});
