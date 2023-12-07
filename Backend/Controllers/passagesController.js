const Passages = require('../Models/Passages');

const fetch = require('node-fetch');

exports.getShortParagraph = async (req, res, next) => {

    const url = `${process.env.PARA_API_URL}/4`;

    try {

        const response = await fetch(url);
        const body = await response.text();

        // console.log(body);

        res.status(200).json({
            message: "Short Paragraph",
            data: body,
        });

    } catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getMediumParagraph = async (req, res, next) => {

    const url = `${process.env.PARA_API_URL}/8`;

    try {

        const response = await fetch(url);
        const body = await response.text();

        // console.log(body);

        res.status(200).json({
            message: "Medium Paragraph",
            data: body,
        });

    } catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getLongParagraph = async (req, res, next) => {

    const url = `${process.env.PARA_API_URL}/12`;

    try {

        const response = await fetch(url);
        const body = await response.text();

        // console.log(body);

        res.status(200).json({
            message: "Long Paragraph",
            data: body,
        });

    } catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


// regx function to convert a string in all lower case without any punctuation
function easyStr(str) {
    const lCase = str.toLowerCase();
    const noPunc = lCase.replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, "");
    const finalString = noPunc.replace(/\s{2,}/g, " ");
    return finalString;
}

exports.getEasyMode = async (req, res, next) => {

    const url = `${process.env.PARA_API_URL}/8`;

    try {

        const response = await fetch(url);

        const body = await response.text();
        // console.log(body);
        const ez = easyStr(body);
        // console.log(ez);



        res.status(200).json({
            message: "Easy Mode",
            data: ez,
        });

    } catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

function medStr(str) {
    const noPunc = str.replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, "");
    const finalString = noPunc.replace(/\s{2,}/g, " ");
    return finalString;
}

exports.getMediumMode = async (req, res, next) => {
    const url = `${process.env.PARA_API_URL}/8`;

    try {

        const response = await fetch(url);
        const body = await response.text();
        const med = medStr(body);
        // console.log(med);

        res.status(200).json({
            message: "Medium Mode",
            data: med,
        });

    } catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}
