const express = require('express');
const { port } = require('./config');
const path = require('path');

const LOGGER = require('clapboard');
const RH = require('./src/utils/ResponseHandler');
const KS = require('./src/service/knowledgeService');

const Log = new LOGGER();
const app = express();

app.use(express.static('public'))

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
})

app.get('/api/v1/knowledge', (req, res) => {
    const { term, depth } = req.query;
    return KS.buildMap(term, depth)
        .then(RH.handleSuccess(res))
        .catch(RH.handleError(res));
})

app.listen(port, '0.0.0.0', () => Log.info(`app listening to port: ${port}`));