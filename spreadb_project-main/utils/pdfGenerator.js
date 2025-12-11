import puppeteer from "puppeteer";
import path from "path";
export const generatePDF = async (html, fileName) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
   page.setDefaultNavigationTimeout(0);

  await page.setContent(html, { waitUntil: "load" });
 // await page.setContent(html, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({
    path: `./uploads/contracts/${fileName}`,
    format: "A4",
    printBackground: true,
  });

  await browser.close();
 // return `/uploads/contracts/${fileName}`; // return path to store in DB
 return path.resolve(`./uploads/contracts/${fileName}`);
};
