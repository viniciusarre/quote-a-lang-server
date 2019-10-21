const mongoose = require('mongoose');
const axios = require('axios').default;
const request = require('supertest');

const app = require('../../src/app');
const Quotes = require('../../src/models/Quotes');

jest.mock('axios');

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
          author: 'Lao Tzu',
          data: [
            {
              sources: [
                'https://www.brainyquote.com/quotes/lao_tzu_398196',
              ],
              quotes: [
                {
                  author: 'Lao Tzu',
                  language: 'en',
                  quote: 'Do the difficult things while they are easy and do the great things while they are small. A journey of a thousand miles must begin with a single step.',
                },
              ],
            },
          ],
        },
        {
          _id: 2,
          author: 'Pablo Picasso',
          data: [
            {
              sources: [
                'http://spanish-learning-corner.com/pablo-picasso-quotes.html',
              ],
              quotes: [
                {
                  author: 'Pablo Picasso',
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
            author: 'Lao Tzu',
            language: 'en',
            quote: 'Do the difficult things while they are easy and do the great things while they are small. A journey of a thousand miles must begin with a single step.',
          },
          source: 'https://www.brainyquote.com/quotes/lao_tzu_398196',
        },
        {
          author: 'Pablo Picasso',
          language: 'fr',
          quote: {
            author: 'Pablo Picasso',
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
        author: author,
      });

      await request(app)
        .post('/quotes/fetchOne')
        .send({ author })
        .expect(200, [savedQuote.toJSON()]);
    });
  });

  describe('/fetchNew', () => {
    test('POST sends author to crawler', async () => {
      const author = 'John Doe';

      // Don't make actual request, fake successful response
      axios.get.mockResolvedValue({
        data: {
          success: true,
        },
      });

      await request(app)
        .post('/quotes/fetchNew')
        .send({ author })
        .expect(200);

      expect(axios.get.mock.calls).toHaveLength(1);
      expect(axios.get.mock.calls[0][0].endsWith(author)).toBe(true);
    });
  });
});
