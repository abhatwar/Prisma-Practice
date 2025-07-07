const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const loginRouter = require('../Routes/loginRouter');
const productList = require('../Routes/productList');
const responseFormatter = require('../Middlewares/responseFormatter');



const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Use the response formatting middleware
app.use(responseFormatter);

app.use('/api', loginRouter.router);
app.use('/api', productList.router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});