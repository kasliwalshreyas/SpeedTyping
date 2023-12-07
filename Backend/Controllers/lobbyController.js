const Lobby = require("../Models/Lobby");
const User = require("../Models/User");
const nanoid = require("nanoid-esm");

exports.createLobby = async (req, res, next) => {
    try {
        const { username, isPublic, isLoggedIn } = req.body;
        // const user = await User.findById(userId);
        // if (!user) {
        //     const error = new Error("Please Login as a valid user");
        //     error.statusCode = 404;
        //     throw error;
        // }

        // console.log(username, isPublic, isLoggedIn);

        let userid;
        if (isLoggedIn === 'false' || !isLoggedIn) {
            userid = nanoid(10);
        }
        else {
            const user = await User.findOne({ username: username });
            if (!user) {
                const error = new Error("Please Login as a valid user");
                error.statusCode = 404;
                throw error;
            }
            else {
                userid = user._id;
            }
        }

        // console.log(userid);

        const lobbyCode = nanoid(5);
        const newLobby = new Lobby({
            lobbyCode: lobbyCode,
            users: [
                {
                    userId: userid,
                    userName: username,
                    isRegistered: false,
                }
            ],
            ownerId: userid,
            isPublic: isPublic,

        });
        await newLobby.save();

        // console.log(newLobby);

        res.status(200).json({
            message: "New Lobby Created",
            lobby: newLobby,
            userid: userid,
        });
    } catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.joinLobby = async (req, res, next) => {
    try {
        const { username, lobbyCode, isLoggedIn } = req.body;
        // console.log(username, lobbyCode);
        const lobby = await Lobby.findOne({ lobbyCode: lobbyCode });
        if (!lobby) {
            const error = new Error("Invalid Lobby Code ");
            error.statusCode = 404;
            throw error;
        }

        if (lobby.expired) {
            const error = new Error("Lobby has expired");
            error.statusCode = 404;
            throw error;
        }

        let userid;
        if (isLoggedIn === 'false' || !isLoggedIn) {
            userid = nanoid(10);
        }
        else {
            const user = await User.findOne({ username: username });
            if (!user) {
                const error = new Error("Please Login as a valid user");
                error.statusCode = 404;
                throw error;
            }
            else {
                userid = user._id;
            }
        }

        const updatedLobby = await Lobby.findByIdAndUpdate(lobby._id,
            {
                $push: {
                    users: {
                        userId: userid,
                        userName: username,
                        isRegistered: isLoggedIn,
                    }
                },
            },
            { new: true });


        res.status(200).json({
            message: "Lobby Found",
            lobby: updatedLobby,
            userid: userid,
        });
    } catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;

        }
        next(error);
    }
}


exports.getPublicLobbies = async (req, res, next) => {
    try {
        const sessions = await Lobby.find({ isPublic: true, expired: false });
        // console.log(sessions);
        res.status(200).json({
            message: "All Public Sessions",
            data: sessions,
        });
    } catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.getLobby = async (req, res, next) => {
    try {
        const { id } = req.params;
        const lobby = await Lobby.find({ lobbyCode: id });
        if (!lobby) {
            const error = new Error("Invalid Lobby Code ");
            error.statusCode = 404;
            throw error;
        }

        // console.log(lobby);
        res.status(200).json({
            message: "Lobby Found",
            data: lobby[0],
        });
    } catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500;

        }
        next(error);
    }
}

exports.expireLobby = async ({ lobbyCode }) => {
    try {
        const lobby = await Lobby.findOne({ lobbyCode: lobbyCode })
        if (!lobby) {
            const error = new Error("Invalid Lobby Code ");
            error.statusCode = 404;
            throw error;
        }

        lobby.expired = true;
        await lobby.save();


        return { message: "Lobby Expired", status: true, lobbyCode: lobbyCode }

    } catch (error) {
        return { message: error.message, status: false, lobbyCode: lobbyCode };
    }
}

