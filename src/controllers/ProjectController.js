import { prismaClient } from "../database/prismaClient.js";

class ProjectController {
    static async createProject(req, res) {
        const { name } = req.body;
        const userid = req.id;

        try {
            const project = await prismaClient.project.create({
                data: { name, userId: userid },
            });

            res.status(201).json({ data: project });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Erro ao criar o projeto" });
        }
    }

    static async getProjects(req, res) {
        const userId = req.id;

        try {
            const projects = await prismaClient.project.findMany({
                where: {
                    userId: userId
                },
                include: {
                    tasks: true,
                }
            });

            res.status(200).json({ data: projects });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao buscar projetos" });
        }
    }

    static async getProjectById(req, res) {
        const { id } = req.params;
        const userId = req.id;

        try {
            const project = await prismaClient.project.findUnique({
                where: { id: parseInt(id) },
                include: {
                    tasks: true,
                }
            });

            if (!project) {
                return res.status(404).json({ message: "Projeto não encontrado" });
            }

            if (project.userId !== userId) {
                return res.status(403).json({ message: "Você não tem permissão para ver este projeto" });
            }

            res.status(200).json({ data: project });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao buscar projeto" });
        }
    }

    static async updateProject(req, res) {
        const { id } = req.params;
        const { name } = req.body;
        const userId = req.id;

        try {
            const project = await prismaClient.project.findUnique({
                where: { id: parseInt(id) },
            });

            if (!project) {
                return res.status(404).json({ message: "Projeto não encontrado" });
            }

            if (project.userId !== userId) {
                return res.status(403).json({ message: "Você não tem permissão para atualizar esse projeto" });
            }

            const updatedProject = await prismaClient.project.update({
                where: { id: parseInt(id) },
                data: { name },
                include: {
                    tasks: true
                }
            });

            res.status(200).json({ data: updatedProject });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Erro ao atualizar projeto" });
        }
    }

    static async deleteProject(req, res) {
        const { id } = req.params;
        const userId = req.id;

        try {
            const project = await prismaClient.project.findUnique({
                where: { id: parseInt(id) },
            });

            if (!project) {
                return res.status(404).json({ message: "Projeto não encontrado" });
            }

            if (project.userId !== userId) {
                return res.status(403).json({ message: "Você não tem permissão para deletar esse projeto" });
            }

            await prismaClient.project.delete({
                where: { id: parseInt(id) },
            });

            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Erro ao deletar projeto" });
        }
    }
}

export default ProjectController;