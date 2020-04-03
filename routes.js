const { Router } = require('express')
const SurahHandler = require('./handlers/surah')

const router = Router()

// surah router
router.get('/surah', SurahHandler.getAllSurah)
router.get('/surah/:surah', SurahHandler.getSurah)
router.get('/surah/:surah/:ayah', SurahHandler.getAyahFromSurah)

module.exports = router
