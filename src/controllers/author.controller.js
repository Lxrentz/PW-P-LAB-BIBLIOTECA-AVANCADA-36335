import { 
  getAllAuthors as getAllAuthorsService, 
  getAuthorById as getAuthorByIdService, 
  createAuthor as createAuthorService, 
  updateAuthor as updateAuthorService, 
  deleteAuthor as deleteAuthorService, 
  getBooksByAuthorId as getBooksByAuthorIdService, 
  getTopAuthors as getTopAuthorsService 
} from "../services/author.service.js";

export const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await getAllAuthorsService();
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

export const getAuthorById = async (req, res, next) => {
  try {
    const author = await getAuthorByIdService(req.params.id);
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

export const createAuthor = async (req, res, next) => {
  try {
    const author = await createAuthorService(req.body);
    res.status(201).json(author);
  } catch (error) {
    next(error);
  }
};

export const updateAuthor = async (req, res, next) => {
  try {
    const author = await updateAuthorService(req.params.id, req.body);
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

export const deleteAuthor = async (req, res, next) => {
  try {
    await deleteAuthorService(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getBooksByAuthorId = async (req, res, next) => {
  try {
    const books = await getBooksByAuthorIdService(req.params.id);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const getTopAuthors = async (req, res, next) => {
  try {
    const authors = await getTopAuthorsService();
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};