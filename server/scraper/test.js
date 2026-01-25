import { scrapeScholarships } from "./scholarshipsScraper.js";

(async () => {
    console.log("Starting scraper...");
    try {
        const data = await scrapeScholarships();
        console.log("Scraped Data:", JSON.stringify(data, null, 2));
        console.log("Total Items:", data.length);
    } catch (e) {
        console.error("Scraper failed:", e);
    }
})();
