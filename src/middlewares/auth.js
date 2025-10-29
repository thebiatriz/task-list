import jwt from 'jsonwebtoken';

export default function (req, res, next) {

    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ success: false, message: "Token não informado" });
        }

        const token = authorization.replace("Bearer ", "").trim();

        const payload = jwt.verify(token, process.env.SECRET_JWT);

        const { id } = payload

        req.id = id;

        return next();

    } catch (error) {
        return res.status(401).json({ success: false, message: "Token inválido", details: error.message });
    }

}