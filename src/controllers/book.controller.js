import {
  getAllBooks as getAllBooksService,
  getBookById as getBookByIdService,
  createBook as createBookService,
  updateBook as updateBookService,
  deleteBook as deleteBookService,
  searchBooksByTitle as searchBooksByTitleService,
} from "../services/book.service.js";

export const getAllBooks = async (req, res, next) => {
  try {
    const books = await getAllBooksService(req.query);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const book = await getBookByIdService(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const createBook = async (req, res, next) => {
  try {
    const book = await createBookService(req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const book = await updateBookService(req.params.id, req.body);
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    await deleteBookService(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const searchBooksByTitle = async (req, res, next) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res.status(400).json({
        message: "O parâmetro 'title' é obrigatório",
      });
    }
    const books = await searchBooksByTitleService(title);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};