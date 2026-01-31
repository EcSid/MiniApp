const ArtController = require('./ArtControler.js')
const UserContoller = require('./UserController.js')

const Router = require('express').Router
const router = Router()

router.get('/favouriteFilms/:userId', ArtController.getAllFavouriteFilms)
router.get('/favouriteSongs/:userId', ArtController.getAllFavouriteSongs)
router.get('/favouriteBooks/:userId', ArtController.getAllFavouriteBooks)
router.get(
	'/getUsersWithSameTaste/:userId',
	UserContoller.getUsersWithSameTaste
)
router.get('/checkRegistration/:userId', UserContoller.checkRegistration)
router.get('/checkAgreement/:userId', UserContoller.checkAgreement)
router.get('/setAgreement/:userId', UserContoller.setAgreement)

module.exports = router
