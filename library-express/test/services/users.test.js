const usersService = require('../../services/db/users')
const db = require('../../models')
const bcrypt = require('bcrypt')
require('dotenv').config() // load .env

jest.mock('../../models')

const mockedUsers = [{
    id: 1, username: 'dummy', password: 'test'
}]

describe('get user by username', () => {
    it('should find user and return it', async () => {
        // Mock
        db.users.findOne.mockReturnValueOnce(mockedUsers[0])
    
        // When
        const user = await usersService.getUserByUsername('toto')
    
        // Then
        expect(user).not.toBeNull()
        expect(user).toEqual(mockedUsers[0])
    })
    
    it('should not find user and return undefined', async () => {
        // When
        const user = await usersService.getUserByUsername('toto')
    
        // Then
        expect(user).toBeUndefined()
    })
})

describe('register user', () => {
    it('should returns error if user already registered', async () => {
        // Mock
        db.users.findOne.mockReturnValueOnce(mockedUsers[0])
    
        // When/Then
        await expect(() => usersService.addUser('test', 'test')).rejects.toThrow()
    })
    
    it('should returns user if registration works', async () => {
        // Given
        const username = 'test'
        const password = 'test'
    
        // Mock
        db.users.create.mockReturnValueOnce({
            username,
            password: 'hashed'
        })
    
        // When
        const userAdded = await usersService.addUser(username, password)
    
        // Then
        expect(userAdded).not.toBeNull()
        expect(userAdded.username).toEqual(username)
        // Assert password has been updated by service
        expect(userAdded.password).not.toEqual(password)
    })
})

describe('login user', () => {
    it('should returns error if user not found', async () => {
        // Mock
        db.users.findOne.mockReturnValueOnce(null)
    
        // When/Then
        await expect(() => usersService.login('test', 'test')).rejects.toThrow()
    })
    
    it('should returns error if password is incorrect', async () => {
        // Given
        const username = 'test'
        const password = 'test'
    
        // Mock
        db.users.findOne.mockReturnValueOnce({
            username,
            password: bcrypt.hashSync('otherPassword', parseInt(process.env.SALT_ROUNDS))
        })
    
        // When/Then
        await expect(() => usersService.login(username, password)).rejects.toThrow()
    })

    it('should returns valid JWT if credentials are valid', async () => {
        // Given
        const username = 'test'
        const password = 'test'
    
        // Mock
        db.users.findOne.mockReturnValueOnce({
            username,
            password: bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS))
        })
    
        // When
        const token = await usersService.login(username, password)

        // Then
        expect(token).not.toBeNull()
    })
})