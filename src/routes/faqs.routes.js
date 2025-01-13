import express from "express";
import faqsController from "../controllers/faqs.controllers.js";
const router = express.Router();

router.get('/', faqsController.getFaqs);

export default router;
