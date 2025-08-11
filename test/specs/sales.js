const fs = require('fs');
const path = require('path');

const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch').default;
const sharp = require('sharp');
const allure = require('@wdio/allure-reporter').default;

const logIn = require('../pageObject/logInObject');
const sales = require('../pageObject/salesObject');

describe('Sales page', () => {

  it.only('Should Match Sales Screen with Figma Design', async () => {

    await driver.pause(5000);
    await logIn.logInButton.click();
    await logIn.mobileNumber.click();
    await logIn.mobileNumber.addValue('01500000000');
    await logIn.password.click();
    await logIn.password.addValue('A12345678a');
    await logIn.logInButton.click();
    await sales.salesMenu.click();
    await driver.pause(5000);
    //await sales.salesMenu.waitForDisplayed({ timeout: 70000 })
   
    

    const fileName = 'Sales_Screen.png';
    const actualPath = path.join(__dirname, '../tmp/actual', fileName);
    const expectedPath = path.join(__dirname, '../tmp/expected', fileName);
    const diffPath = path.join(__dirname, '../tmp/diff', fileName);

    // Take screenshot from Appium
    const screenshotBase64 = await driver.takeScreenshot();
    fs.writeFileSync(actualPath, Buffer.from(screenshotBase64, 'base64'));

    // Read expected image file as buffer
    const expectedBuffer = fs.readFileSync(expectedPath);

    // Read expected image dimensions
    const expectedPNG = PNG.sync.read(expectedBuffer);

    // Resize actual screenshot to expected size using sharp
    const resizedBuffer = await sharp(actualPath)
      .resize(expectedPNG.width, expectedPNG.height)
      .toBuffer();

    // Overwrite actual screenshot with resized buffer
    fs.writeFileSync(actualPath, resizedBuffer);

    // Read actual and expected images as PNG for pixelmatch
    const actualPNG = PNG.sync.read(resizedBuffer);  // read resized actual buffer directly
    // expectedPNG already read above

    const { width, height } = expectedPNG;
    const diff = new PNG({ width, height });

    const mismatchPixels = pixelmatch(
      actualPNG.data,
      expectedPNG.data,
      diff.data,
      width,
      height,
      { threshold: 0.1 }
    );

    const mismatchPercentage = (mismatchPixels / (width * height)) * 100;
    console.log(`Mismatch: ${mismatchPixels} pixels (${mismatchPercentage.toFixed(2)}%)`);

    // Save the diff image
    fs.writeFileSync(diffPath, PNG.sync.write(diff));

    // Assertion with custom error message
    expect(mismatchPercentage).toBeLessThan(2); // Adjust threshold as needed

  
});


    

    // // Attach each image to the Allure Report
    // allure.addAttachment('Baseline Image',fs.readFileSync(baseline),'image/png')
    // allure.addAttachment('Actual Image', fs.readFileSync(actual), 'image/png')
    // allure.addAttachment('Diff Image', fs.readFileSync(diff), 'image/png')
    // // allure.addStep(`Sales screen misMatchPercentage is: ${misMatch.toFixed(2)}%`)
    // // expect(result).toBeLessThan(10)
  })

  it('Edit Invoice', async ()=>{
    await logIn.logInButton.click()
    await logIn.mobileNumber.click()
    await logIn.mobileNumber.addValue('01500000000')
    await logIn.password.click()
    await logIn.password.addValue('A12345678a')
    await logIn.logInButton.click()
    await sales.salesMenu.click()
    await sales.specificInvoice.click()
    await sales.edit.click()
    
  })


