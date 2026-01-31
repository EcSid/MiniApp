const DbService = require('./DbService')

class ArtContoller {
	async getAllFavouriteFilms(req, res) {
		try {
			const { userId } = req.params
			if (!userId) {
				return res.status(400).json({ message: 'Не указан user id' })
			}
			const works = await DbService.getAllFavouriteFilms(userId)
			return res.json(works)
		} catch (e) {
			res.status(500).json({ message: e })
		}
	}

	async getAllFavouriteSongs(req, res) {
		try {
			const { userId } = req.params
			if (!userId) {
				return res.status(400).json({ message: 'Не указан user id' })
			}
			const works = await DbService.getAllFavouriteSongs(userId)
			return res.json(works)
		} catch (e) {
			res.status(500).json({ message: e })
		}
	}

	async getAllFavouriteBooks(req, res) {
		try {
			const { userId } = req.params
			if (!userId) {
				return res.status(400).json({ message: 'Не указан user id' })
			}
			const works = await DbService.getAllFavouriteBooks(userId)
			return res.json(works)
		} catch (e) {
			res.status(500).json({ message: e })
		}
	}
}

module.exports = new ArtContoller()
