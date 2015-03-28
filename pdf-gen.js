'use strict'
const PDFDocument = require('pdfkit')
const fs = require('fs')

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

drawBadge('airportyh', x1, y1)
drawBadge('saron', x2, y1)
drawBadge('randallkent', x1, y2)
drawBadge('brandondees', x2, y2)
drawBadge('goldbuick', x1, y3)
drawBadge('cal', x2, y3)
doc.end()

function drawBadge(handle, x, y){
  doc.text(handle, x, y)
  doc.save()
  doc.roundedRect(x, y + 50, 100, 100, 5)
    .clip()
  doc.image(handle + '.jpg', x, y + 50)
  doc.restore()  
}
