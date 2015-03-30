'use strict'
const request = require('request-promise')
const saveImage = require('./lib/save_image')
const co = require('co')
const key = require('./config.json').meetup_key

function main(){
  co(function *(){
    const url = `https://api.meetup.com/2/rsvps?offset=0&format=json&event_id=221396409&photo-host=public&page=100&fields=&order=event&desc=false&key=${key}&sign=true`
    const responseBody = yield request(url)
    console.log(`Recieved ${responseBody.length} characters.`)
    const response = JSON.parse(responseBody)
    const rsvps = response.results
    yield saveImages(rsvps)
  }).catch(function(err){
    console.error(err.stack)
  })
}

co(saveImages(require('./meetup_rsvp.json').results))

function *saveImages(rsvps){
  const yeses = rsvps.filter(function(r){ return r.response === 'yes' })
  
  for (const rsvp of yeses){
    const name = rsvp.member.name
    const avatarUrl = rsvp.member_photo ?
      rsvp.member_photo.photo_link : null
    if (avatarUrl){
      console.log('Saving image for', name, avatarUrl)
      yield saveImage(avatarUrl, `meetup/${name}.jpg`)
    }else{
      console.log('No photo for', name)
    }
  }
}