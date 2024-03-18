const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');

const Url = require('../model/urlSchema');

router.post('/url', async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "Url is required" });
    try {
        const shortId = nanoid(8);

        const shortUrl = new Url({
            shortId: shortId,
            redirectUrl: body.url,
        });

        const generatedUrl = await shortUrl.save();

        if (generatedUrl) return res.status(200).json({ id: generatedUrl.shortId });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})


router.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    try {
        const url = await Url.findOneAndUpdate({
            shortId,
        }, {
            $push: { visitHistory: { timeStamps: Date.now() } }
        });

        if (url) return res.redirect(url.redirectUrl);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})


router.get('/', (req, res) => {
    res.status(200).json({ Message: "How are you" });
})


module.exports = router;