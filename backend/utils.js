import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        //  this secret is usde for creating the jwt token.
    }, process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '5d',
        });
};

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.status(401).send({ message: "Token not Provided" });
    } else {
        const token = authorization.slice(7, authorization.length); // Bearer XXXXXXX
        jwt.verify(
            token,
            process.env.JWT_SECRET || 'somethingsecret',
            (err, decode) => {
                if (err) {
                    res.status(401).send({ message: "Invalid Token" });
                } else {
                    // decode will carry all user info sended at time of User login model
                    req.user = decode;
                    next();
                }
            }
        )
    }
}