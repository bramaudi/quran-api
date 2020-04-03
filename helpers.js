const findByNumber = (num, key = 'number') =>
    data => data[key] === parseInt(num)

module.exports = {
    findByNumber
}