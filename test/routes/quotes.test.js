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
    await Quotes.deleteMany({});
  });

  afterEach(async () => {
    await db.disconnect();
  });

  xdescribe('/getAll', () => {
    test('POST returns all quotes', async () => {

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
