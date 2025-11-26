import { jest } from '@jest/globals'
import request from 'supertest'
import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import app from '../src/server.js'
import { User } from '../src/models/User.js'
import bcrypt from 'bcryptjs'

let mongo

jest.setTimeout(60000)
beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()
  process.env.JWT_SECRET = 'testsecret'
  await mongoose.connect(uri)
})

afterAll(async () => {
  await mongoose.connection.close()
  await mongo.stop()
})

test('register and login returns token and userId', async () => {
  const reg = await request(app).post('/api/auth/register').send({ name: 'Al', email: 'a@example.com', password: 'secret123' })
  expect(reg.status).toBe(201)
  const res = await request(app).post('/api/auth/login').send({ email: 'a@example.com', password: 'secret123' })
  expect(res.status).toBe(200)
  expect(res.body.token).toBeDefined()
  expect(res.body.userId).toBeDefined()
})
jest.setTimeout(60000)