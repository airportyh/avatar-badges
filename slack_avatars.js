'use strict'

const request = require('request-promise')
const co = require('co')
const token = require('slack.json').token
const url = `https://slack.com/api/channels.list?token=${token}`

co(function *(){
  const reply = yield request(url)
  const channels = JSON.parse(reply).channels
  const javascript = channels.filter(function(ch){
    return ch.name === 'javascript'
  })[0]
  const jsMembers = javascript.members
  for (let i = 0; i < jsMembers.length; i++){
    const userId = jsMembers[i]
    const url = `https://slack.com/api/users.info?token=${token}&user=${userId}`
    const user = JSON.parse(yield request(url)).user
    console.log(user.name, user.profile.email)
    const avatarUrl = user.profile.image_192
    yield saveImage(avatarUrl, `slack/${user.name}.png`)
  }
}).catch(function(err){
  console.log(err.stack)
})

const fs = require('fs')
const _request = require('request')
function saveImage(url, filepath){
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
