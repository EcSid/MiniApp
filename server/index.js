const express = require('express')
const router = require('./router')
const cors = require('cors')
const dotenv = require('dotenv')
const sequalize = require('./db.js')

const PORT = process.env.PORT || 5000

dotenv.config()
const app = express()

app.use(cors({ origin: process.env.CLIENT_URL }))
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
