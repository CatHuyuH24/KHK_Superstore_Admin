const searchService = require('./searchService');

exports.renderSearchResultsPage = async (req, res) => {
  try {
    const query = req.query.search || '';
    const userID = res.locals.user ? res.locals.user.id : null;
    if (!query) {
      console.error("Query is empty or undefined in controller");
    }
    const products = await searchService.searchAllProducts(query);
    res.render('searchResult', { title: 'Search Results', products, query, user_id:userID});
  } catch (error) {
    console.error('Error rendering search results page:', error);
    res.status(500).send('Internal Server Error');
  }
};