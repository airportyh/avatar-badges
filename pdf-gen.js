'use strict'
const PDFDocument = require('pdfkit')
const fs = require('fs')
const entries = fs.readdirSync('slack')
const path = require('path')
const docWidth = 612

let output = fs.createWriteStream('test.pdf')
let doc = new PDFDocument

let stream = doc.pipe(output)


doc.fontSize(36)
doc.font('/Users/airportyh/Library/Fonts/YanoneKaffeesatz-Bold.ttf')

const x1 = 75
const x2 = 350
const y1 = 50
const y2 = 300
const y3 = 550
const coords = [
  [x1, y1],
  [x2, y1],
  [x1, y2],
  [x2, y2],
  [x1, y3],
  [x2, y3]
]

for (let i = 0; i < entries.length; i += 6){
  if (i !== 0) doc.addPage()
  for (let j = 0; j < 6; j++){
    const entry = entries[i + j]
    if (!entry) break
    drawBadge(path.basename(entry, '.png'), coords[j][0], coords[j][1])
  }
}

doc.end()

function drawBadge(handle, x, y){
  doc.text(handle, x, y)
  doc.save()
  doc.roundedRect(x, y + 50, 100, 100, 5)
    .clip()
  doc.image(`slack/${handle}.png`, x, y + 50, {width: 100})
  doc.restore()  
}

