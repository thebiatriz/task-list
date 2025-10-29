import { prismaClient } from "../database/prismaClient";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class LoginController {

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await prismaClient.user.findUnique({
                where: { email }
            });

            if (!user) {
                return res.status(404).json({ success: false, message: "Usuário não encontrado" });
            }

            const isPasswordValid = bcrypt.compareSync(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ success: false, message: "Senha inválida" });
            }

            const payload = { id: user.id, name: user.name };

            const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn: '12h' });

            return res.status(200).json({ success: true, message: "Login realizado com sucesso", user: payload, token: token });

        } catch (error) {
            return res.status(500).json({ success: false, message: "Erro ao fazer login", details: error.message });
        }
    }
}

export default LoginController;