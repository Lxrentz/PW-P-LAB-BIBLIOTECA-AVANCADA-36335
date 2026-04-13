import { Router } from "express";
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getBooksByAuthorId,
  getTopAuthors,
} from "../controllers/author.controller.js"; 

const router = Router();

router.get("/top", getTopAuthors);
router.get("/", getAllAuthors);
router.get("/:id/books", getBooksByAuthorId);
router.get("/:id", getAuthorById);
router.post("/", createAuthor);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;