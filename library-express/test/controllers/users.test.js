const request = require('supertest')
const app = require('../../app')
const usersService = require('../../services/users')

const users = [{
    id: 1,
    firstname: "Test",
    lastname: "Example"
}, {
    id: 2,
    firstname: "Test2",
    lastname: "Example2"
}]

jest.mock('../../services/users')

describe('get users endpoint', () => {

    it('should returns valid 200 with valid collection', async () => {
        // Mock
        usersService.getUsers.mockReturnValueOnce(users)

        // When
        const resp = await request(app).get('/users')

        // Then
        expect(resp.statusCode).toEqual(200)
        expect(resp.body).not.toBeNull()
        expect(resp.body).toHaveProperty('data')
        expect(resp.body).toHaveProperty('success')
        expect(resp.body.success).toBeTruthy()
        expect(resp.body.data).toHaveLength(2)
    })

    it('should returns valid 200 with valid user', async () => {
        // Given
        const mockedUser = users[0]

        // Mock
        usersService.getUserById.mockReturnValueOnce(mockedUser)

        // When
        const resp = await request(app).get(`/users/${mockedUser.id}`)

        // Then
        expect(resp.statusCode).toEqual(200)
        expect(resp.body).not.toBeNull()
        expect(resp.body).toHaveProperty('success')
        expect(resp.body).toHaveProperty('data')
        expect(resp.body.success).toBeTruthy()

        expect(resp.body.data.id).toEqual(mockedUser.id)
        expect(resp.body.data.firstname).toEqual(mockedUser.firstname)
        expect(resp.body.data.lastname).toEqual(mockedUser.lastname)
    })

    it('should returns valid 404 when user not found', async () => {
        // Mock
        usersService.getUserById.mockReturnValueOnce(null)

        // When
        const resp = await request(app).get(`/users/10`)

        // Then
        expect(resp.statusCode).toEqual(404)
        expect(resp.body).not.toBeNull()
        expect(resp.body).toHaveProperty('success')
        expect(resp.body).toHaveProperty('message')
        expect(resp.body.success).toBeFalsy()
    })

})