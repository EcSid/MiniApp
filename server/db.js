const Sequalize = require('sequelize').Sequelize

const sequalize = new Sequalize({
	dialect: 'sqlite',
	storage: './tg.db',
	define: {
		freezeTableName: true,
	},
})

module.exports = sequalize
