//setting up server for e2e testing
let server

before((done) => {
  const app = express()
  app.use('/', express.static(path.resolve(__dirname, '../../dist')))
  server = app.listen(8080, done)
})
after(() => {
  server.close()
})

const {prepareDriver, cleanupDriver} = require('../utils/browser-automation')


describe('browser app', function () {
  let driver
  before(async () => {
    driver = await prepareDriver()
  })
  after(() => cleanupDriver(driver))

  it('should work', async function () {
    await driver.get('http://localhost:8080')
  }) 
})

