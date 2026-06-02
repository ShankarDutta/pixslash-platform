import { ReactNode } from "react";
import z from "zod";
import { registerSchema } from "./zodSchema";

export type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export type RegisterSchemaType = z.infer<typeof registerSchema>;
