const request = require('supertest')
const app = require('../../app')
const usersService = require('../../services/users')

// Globals mocks
const mockedUsers = [
    {id: 1, firstName: "Jean", lastName: "Dupont"},
    {id: 2, firstName: "Michel", lastName: "Blanc"},
    {id: 3, firstName: "Pierre", lastName: "Marie"},
]
jest.mock('../../services/users')
usersService.addUser.mockReturnValueOnce(true)

describe('get users endpoint', () => {

    it('should return collection of users', async () => {
        // Mock
        usersService.getUsers.mockReturnValueOnce(mockedUsers)

        // When
        const resp = await request(app).get('/users')

        // Then
        expect(resp.statusCode).toEqual(200)
        expect(resp.body).not.toBeNull()
        expect(resp.body).toHaveProperty('data')
        expect(resp.body).toHaveProperty('success')
        expect(resp.body.success).toBeTruthy()
        expect(resp.body.data).toHaveLength(3)
    })

    it('should works when user is found', async () => {
        // Mock
        usersService.getUserById.mockReturnValueOnce(mockedUsers[0])

        // When
        const resp = await request(app).get('/users/10')
        
        // Then
        expect(resp.statusCode).toEqual(200)
        expect(resp.body).not.toBeNull()
        expect(resp.body).toHaveProperty('data')
        expect(resp.body).toHaveProperty('success')
        expect(resp.body.success).toBeTruthy()
    })

    it('should fail when users not found', async () => {
        // Mock
        usersService.getUserById.mockReturnValueOnce(null)

        // When
        const resp = await request(app).get('/users/10')
        
        // Then
        expect(resp.statusCode).toEqual(404)
        expect(resp.body).not.toBeNull()
        expect(resp.body).not.toHaveProperty('data')
        expect(resp.body).toHaveProperty('success')
        expect(resp.body).toHaveProperty('message')
        expect(resp.body.success).toBeFalsy()
    })
})