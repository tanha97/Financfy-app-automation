const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

const img1 = PNG.sync.read(fs.readFileSync('./tmp/baseline/Sales_Homepage.png'));
const img2 = PNG.sync.read(fs.readFileSync('./tmp/actual/Sales_Homepage.png'));
const { width, height } = img1;
const diff = new PNG({ width, height });

const mismatched = pixelmatch(img1.data, img2.data, diff.data, width, height, {
  threshold: 0.1
});

fs.writeFileSync('./tmp/diff/Sales_Homepage.png', PNG.sync.write(diff));
console.log(`Visual diff complete. ${mismatched} pixels mismatched.`);
