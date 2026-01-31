const DbService = require('./DbService')

class UserContoller {
	async getUsersWithSameTaste(req, res) {
		try {
			const { userId } = req.params
			if (!userId) {
				return res.status(400).json({ message: 'Не указан user id' })
			}
			const users = await DbService.getUsersWithSameTaste(userId)
			res.json(users)
		} catch (e) {
			res.status(500).json({ message: e })
		}
	}

	async checkRegistration(req, res) {
		try {
			const { userId } = req.params
			if (!userId) {
				return res.status(400).json({ message: 'Не указан user id' })
			}
			const isRegistered = await DbService.checkRegistration(userId)
			res.json(Boolean(isRegistered))
		} catch (e) {
			res.status(500).json({ message: e })
		}
	}

	async checkAgreement(req, res) {
		try {
			const { userId } = req.params
			if (!userId) {
				return res.status(400).json({ message: 'Не указан user id' })
			}
			const isAgreed = await DbService.checkAgreement(userId)
			res.json(Boolean(isAgreed))
		} catch (e) {
			res.status(500).json({ message: e })
		}
	}

	async setAgreement(req, res) {
		try {
			const { userId } = req.params
			if (!userId) {
				return res.status(400).json({ message: 'Не указан user id' })
			}
			await DbService.setAgreement(userId)
			res.json({ message: 'Success' })
		} catch (e) {
			res.status(500).json({ message: e })
		}
	}
}

module.exports = new UserContoller()
