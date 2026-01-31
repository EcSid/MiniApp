const express = require('express')
const router = require('./router')
const cors = require('cors')
const dotenv = require('dotenv')
const sequalize = require('./db.js')

const PORT = process.env.PORT || 5000
const CLIENT_URL = process.env.CLIENT_URL || 'http://103.74.94.187'
dotenv.config()
const app = express()

app.use(cors({ origin: CLIENT_URL }))
app.use(express.json())
app.use('/api', router)

async function startApp() {
	try {
		await sequalize.authenticate()
		await sequalize.sync()
		app.listen(PORT, () => console.log(`Server work on port=${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

startApp()
