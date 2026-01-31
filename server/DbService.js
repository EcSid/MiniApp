// services/databaseService.js
const sequelize = require('./db.js')

class DbService {
	async getAllFavouriteFilms(userId) {
		try {
			const results = await sequelize.query(
				'SELECT work_name FROM users_favourite_films WHERE user_id = ?',
				{
					replacements: [userId],
					type: sequelize.QueryTypes.SELECT,
				}
			)
			return results.map(row => row.work_name)
		} catch (error) {
			console.error('Error getting favourite films:', error)
			throw error
		}
	}
	async getAllFavouriteSongs(userId) {
		try {
			const results = await sequelize.query(
				'SELECT author, work_name FROM users_favourite_songs WHERE user_id = ?',
				{
					replacements: [userId],
					type: sequelize.QueryTypes.SELECT,
				}
			)
			return results.map(row => [row.author, row.work_name])
		} catch (error) {
			console.error('Error getting favourite songs:', error)
			throw error
		}
	}

	async getAllFavouriteBooks(userId) {
		try {
			const results = await sequelize.query(
				'SELECT work_name FROM users_favourite_books WHERE user_id = ?',
				{
					replacements: [userId],
					type: sequelize.QueryTypes.SELECT,
				}
			)
			return results.map(row => row.work_name)
		} catch (error) {
			console.error('Error getting favourite books:', error)
			throw error
		}
	}

	async getUsernameById(userId) {
		try {
			const results = await sequelize.query(
				'SELECT * FROM users WHERE tg_id = ?',
				{
					replacements: [userId],
					type: sequelize.QueryTypes.SELECT,
				}
			)
			return results.map(row => row.username)
		} catch (error) {
			console.error('Error getting favourite books:', error)
			throw error
		}
	}

	async getUsersWithSameTaste(userId) {
		const favFilms = await this.getAllFavouriteFilms(userId)
		const favSongs = await this.getAllFavouriteSongs(userId)
		const favBooks = await this.getAllFavouriteBooks(userId)

		const userMap = new Map()

		//Films
		let resultsFilms = await sequelize.query(
			'SELECT user_id, work_name FROM users_favourite_films WHERE user_id != ?',
			{
				replacements: [userId],
				type: sequelize.QueryTypes.SELECT,
			}
		)

		for (const result of resultsFilms) {
			if (favFilms.includes(result.work_name)) {
				if (!userMap.has(result.user_id)) {
					userMap.set(result.user_id, 0)
				}
				userMap.set(result.user_id, userMap.get(result.user_id) + 1)
			}
		}

		//Songs
		let resultsSongs = await sequelize.query(
			'SELECT user_id, author, work_name FROM users_favourite_songs WHERE user_id != ?',
			{
				replacements: [userId],
				type: sequelize.QueryTypes.SELECT,
			}
		)

		for (const result of resultsSongs) {
			const isFavoriteSong = favSongs.some(
				song => song[0] === result.author && song[1] === result.work_name
			)

			if (isFavoriteSong) {
				if (!userMap.has(result.user_id)) {
					userMap.set(result.user_id, 0)
				}
				userMap.set(result.user_id, userMap.get(result.user_id) + 1)
			}
		}

		//Books
		let resultsBooks = await sequelize.query(
			'SELECT user_id, work_name FROM users_favourite_books WHERE user_id != ?',
			{
				replacements: [userId],
				type: sequelize.QueryTypes.SELECT,
			}
		)

		for (const result of resultsBooks) {
			if (favBooks.includes(result.work_name)) {
				if (!userMap.has(result.user_id)) {
					userMap.set(result.user_id, 0)
				}
				userMap.set(result.user_id, userMap.get(result.user_id) + 1)
			}
		}

		return await Promise.all(
			Array.from(userMap.entries())
				.sort((a, b) => b[1] - a[1])
				.map(async el => {
					const username = (await this.getUsernameById(el[0]))[0]
					return { id: Number(el[0]), username: username }
				})
		)
	}

	async checkRegistration(userId) {
		try {
			const results = await sequelize.query(
				'SELECT * FROM users WHERE tg_id = ?',
				{
					replacements: [userId],
					type: sequelize.QueryTypes.SELECT,
				}
			)
			return Boolean(results[0].registered)
		} catch (e) {
			return false
		}
	}

	async checkAgreement(userId) {
		try {
			const results = await sequelize.query(
				'SELECT * FROM users WHERE tg_id = ?',
				{
					replacements: [userId],
					type: sequelize.QueryTypes.SELECT,
				}
			)
			return Boolean(results[0].agreed)
		} catch (e) {
			return false
		}
	}

	async setAgreement(userId) {
		try {
			await sequelize.query('UPDATE users SET agreed = 1 WHERE tg_id = ?', {
				replacements: [userId],
				type: sequelize.QueryTypes.UPDATE,
			})
			return
		} catch (e) {
			console.error('Error updating agreement:', e)
		}
	}
}

module.exports = new DbService()
