'use strict'
const fs = require('fs')
const _request = require('request')

module.exports = function(url, filepath){
  return new Promise(function(resolve, reject){
    const out = fs.createWriteStream(filepath)
    _request(url).pipe(out)
    out.on('close', function(){
      resolve(null)
    })
    out.on('error', function(err){
      reject(err)
    })
  })
}
