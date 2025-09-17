import jwt from 'jsonwebtoken';
const secretKey = process.env.SECRET_KEY_AUTH;

export const authenticateUserToken = (req, res, next) =>{
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid Token' });
        }
        req.user = user;
        next();
    });
}

export const authenticateAdminToken = (req, res, next) =>{
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }
res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "true");

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid Token' });
        }
        var role = user.role
        
        req.user = user;

        next();
    });

}

