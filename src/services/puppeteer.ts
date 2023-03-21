import puppeteer from "puppeteer";

// This function is used to generate a PDF from a given URL
// will be updated to use a template
export async function getPdf(url: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle0" });
  const pdf = await page.pdf({ format: "A4" });
  await browser.close();

  return pdf;
}
