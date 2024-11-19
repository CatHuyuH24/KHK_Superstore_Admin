const searchService = require('./searchService');

exports.renderSearchResultsPage = async (req, res) => {
  try {
    const query = req.query.search || '';
    if (!query) {
      console.error("Query is empty or undefined in controller");
    }
    const products = await searchService.searchAllProducts(query);
    res.render('searchResult', { title: 'Search Results', products, query });
  } catch (error) {
    console.error('Error rendering search results page:', error);
    res.status(500).send('Internal Server Error');
  }
};