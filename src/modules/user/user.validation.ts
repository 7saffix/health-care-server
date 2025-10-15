import z from "zod";

export const createPatientZodSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().nonempty("Email is required"),
  password: z.string().nonempty("password is required"),
});
