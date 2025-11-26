import { jest } from '@jest/globals'
import request from 'supertest'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import app from '../src/server.js'
import { User } from '../src/models/User.js'
import bcrypt from 'bcryptjs'

let mongo
let tokenA
let tokenB

jest.setTimeout(60000)
beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()
  process.env.JWT_SECRET = 'testsecret'
  await mongoose.connect(uri)
  const pass = await bcrypt.hash('secret123', 10)
  await User.create({ name: 'UserA', email: 'a@example.com', password: pass })
  await User.create({ name: 'UserB', email: 'b@example.com', password: pass })
  const resA = await request(app).post('/api/auth/login').send({ email: 'a@example.com', password: 'secret123' })
  const resB = await request(app).post('/api/auth/login').send({ email: 'b@example.com', password: 'secret123' })
  tokenA = resA.body.token
  tokenB = resB.body.token
})

afterAll(async () => {
  await mongoose.connection.close()
  await mongo.stop()
})

test('user can create and list own reviews only', async () => {
  const created = await request(app)
    .post('/api/reviews')
    .set('Authorization', `Bearer ${tokenA}`)
    .send({ restaurantName: 'Place', rating: 4, visitDate: new Date().toISOString(), comments: 'Nice' })
  expect(created.status).toBe(201)
  const listA = await request(app).get('/api/reviews').set('Authorization', `Bearer ${tokenA}`)
  expect(listA.status).toBe(200)
  expect(listA.body.data).toHaveLength(1)
  const listB = await request(app).get('/api/reviews').set('Authorization', `Bearer ${tokenB}`)
  expect(listB.status).toBe(200)
  expect(listB.body.data).toHaveLength(0)
})

test('user cannot access another user review', async () => {
  const created = await request(app)
    .post('/api/reviews')
    .set('Authorization', `Bearer ${tokenA}`)
    .send({ restaurantName: 'XX', rating: 5, visitDate: new Date().toISOString(), comments: '' })
  const id = created.body.data._id
  const getByB = await request(app).get(`/api/reviews/${id}`).set('Authorization', `Bearer ${tokenB}`)
  expect(getByB.status).toBe(403)
  const putByB = await request(app)
    .put(`/api/reviews/${id}`)
    .set('Authorization', `Bearer ${tokenB}`)
    .send({ comments: 'hack' })
  expect(putByB.status).toBe(403)
  const delByB = await request(app).delete(`/api/reviews/${id}`).set('Authorization', `Bearer ${tokenB}`)
  expect(delByB.status).toBe(403)
})

test('protected routes require Bearer token', async () => {
  const res = await request(app).get('/api/reviews')
  expect(res.status).toBe(401)
})
jest.setTimeout(60000)