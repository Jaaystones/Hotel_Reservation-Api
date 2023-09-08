import express from "express";
import {
  createSuite,
  deleteSuite,
  getSuite,
  getSuites,
  updateSuite,
  updateSuiteAvailability,
} from "../controllers/suite.js";
import { verifyAdmin } from "../utility/tokenVerification.js";

const router = express.Router();
//CREATE
router.post("/:hotelid", verifyAdmin, createSuite);

//UPDATE
router.put("/availability/:id", updateSuiteAvailability);
router.put("/:id", verifyAdmin, updateSuite);
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteSuite);
//GET

router.get("/:id", getSuite);
//GET ALL

router.get("/", getSuites);

export default router;
