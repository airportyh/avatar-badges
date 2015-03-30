var request = require('request')
var crypto = require('crypto')
var email = 'neopowerbrains@yahoo.com'
var sum = crypto.createHash('md5')
sum.update(email)
var digest = sum.digest('hex')
var url = 'http://www.gravatar.com/avatar/' + digest + '?s=40&size=100'
console.log(url)
var fs = require('fs')
var out = fs.createWriteStream('goldbuick.jpg')
request(url).pipe(out)