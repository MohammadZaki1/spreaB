import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";

export const generatePDF = async (html, fileName) => {
  const outputDir = "./uploads/contracts";

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--disable-software-rasterizer"
    ]
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);

  await page.setContent(html, { waitUntil: "networkidle0" });

  const filePath = path.resolve(`${outputDir}/${fileName}`);

  await page.pdf({
    path: filePath,
    format: "A4",
    printBackground: true
  });

  await browser.close();

  return filePath;
};


// import puppeteer from "puppeteer";
// import path from "path";
// export const generatePDF = async (html, fileName) => {
//   const browser = await puppeteer.launch({ headless: "new" });
//   const page = await browser.newPage();
//    page.setDefaultNavigationTimeout(0);

//   await page.setContent(html, { waitUntil: "load" });
//  // await page.setContent(html, { waitUntil: "networkidle0" });

//   const pdf = await page.pdf({
//     path: `./uploads/contracts/${fileName}`,
//     format: "A4",
//     printBackground: true,
//   });

//   await browser.close();
//  // return `/uploads/contracts/${fileName}`; // return path to store in DB
//  return path.resolve(`./uploads/contracts/${fileName}`);
// };
