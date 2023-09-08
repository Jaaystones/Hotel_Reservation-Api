import express from "express";
import {
  createSuite,
  deleteSuite,
  getSuite,
  getRooms,
  updateSuite,
  updateSuiteAvailability,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

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

router.get("/", getSuite);

export default router;
