const { findByNumber } = require('../helpers')
const { data: quran } = require('../data/al-quran.json')

class SurahHandler {
    static getAllSurah(req, res) {
        const data = quran.map(item => {
            const surah = { ...item }
            delete surah.ayahs
            return surah
        })
        
        return res.status(200).send({
            code: 200,
            status: 'OK.',
            message: 'Success fetching all surah.',
            data
        })
    }

    static getSurah(req, res) {
        const { surah } = req.params
        const data = quran.find(findByNumber(surah))
        
        if (data) {
            return res.status(200).send({
                code: 200,
                status: 'OK.',
                message: 'Success fetching surah.',
                data
            })
        }

        return res.status(404).send({
            code: 404,
            status: 'Not Found.',
            message: `Surah "${surah}" is not found.`,
            data: {}
        })
    }

    static getAyahFromSurah(req, res) {
        const { surah, ayah } = req.params
        const checkSurah = quran.find(findByNumber(surah))

        if (!checkSurah) {
            return res.status(404).send({
                code: 404,
                status: 'Not Found.',
                message: `Surah "${surah}" is not found.`,
                data: {}
            })
        }

        const checkAyah = checkSurah.ayahs.find(findByNumber(ayah, 'numberInSurah'))

        if (!checkAyah) {
            return res.status(404).send({
                code: 404,
                status: 'Not Found.',
                message: `Ayah "${ayah}" in surah "${surah}" is not found.`,
                data: {}
            })
        }

        const dataSurah = { ...checkSurah }
        delete dataSurah.ayahs
        const data = { ...checkAyah, surah: dataSurah }

        return res.status(200).send({
            code: 200,
            status: 'OK.',
            message: 'Success fetching ayah',
            data
        })
    }
}

module.exports = SurahHandler
