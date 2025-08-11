const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');
require('dotenv').config();

// ⚠️ Replace with your actual values
const FIGMA_TOKEN = process.env.FIGMA_TOKEN
const FILE_KEY = process.env.FILE_KEY
const NODE_ID = process.env.NODE_ID

/**
 * Downloads a Figma frame image and saves it to /tmp/expected/
 * @param {string} fileName The name to save the file as (e.g. Sales_Screen.png)
 */
async function downloadFigmaFrame(fileName = 'Sales_Screen.png') {
  try {
    const apiUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${NODE_ID}&format=png`;

    const response = await fetch(apiUrl, {
      headers: { 'X-Figma-Token': FIGMA_TOKEN }
    });

    const data = await response.json();
    const imageUrl = data?.images?.[NODE_ID];

    if (!imageUrl) {
      throw new Error(' Image URL not returned. Check NODE_ID or permissions.');
    }

    const imgResponse = await fetch(imageUrl);
    if (!imgResponse.ok) {
      throw new Error(` Failed to download image from: ${imageUrl}`);
    }

    const buffer = await imgResponse.buffer();

    // ✅ Always resolve from project root to avoid __dirname issues
    const outputDir = path.resolve(process.cwd(), 'test', 'tmp', 'expected');
    const outputPath = path.join(outputDir, fileName);

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(outputPath, buffer);

    console.log('✅ Baseline image saved to:', outputPath);
  } catch (err) {
    console.error('⚠️ Failed to download from Figma:', err.message);
  }
}

// 👇 Only run if called directly
if (require.main === module) {
  downloadFigmaFrame(); // Call with default fileName
}

module.exports = { downloadFigmaFrame };


// const fetch = require('node-fetch');


// (async () => {
//   const apiUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${NODE_ID}&format=png`;
//   const res = await fetch(apiUrl, {
//     headers: { 'X-Figma-Token': FIGMA_TOKEN }
//   });
//   const data = await res.json();
//   console.log(JSON.stringify(data, null, 2));
// })();



