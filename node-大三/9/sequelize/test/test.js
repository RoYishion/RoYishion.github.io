const test = require('ava');
const superKoa = require('superkoa');
const app = require('../app');

test('index', async t => {
  let res = await superKoa(app).get('/');
  t.is(200, res.status);
})

test.serial('login', async t => {
  let testCategory = {
    phone: '133',
    password: '123456'
  };
  let res = await superKoa(app)
    .post('/checkLogin')
    .send(testCategory);
  // 重定向到home，返回302
  t.is(302, res.status);
})