/** 
 * CrawlPagesUtil has the functions to crawl the page
 */

/**
 * Get the object pertaining to link URL from the array of page object
 * @param string pageLink web address of page to be crawled
 * @param array pages all the pages to be parsed 
 */
const getPageInfo = (pageLink, pages) => pages.find(d => d.address === pageLink);

/**
 * Crawls the webpages for given parameters
 * @param object crawledWebPages object of already crawled pages
 * @param string address web address of page to be crawled
 * @param object pageInfo 
 * @param array pages all the pages to be parsed 
 */
const crawlWebPages = (crawledWebPages, address, pageInfo, pages) => {
    let { success, skipped, error } = crawledWebPages;
    if(pageInfo) {
        if (!success.includes(address)) {
            //Assumption all the urls are valid ones
            success.push(address);
            const links = pageInfo.links;
            links && links.map(link => {
                const datum = getPageInfo(link, pages);
                crawlWebPages(crawledWebPages, link, datum, pages);
            });
        } else {
            !skipped.includes(address) &&
            skipped.push(address);
        }    
    } else {
        error.push(address);
    }
} 

/**
 * Crawling function which takes pages to be crawled and crawls them
 * @param array pages webpages to be crawled
 * @return object crawledWebPages 
 */
const startCrawlingPages = (pages) => {    
    let crawledWebPages = {
        'success': [],
        'skipped': [],
        'error': []
    };

    // Start from the first page and crawl through the children links
    pages[0] && pages[0].address &&
    crawlWebPages(crawledWebPages, pages[0].address, pages[0], pages);

    // TODO: Uncomment if want to crawl through all the pages and not just linked childrens of first page.
    // pages.map(d => {
        // if(!crawledWebPages.success.includes(d.address) && validURL(d.address)) {
            // crawlWebPages(crawledWebPages, d.address, d, pages);
        //  }
    // });
    
    return crawledWebPages;
}

export default {
    startCrawlingPages
};