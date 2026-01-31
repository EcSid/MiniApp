const sequalize = require('../db.js')
const { DataTypes } = require('sequelize')

const User = sequelize.define(
	'user',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		tg_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
		},
		username: {
			type: DataTypes.STRING(64),
			allowNull: false,
		},
		registered: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		tableName: 'users',
	}
)

//-----------

const UserFavouriteFilm = sequalize.define(
	'user_favourite_film',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		work_name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
	},
	{ tableName: 'users_favourite_films' }
)

User.hasMany(UserFavouriteFilm, {
	foreignKey: 'user_id',
	sourceKey: 'tg_id',
})

UserFavouriteFilm.belongsTo(User, {
	foreignKey: 'user_id',
	targetKey: 'tg_id',
})

//-----------

const UserFavouriteSong = sequalize.define(
	'user_favourite_song',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		author: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		work_name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
	},
	{ tableName: 'users_favourite_songs' }
)

User.hasMany(UserFavouriteSong, {
	foreignKey: 'user_id',
	sourceKey: 'tg_id',
})

UserFavouriteSong.belongsTo(User, {
	foreignKey: 'user_id',
	targetKey: 'tg_id',
})

//-----------

const UserFavouriteBook = sequalize.define(
	'user_favourite_book',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		work_name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
	},
	{ tableName: 'users_favourite_books' }
)

User.hasMany(UserFavouriteBook, {
	foreignKey: 'user_id',
	sourceKey: 'tg_id',
})

UserFavouriteBook.belongsTo(User, {
	foreignKey: 'user_id',
	targetKey: 'tg_id',
})

//-----------

const UserRecommendedFilm = sequalize.define(
	'user_recommended_film',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		work_name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
	},
	{ tableName: 'users_recommended_films' }
)

User.hasMany(UserRecommendedFilm, {
	foreignKey: 'user_id',
	sourceKey: 'tg_id',
})

UserRecommendedFilm.belongsTo(User, {
	foreignKey: 'user_id',
	targetKey: 'tg_id',
})

//-----------

const UserRecommendedSong = sequalize.define(
	'user_recommended_song',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		author: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
		work_name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
	},
	{ tableName: 'users_recommended_songs' }
)

User.hasMany(UserRecommendedSong, {
	foreignKey: 'user_id',
	sourceKey: 'tg_id',
})

UserRecommendedSong.belongsTo(User, {
	foreignKey: 'user_id',
	targetKey: 'tg_id',
})

//-----------

const UserRecommendedBook = sequalize.define(
	'user_recommended_book',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		work_name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
	},
	{ tableName: 'users_recommended_books' }
)

User.hasMany(UserRecommendedBook, {
	foreignKey: 'user_id',
	sourceKey: 'tg_id',
})

UserRecommendedBook.belongsTo(User, {
	foreignKey: 'user_id',
	targetKey: 'tg_id',
})

//-----------

const UserFilmLike = sequalize.define(
	'user_film_like',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		work_name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
	},
	{ tableName: 'users_film_likes' }
)

User.hasMany(UserFilmLike, {
	foreignKey: 'user_id',
	sourceKey: 'tg_id',
})

UserFilmLike.belongsTo(User, {
	foreignKey: 'user_id',
	targetKey: 'tg_id',
})

//-----------

const UserFilmDislike = sequalize.define(
	'user_film_dislike',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		work_name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
	},
	{ tableName: 'users_film_dislikes' }
)

User.hasMany(UserFilmDislike, {
	foreignKey: 'user_id',
	sourceKey: 'tg_id',
})

UserFilmDislike.belongsTo(User, {
	foreignKey: 'user_id',
	targetKey: 'tg_id',
})

//-----------

const UserSongLike = sequalize.define(
	'user_song_like',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		work_name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
	},
	{ tableName: 'users_song_likes' }
)

User.hasMany(UserSongLike, {
	foreignKey: 'user_id',
	sourceKey: 'tg_id',
})

UserSongLike.belongsTo(User, {
	foreignKey: 'user_id',
	targetKey: 'tg_id',
})

//-----------

const UserSongDislike = sequalize.define(
	'user_song_dislike',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		work_name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
	},
	{ tableName: 'users_song_dislikes' }
)

User.hasMany(UserSongDislike, {
	foreignKey: 'user_id',
	sourceKey: 'tg_id',
})

UserSongDislike.belongsTo(User, {
	foreignKey: 'user_id',
	targetKey: 'tg_id',
})

//-----------

const UserBookLike = sequalize.define(
	'user_book_like',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		work_name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
	},
	{ tableName: 'users_book_likes' }
)

User.hasMany(UserBookLike, {
	foreignKey: 'user_id',
	sourceKey: 'tg_id',
})

UserBookLike.belongsTo(User, {
	foreignKey: 'user_id',
	targetKey: 'tg_id',
})

//-----------

const UserBookDislike = sequalize.define(
	'user_book_dislike',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		work_name: {
			type: DataTypes.STRING(128),
			allowNull: false,
		},
	},
	{ tableName: 'users_book_dislikes' }
)

User.hasMany(UserBookDislike, {
	foreignKey: 'user_id',
	sourceKey: 'tg_id',
})

UserBookDislike.belongsTo(User, {
	foreignKey: 'user_id',
	targetKey: 'tg_id',
})

//-----------
