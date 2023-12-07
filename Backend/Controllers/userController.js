const User = require('../Models/User');
const { signToken } = require('../Config/jwt');


exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password);
        await User.findOne({ email: email })
            .then(user => {
                if (user) {
                    const error = new Error("Email already Used. Please use a different email");
                    error.statusCode = 409;
                    throw error;
                }
            });
        // .catch(err => {
        //     // console.log(err);
        //     if (!err.statusCode) {
        //         err.statusCode = 500;
        //     }
        //     next(err);
        // });
        const newUser = await User.create({ username: name, email, password });
        await newUser.save();
        res.status(200).json({
            message: "User created",
            id: newUser._id,
            email: newUser.email,
        });
    }
    catch (err) {
        console.log("Error from signup", err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        if (!email) {
            const error = new Error("Email is Required");
            error.statusCode = 400;
            throw error;
        }
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error("Email not found");
            error.statusCode = 404;
            throw error;
        }
        const Match = await user.comparePassword(password);
        if (!Match) {
            const error = new Error("Incorrect Password");
            error.statusCode = 401;
            throw error;
        }
        const token = signToken({
            userId: user._id,
        });
        res.status(200).json({
            message: 'user is loggedIn',
            token: token,
            username: user.username,
            userId: user._id,
        });
    }
    catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}



exports.getUserInfo = async (req, res, next) => {
    //get the current user id from request params and send it back to client side as response with all scores data
    try {
        // map through all scores for a user calculate average accuracy average speed and total time and populate all score data to the response

        const { id } = req.params;
        console.log(id);
        const user = await User.findById(id).populate('scores');
        if (!user) {
            const error = new Error("user not found");
            error.statusCode = 404;
            throw error;
        }
    
        console.log(user);
        const scores = user.scores;
        console.log(scores);
        if(scores.length===0)
        {
            return res.status(200).json({
                message: "User Information",
                username:user.username,
                accuracy: 0,
                speed: 0,
                totalTime: 0,
                scores: scores,
            })
        }
        const accuracy = scores.reduce((total, score) => total + score.accuracy, 0) / scores.length;
        const speed = scores.reduce((total, score) => total + score.speed, 0) / scores.length;
        const totalTime = scores.reduce((total, score) => total + score.testDuration, 0);

        user.avgSpeed = speed;
        user.overallAccuracy = accuracy;
        user.totalTime = totalTime;
        await user.save();

        res.status(200).json({
            message: "User Information",
            username:user.username,
            accuracy: accuracy,
            speed: speed,
            totalTime: totalTime,
            scores: scores,
        })
    }
    catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }






}