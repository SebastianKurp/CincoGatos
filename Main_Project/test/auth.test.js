import { login} from '/js/userfunctions'

describe('Authenticated firebase', () => {
  let login
  const email = 'auth@testing.com' //Email of the AuthTestUser
  const pw ='Thisisabadpassword1!'//Pw for AuthUser

  before(() => {
    authedFirebase = login(email, pw)
  })

  it('allow authenticated user to fetch', (done) => {
    authedFirebase
      .then((firebase) => {
        const database = firebase.database()
        database.ref(`user`).once('value')
          .then((sn) => {
            should.strictEqual(sn.val(), 'AuthTestUser')
            done()
          })
          .catch((error) => {
            done(error)
          })
      })
  })
})
// var assert = require('assert');
// var authlogin = require('../index');
// describe('authlogin', function() {
//     describe('log in user', function() {
//         it('logs in', function () {
//             var result = authlogin.login( auth@testing.com , Thisisabadpassword1! );
//             assert.equal(result, 2);
//         });
//     });
// });