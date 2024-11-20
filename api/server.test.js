const db = require('../data/dbConfig');
const server = require('./server');
const request = require('supertest');
const bcrypt = require('bcryptjs');
const {ROUNDS} = require('./secrets/index')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('users').truncate()
})

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

describe('[POST] /register', () => {
  const user = {username: 'FooBarBaz', password: '1234'}
  test('adds user to the database', async () => {
    await request(server).post('/api/auth/register').send(user)
    const users = await db('users')
    expect(users).toHaveLength(1)
    expect(users[0]).toMatchObject({username: 'FooBarBaz'})
  })
  test('upon successful registration, status code is 201', async () => {
    const res = await request(server).post('/api/auth/register').send(user)
    expect(res.status).toBe(201)
  })
})

describe('[POST] /login', () => {
  test('proper response message and status code for missing username',
     async () => {
      const res = await request(server)
      .post('/api/auth/login')
      .send({password: 'hello123'})
      expect(res.status).toBe(400)
      expect(res.body.message).toBe('username and password required')
  })
  test('proper response message and status code for missing password',
     async () => {
      const res = await request(server)
      .post('/api/auth/login')
      .send({username: 'ExampleUser'})
      expect(res.status).toBe(400)
      expect(res.body.message).toBe('username and password required')
  })
  test('successful login provides a token', async () => {
    const user = {username: 'Hercule Poirot', password: 'mustache246'}
    const hash = bcrypt.hashSync(user.password, ROUNDS)
    await db('users').insert({username: user.username, password: hash})
    const res = await request(server)
    .post('/api/auth/login')
    .send({username: user.username, password: user.password})
    expect(res.body).toHaveProperty('token')
  })
})