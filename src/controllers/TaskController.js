import { prismaClient } from "../database/prismaClient.js";

class TaskController {
    static async createTask(req, res) {
        const { description, isComplete } = req.body;
        const { projectId } = req.params;
        const userId = req.id;

        try {
            const project = await prismaClient.project.findUnique({
                where: { id: parseInt(projectId) }
            });

            if (!project) {
                return res.status(404).json({ message: "Projeto não encontrado" });
            }

            if (project.userId !== userId) {
                return res.status(403).json({ message: "Você não tem permissão para adicionar tarefas a este projeto" });
            }

            const task = await prismaClient.task.create({
                data: {
                    description,
                    isComplete,
                    projectId: parseInt(projectId)
                },
            });

            res.status(201).json({ data: task });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Erro ao criar a atividade" });
        }
    }

    static async getTasks(req, res) {
        const { projectId } = req.params;
        const userId = req.id;

        try {
            const project = await prismaClient.project.findUnique({
                where: { id: parseInt(projectId) }
            });

            if (!project) {
                return res.status(404).json({ message: "Projeto não encontrado" });
            }
            if (project.userId !== userId) {
                return res.status(403).json({ message: "Você não tem permissão para ver estas tarefas" });
            }

            const tasks = await prismaClient.task.findMany({
                where: {
                    projectId: parseInt(projectId)
                }
            });

            res.status(200).json({ data: tasks });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao buscar atividades" });
        }
    }

    static async getTaskById(req, res) {
        const { id } = req.params;
        const userId = req.id;

        try {
            const task = await prismaClient.task.findUnique({
                where: { id: parseInt(id) },
                include: {
                    project: true
                }
            });

            if (!task) {
                return res.status(404).json({ message: "Atividade não encontrada" });
            }

            if (task.project.userId !== userId) {
                return res.status(403).json({ message: "Você não tem permissão para ver esta atividade" });
            }

            res.status(200).json({ data: task });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro ao buscar atividade" });
        }
    }

    static async updateTask(req, res) {
        const { id } = req.params;
        const { description, isComplete } = req.body;
        const userId = req.id;

        try {
            const task = await prismaClient.task.findUnique({
                where: { id: parseInt(id) },
                include: {
                    project: true
                }
            });

            if (!task) {
                return res.status(404).json({ message: "Atividade não encontrada" });
            }

            if (task.project.userId !== userId) {
                return res.status(403).json({ message: "Você não tem permissão para atualizar essa atividade" });
            }

            const updatedTask = await prismaClient.task.update({
                where: { id: parseInt(id) },
                data: { description, isComplete },
            });

            res.status(200).json({ data: updatedTask });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Erro ao atualizar atividade" });
        }
    }

    static async deleteTask(req, res) {
        const { id } = req.params;
        const userId = req.id;

        try {
            const task = await prismaClient.task.findUnique({
                where: { id: parseInt(id) },
                include: {
                    project: true
                }
            });

            if (!task) {
                return res.status(404).json({ message: "Atividade não encontrada" });
            }

            if (task.project.userId !== userId) {
                return res.status(403).json({ message: "Você não tem permissão para deletar essa atividae" });
            }

            await prismaClient.task.delete({
                where: { id: parseInt(id) },
            });

            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Erro ao deletar atividade" });
        }
    }
}

export default TaskController;