const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            require: true,
            unique: true,
        },
        redirectUrl: {
            type: String,
            require: true,
        },
        visitHistory: [
            {
                timeStamps: {
                    type: Number,
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

const Url = mongoose.model('URL', urlSchema);

module.exports = Url;