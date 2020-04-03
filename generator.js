require('dotenv').config()
const { writeFile } = require('fs').promises
const fetch = require('node-fetch')
const idSurahTranslations = require('./data/surah-id.json')

const mappingAyah = ({ number, text }) => ({ number, text })

const findAyah = ayah => ({ number }) => ayah === number

const range = (start, end) =>
    start === end ? [start] : [start, ...range(start + 1, end)]

const getSurah = (surah, edition = ['ar.alafasy', 'en.transliteration', 'id.indonesian']) =>
    fetch(`${process.env.API_BASEURL}/surah/${surah}/editions/${edition.join(',')}`)

const operate = async (surah, tryFlag = false) => {
    try {
        const response = await (await getSurah(surah)).text()
        const { code, status, data } = JSON.parse(response.replace(/\\u/g, '==='))
        const [arab, latin, id] = data

        if (code !== 200) throw { surah, code, status }
        if (tryFlag) console.log(`\n Retrying at surah: ${surah}`)

        process.stdout.write(`> (${code}:${status}). Operating on surah ${surah}:${arab.englishName}... `)

        delete arab.edition
        
        const latinAyahs = latin.ayahs.map(mappingAyah)
        const idAyahs = id.ayahs.map(mappingAyah)
        const result = {
            ...arab,
            ayahs: arab.ayahs.map(ayah => ({
                ...ayah,
                text: {
                    arab: ayah.text,
                    latin: latinAyahs.find(findAyah(ayah.number)).text,
                    id: idAyahs.find(findAyah(ayah.number)).text
                }
            }))
        }

        process.stdout.write('Done!\n')
        return result
    } catch ({ surah, code, status }) {
        process.stdout.write(`> (${code}:${status}). Error on surah ${surah}!`)
        console.log('\n> Will retrying at last queue...\n')
        return await operate(surah, true)
    }
}

async function main() {
    console.log('Fetching all surah...\n')
    const response = await Promise.all(range(1, 114).map(surah => operate(surah)))

    console.log('\nFetching all surah (DONE).')
    process.stdout.write('\n> Writing Data..')
    
    const data = JSON.stringify({
        license: `(MIT) Sutan Nasution <sutan.gnst@gmail.com>`,
        audioEdition: 'Syekh. Mishary Rashid Alafasy',
        data: response.map(data => ({
            idRevelationType: data.revelationType === 'Meccan'
                ? 'Mekah'
                : 'Madinah',
            idNameTranslation: idSurahTranslations
                .find(({ number }) => number === data.number)
                .text,
            ...data
        }))
    })

    await writeFile('./data/al-quran.json', data.replace(/===/g, '\\u'))
    console.log(`\n> Writed ${response.length} surah.\n`)
    console.log('Generate Done!')
}

main()