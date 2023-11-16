const request = require('supertest');
const app = require('../../app');
const booksService = require('../../services/db/books')

// Globals mocks
const mockedBooks = [{id: 1, title: "test"}, {id: 2, title: "toto"}, {id: 3, title: "test2"}, {id: 4, title: "test2"}]
jest.mock('../../services/db/books');
booksService.getBooks.mockReturnValueOnce(mockedBooks)
booksService.addBook.mockReturnValueOnce(true)

describe('get books endpoint', () => {

    it('should return collection of books', async () => {
        // When
        const resp = await request(app).get('/books');

        // Then
        expect(resp.statusCode).toEqual(200);
        expect(resp.body).not.toBeNull();
        expect(resp.body).toHaveProperty('data');
        expect(resp.body).toHaveProperty('success');
        expect(resp.body.success).toBeTruthy();
        expect(resp.body.data).toHaveLength(4);
    });

    it('should fail when book not found', async () => {
        // When
        const resp = await request(app).get('/books/10');
        
        // Then
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
        // When
        const resp = await request(app).post('/books').set('Authorization', 'Bearer TOKEN').send({
            title: 'test',
            date: '2022-10-10'
        });

        // Then
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).not.toBeNull();
        expect(resp.body).toHaveProperty('success');
        expect(resp.body.success).toBeTruthy();
    });

    it('should fail when property to add book is missing', async () => {
        // When
        const resp = await request(app).post('/books').set('Authorization', 'Bearer TOKEN').send({
            title: 'test'
        });

        // Then
        expect(resp.statusCode).toEqual(400);
        expect(resp.body).not.toBeNull();
        expect(resp.body).toHaveProperty('success');
        expect(resp.body).toHaveProperty('message');
        expect(resp.body.success).toBeFalsy();
    });
});