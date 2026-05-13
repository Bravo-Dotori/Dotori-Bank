// test.js

// db 연결 테스트
const pool = require('./db');

async function testConnection() {
  try {
    const connection = await pool.getConnection();

    console.log('DB 연결 성공');

    const [rows] = await connection.query('SELECT NOW() AS now');

    console.log(rows);

    connection.release();
  } catch (error) {
    console.error('DB 연결 실패');
    console.error(error);
  }
}

testConnection();

// 회원가입 (model 테스트)
// const userModel = require('./models/userModel.js');

// async function test() {
//   try {
//     const result = await userModel.signup(
//       'test2@test.com',
//       'testuser2',
//       '1234',
//       'user',
//       '2000-01-01'
//     );

//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }

// test();

// 회원가입 프론트 테스트
async function signup() {

  try {

    const response = await fetch(
      'http://localhost:3000/api/user/signup',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          email: 'test4@test.com',
          user_id: 'testuser',
          role: 'user',
          birth_date: '2000-01-01'
        })
      }
    );

    const data = await response.json();

    console.log('상태코드:', response.status);

    console.log('응답:', data);

  } catch (error) {

    console.error(error);

  }
}

signup();