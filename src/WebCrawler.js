import React, { Component } from 'react';
import './WebCrawler.css';
import TestData from './assets/TestData';
import Utils from './utils/index';

const { CrawlPagesUtil } = Utils;
const { startCrawlingPages } = CrawlPagesUtil;
const { TestDataOne, TestDataTwo } = TestData;

class WebCrawler extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      value: JSON.stringify(TestDataOne, null, 4),
      crawledWebPages: ''
    };
  }

  /**
   * Fires the crawling function and stores the crawled information 
   * into state of the component
   * @param array pages all the pages to be parsed    
   */
  handleWebCrawling(pages) {
    let crawledWebPages = startCrawlingPages(pages);
    crawledWebPages = JSON.stringify(crawledWebPages, null, 4);
    this.setState({
      value: JSON.stringify(pages, null, 4),
      crawledWebPages
    });
  }

  render() {
    return (
      <div>
        <div>
          Crawl Web pages of Test Data:
        </div>
        <div className='Crawler-container'>
          <div className='col-6'>
              <div>Enter Test Data</div>
              <textarea readOnly value={this.state.value}/>
              <button onClick={(e) => this.handleWebCrawling(TestDataOne)}>
              Test Data One
              </button>
              <button onClick={(e) => this.handleWebCrawling(TestDataTwo)}>
              Test Data Two
              </button>
          </div>
          <div className='col-6'>
              <div>Crawled Web Pages</div>
              <textarea readOnly value={this.state.crawledWebPages}  />
          </div>
        </div>
      </div>
    );  
  }
}

export default WebCrawler;
