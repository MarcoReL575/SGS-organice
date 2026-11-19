import z from "zod";
import { UserEditSchema } from "../schema/schemaUser";

export type UserEditInsert = z.infer<typeof UserEditSchema>;