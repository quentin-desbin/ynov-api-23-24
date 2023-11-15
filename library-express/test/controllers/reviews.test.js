const request = require('supertest');
const app = require('../../app');
const usersService = require('../../services/users')
const booksService = require('../../services/books')

describe('reviews endpoint', () => {
    it('should return list of reviews', async () => {
        // When
        const resp = await request(app).get('/reviews')

        // Then
        expect(resp.statusCode).toEqual(200)
        expect(resp.body).not.toBeNull()
        expect(resp.body).toHaveProperty('success')
        expect(resp.body).toHaveProperty('data')
        expect(resp.body.success).toBeTruthy()
        expect(resp.body.data).toHaveLength(3);
    })

    it('should add a new review', async () => {
        // Mock
        jest.spyOn(booksService, "getBookById").mockReturnValueOnce({})
        
        // When
        const resp = await request(app).post('/reviews').send({
            userId: 1,
            bookId: 2,
            note: 5
        })

        // Then
        expect(resp.statusCode).toEqual(201)
        expect(resp.body).not.toBeNull()
        expect(resp.body).toHaveProperty('success')
        expect(resp.body.success).toBeTruthy()
        expect(resp.body).toHaveProperty('message')
    })

    it('should fail with empty body', async () => {
        // When
        const resp = await request(app).post('/reviews').send({})

        // Then
        expect(resp.statusCode).toEqual(400)
        expect(resp.body).not.toBeNull()
        expect(resp.body).toHaveProperty('success')
        expect(resp.body.success).toBeFalsy()
        expect(resp.body).toHaveProperty('message')
    })

    it('should fail with non existing book', async () => {
        // Mock
        jest.spyOn(booksService, "getBookById").mockReturnValueOnce(null)

        // When
        const resp = await request(app).post('/reviews').send({
            userId: 1,
            bookId: -1,
            note: 5
        })

        // Then
        expect(resp.statusCode).toEqual(400)
        expect(resp.body).not.toBeNull()
        expect(resp.body).toHaveProperty('success')
        expect(resp.body.success).toBeFalsy()
        expect(resp.body).toHaveProperty('message')
    })

    it('should fail with non existing user', async () => {
        // Mock
        jest.spyOn(usersService, "getUserById").mockReturnValueOnce(null)

        // When
        const resp = await request(app).post('/reviews').send({
            userId: -1,
            bookId: 1,
            note: 5
        })

        // Then
        expect(resp.statusCode).toEqual(400)
        expect(resp.body).not.toBeNull()
        expect(resp.body).toHaveProperty('success')
        expect(resp.body.success).toBeFalsy()
        expect(resp.body).toHaveProperty('message')
    })

    it('should fail with note > 10', async () => {
        // When
        const resp = await request(app).post('/reviews').send({
            userId: 1,
            bookId: 1,
            note: 11
        })

        // Then
        expect(resp.statusCode).toEqual(400)
        expect(resp.body).not.toBeNull()
        expect(resp.body).toHaveProperty('success')
        expect(resp.body.success).toBeFalsy()
        expect(resp.body).toHaveProperty('message')
    })
})