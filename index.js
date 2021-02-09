const puppeteer = require("puppeteer");
const testInfo = require("./test.json");
const expect = require("chai").expect;

describe("Example", async () => {
    it("Validate Version", async () => {
    let xhrResponse = {}
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    const page = await browser.newPage();
    page.setViewport({ width: 1920, height: 1080 });
    page.on('response', async (response) => {
        if (response._url === testInfo.versionAPI) {
            xhrResponse.version = await response.json() 
        }
      })
    await page.goto(testInfo.url);
    await page.waitForSelector("#footerMeta")
    expect(xhrResponse.version.error).to.equal(false);
    await browser.close();
    })
})