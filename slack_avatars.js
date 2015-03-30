'use strict'

const request = require('request-promise')
const co = require('co')
const token = require('config.json').slack_token
const url = `https://slack.com/api/channels.list?token=${token}`
const saveImage = require('./lib/save_image')

co(function *(){
  const reply = yield request(url)
  const channels = JSON.parse(reply).channels
  const javascript = channels.filter(function(ch){
    return ch.name === 'javascript'
  })[0]
  const jsMembers = javascript.members
  for (const userId of jsMembers){
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

