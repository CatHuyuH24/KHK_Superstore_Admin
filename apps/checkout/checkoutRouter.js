const express = require('express');
const router = express.Router();

// Route to render the checkout page
router.get('/', (req, res) => {
    res.render('checkout');
});

module.exports = router;