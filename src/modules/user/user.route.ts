import { Router } from "express";
import { userController } from "./user.controller";
import { fileUploader } from "../../utils/fileUploader";
import validateRequest from "../../middlewares/validateRequest";
import { createPatientZodSchema } from "./user.validation";

const router = Router();

router.get("/", userController.getAll);

router.post(
  "/create-patient",
  fileUploader.upload.single("file"),
  validateRequest(createPatientZodSchema),
  userController.createPatient
);

export const userRoute = router;
