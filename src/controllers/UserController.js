
import bcrypt from 'bcryptjs';
import { formatUser, formatUserList } from "../presenters/userPresenter.js";
import { prismaClient } from "../database/prismaClient.js";

class UserController {
    static async createUser(req, res) {
        const { email, name, password } = req.body;

        try {
            const otherUserWithEmail = await prismaClient.user.findUnique({
                where: {
                    email
                },
            })

            if (otherUserWithEmail) {
                return res.status(400).json({ message: "Já existe um usuário cadastrado com o email fornecido" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prismaClient.user.create({
                data: { email, name, password: hashedPassword },
            });

            res.status(201).json({ data: formatUser(user) });
        } catch (error) {
            res.status(400).json({ message: "Erro ao criar usuário", details: error.message });
        }
    }

    static async getUsers(req, res) {
        try {
            const users = await prismaClient.user.findMany();

            res.status(200).json({ data: formatUserList(users) });
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar usuários", details: error.message });
        }
    }

    static async getUserById(req, res) {
        const { id } = req.params;

        try {
            const user = await prismaClient.user.findUnique({
                where: { id: parseInt(id) },
            });

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            res.status(200).json({ data: formatUser(user) });
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar usuário", details: error.message });
        }
    }

    static async updateUser(req, res) {
        const id = req.id;
        const { email, name } = req.body;

        try {
            const otherUserWithEmail = await prismaClient.user.findUnique({
                where: {
                    email,
                    NOT: {
                        id: parseInt(id)
                    }
                },
            })

            if (otherUserWithEmail) {
                return res.status(400).json({ message: "Já existe um usuário cadastrado com o email fornecido" });
            }

            const user = await prismaClient.user.update({
                where: { id: parseInt(id) },
                data: { email, name },
            });

            res.status(200).json({ data: formatUser(user) });
        } catch (error) {
            res.status(400).json({ message: "Erro ao atualizar usuário", details: error.message });
        }
    }

    static async deleteUser(req, res) {
        const id = req.id;

        try {
            const user = await prismaClient.user.findUnique({
                where: { id: parseInt(id) },
            });

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            await prismaClient.user.delete({
                where: { id: parseInt(id) },
            });

            res.status(204).send();
        } catch (error) {
            res.status(400).json({ message: "Erro ao deletar usuário", details: error.message });
        }
    }
}

export default UserController;