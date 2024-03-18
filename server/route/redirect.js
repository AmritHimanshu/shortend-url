const express = require('express');
const router = express.Router();

const Url = require('../model/urlSchema');

router.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    console.log(shortId)
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


module.exports = router;