const request = require('supertest');
const app = require('../../app');
const booksService = require('../../services/books')
//const books = require('../../models').books

// Globals mocks
const mockedBooks = [{id: 1, title: "test"}, {id: 2, title: "toto"}, {id: 3, title: "test2"}, {id: 4, title: "test2"}]
jest.mock('../../services/books');
booksService.getBooks.mockReturnValueOnce(mockedBooks)
booksService.addBook.mockReturnValueOnce(true)

describe('get books endpoint', () => {

    it('should return collection of books', async () => {
        const resp = await request(app).get('/books');
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).not.toBeNull();
        expect(resp.body).toHaveProperty('data');
        expect(resp.body).toHaveProperty('success');
        expect(resp.body.success).toBeTruthy();
        expect(resp.body.data).toHaveLength(4);
    });

    it('should fail when book not found', async () => {
        const resp = await request(app).get('/books/10');
        expect(resp.statusCode).toEqual(404);
        expect(resp.body).not.toBeNull();
        expect(resp.body).not.toHaveProperty('data');
        expect(resp.body).toHaveProperty('success');
        expect(resp.body).toHaveProperty('message');
        expect(resp.body.success).toBeFalsy();
    });
});

describe('post books endpoint', () => {
    it('should add book successfully', async () => {
        const resp = await request(app).post('/books').set('Authorization', 'Bearer TOKEN').send({
            title: 'test',
            date: '2022-10-10'
        });
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).not.toBeNull();
        expect(resp.body).toHaveProperty('success');
        expect(resp.body.success).toBeTruthy();
    });

    it('should fail when property to add book is missing', async () => {
        const resp = await request(app).post('/books').set('Authorization', 'Bearer TOKEN').send({
            title: 'test'
        });
        expect(resp.statusCode).toEqual(400);
        expect(resp.body).not.toBeNull();
        expect(resp.body).toHaveProperty('success');
        expect(resp.body).toHaveProperty('message');
        expect(resp.body.success).toBeFalsy();
    });
});