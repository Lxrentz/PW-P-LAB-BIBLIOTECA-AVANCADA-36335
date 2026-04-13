import prisma from "../prisma/prismaClient.js";

export const getAllAuthors = async () => {
    return prisma.author.findMany({
        orderBy: {
            name: "asc",
        },
    });
};

export const getAuthorById = async (id) => {
    const author = await prisma.author.findUnique({
        where: { id },
        include: {
            books: true,
        },
    });

    if (!author) {
        const error = new Error("Autor não encontrado");
        error.statusCode = 404;
        throw error;
    }

    return author;
};

export const createAuthor = async (data) => {
    const { name, nationality, birthYear } = data;

    if (!name) {
        const error = new Error("O campo 'name' é obrigatório");
        error.statusCode = 400;
        throw error;
    }

    return prisma.author.create({
        data: {
            name,
            nationality,
            birthYear,
        },
    });
};

export const updateAuthor = async (id, data) => {
    const { name, nationality, birthYear } = data;

    const existingAuthor = await prisma.author.findUnique({
        where: { id },
    });

    if (!existingAuthor) {
        const error = new Error("Autor não encontrado");
        error.statusCode = 404;
        throw error;
    }

    if (!name) {
        const error = new Error("O campo 'name' é obrigatório");
        error.statusCode = 400;
        throw error;
    }

    return prisma.author.update({
        where: { id },
        data: {
            name,
            nationality,
            birthYear,
        },
    });
};

export const deleteAuthor = async (id) => {
    const existingAuthor = await prisma.author.findUnique({
        where: { id },
        include: {
            books: true,
        },
    });

    if (!existingAuthor) {
        const error = new Error("Autor não encontrado");
        error.statusCode = 404;
        throw error;
    }

    if (existingAuthor.books.length > 0) {
        const error = new Error("Não é possível apagar um autor com livros associados");
        error.statusCode = 409;
        throw error;
    }
    
    await prisma.author.delete({
        where: { id },
    });
};

export const getBooksByAuthorId = async (id) => {
    const author = await prisma.author.findUnique({
        where: { id },
    });

    if (!author) {
        const error = new Error("Autor não encontrado");
        error.statusCode = 404;
        throw error;
    }

    return prisma.book.findMany({
        where: { authorId: id },
        orderBy: {
            title: "asc",
        },
    });
};

export const getTopAuthors = async () => {
    const authors = await prisma.author.findMany({
        include: {
            books: true,
        },
    });
    
    return authors
        .map((author) => ({
            id: author.id,
            name: author.name,
            totalBooks: author.books.length,
        }))
        .sort((a, b) => b.totalBooks - a.totalBooks);
};