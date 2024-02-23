const express = require("express");
const quotesArray = require('./quotes.json');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = 3000;


// app.use(express.static('public'));

app.get("/", async (req, res) => {
    try {
        const randomNumber = Math.floor(Math.random() * 21);
        const quoteItem = quotesArray[randomNumber];
        const indexPath = path.join(__dirname, 'public', 'index.html');

        // Read the content of index.html
        let htmlContent = await fs.readFile(indexPath, 'utf-8');

        // Replace the placeholder with the fetched quote
        htmlContent = htmlContent.replace('<p id="quotePlaceholder"></p>', `<p id="quotePlaceholder"><q>${quoteItem.quote}</q></p>`);
        const stylesPath = path.join(__dirname, 'public', 'styles.css');
        const stylesContent = await fs.readFile(stylesPath, 'utf-8');
        htmlContent = htmlContent.replace('<head>', `<style>${stylesContent}</style></head>`);
        res.send(htmlContent);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
