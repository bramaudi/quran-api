const findByNumber = (num, key = 'number') =>
    data => data[key] === parseInt(num)

const mappingAyah = ({ number, text }) => ({ number, text })

const range = (start, end) =>
    start === end ? [start] : [start, ...range(start + 1, end)]

module.exports = {
    findByNumber,
    mappingAyah,
    range
}