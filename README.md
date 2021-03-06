# Quran - API

### Deployed: https://api.quran.sutanlab.id

### Introduction
Simple Quran API with media audio ***Syekh. Mishary Rashid Alafasy murrotal***.

### Disclaimer
This API data source comes from the combination of several parameters from [api.alquran.cloud](https://api.alquran.cloud) by changing its structure for the better use and performance. (Maybe next time, This API has many data source?)

### Endpoint usage
- [x] `/surah` = Returns the list of surahs in Al-Quran.
- [x] `/surah/{surah}` = Returns spesific surah. **Example: `/surah/110`**
- [x] `/surah/{surah}/{ayah}` = Returns spesific ayah with requested surah. **Example: `/surah/2/255`**
- [ ] Your requests ?

### Recommended fonts for Al-qur'an 
- [quran.musil.com](http://quran.mursil.com/Web-Print-Publishing-Quran-Text-Graphics-Fonts-and-Downloads/fonts-optimized-for-quran)
- [Uthmani](https://groups.google.com/forum/#!topic/colteachers/Y6iKganK0tQ)

### Available Commands
- `yarn start` = run server.
- `yarn dev` = run develop server.
- `yarn generate` = collect new data from the data source, then unifying it in one JSON file.

### Data Source
- `data/al-quran.json` combined & generated from `generator.js`.
- `data/surah-id.json` scraped from [quran.kemenag.go.id List ayah](https://quran.kemenag.go.id) (for indonesia ayah transalations)

### LICENSE
MIT

## Support Me
### Global
[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/B0B71P7PB)
### Indonesia
- [Trakteer](https://trakteer.id/sutanlab)
- [Karyakarsa](https://karyakarsa.com/sutanlab)

---
Copyright © 2020 by Sutan Gading Fadhillah Nasution
