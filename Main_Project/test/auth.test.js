import should from 'should'
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