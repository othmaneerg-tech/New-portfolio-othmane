const { removeBackground } = require("@imgly/background-removal-node");
const fs = require("fs");

async function removeBg(inputPath, outputPath) {
  try {
    const buffer = fs.readFileSync(inputPath);
    const blob = new Blob([buffer]);
    const imageBlob = await removeBackground(blob);
    const outBuffer = Buffer.from(await imageBlob.arrayBuffer());
    fs.writeFileSync(outputPath, outBuffer);
    console.log(`Success: ${outputPath}`);
  } catch(e) {
    console.error(`Error processing ${inputPath}:`, e);
  }
}

async function run() {
  await removeBg("C:\\Users\\hp\\.gemini\\antigravity\\brain\\edadd6f1-a6f3-410e-bee0-e57fc12b0cff\\media__1773290353778.jpg", "public/assets/othmane_suit_nobg.png");
  await removeBg("C:\\Users\\hp\\.gemini\\antigravity\\brain\\edadd6f1-a6f3-410e-bee0-e57fc12b0cff\\media__1773290363852.jpg", "public/assets/othmane_grad_nobg.png");
}

run();
