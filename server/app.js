const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config({ path: './config.env' });

require('./db/conn');

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors({
    origin:'https://shortend-url.vercel.app'
}));

app.use(require('./route/url'));

// app.use('/url', require('./route/url'));
// app.use('/:shortId', require('./route/redirect'));

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})