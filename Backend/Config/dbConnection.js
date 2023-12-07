const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URI)
    .then(result => {
        console.log("Connected to MongoDB !! ");
    })
    .catch(err => {
        console.log(err);
    });