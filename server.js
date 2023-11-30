const express = require('express');
const path = require('path');
const apiRoutes = require('./Develop/routes/apiRoutes');
const htmlRoutes = require('./Develop/routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets (CSS and JavaScript) with cache control headers
const assetsOptions = {
  maxAge: 3600000, // Cache for 1 hour in milliseconds
};

app.use('/assets/css', express.static(path.join(__dirname, 'Develop/public/assets/css'), assetsOptions));
app.use('/assets/js', express.static(path.join(__dirname, 'Develop/public/assets/js'), assetsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
