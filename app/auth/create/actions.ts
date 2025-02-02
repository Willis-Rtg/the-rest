"use server";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

const accountSchema = z.object({
  ID: z.string(),
  password: z.string(),
});

export default async function createAccount(
  prevState: any,
  formData: FormData
) {
  const data = {
    ID: formData.get("ID"),
    password: formData.get("password"),
  };

  const result = await accountSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const hasedPassword = await bcrypt.hash(result.data.password, 10);

  try {
    const newUser = await db.user.create({
      data: { ID: result.data.ID, password: hasedPassword },
    });
  } catch (e) {
    console.log(e);
  }
  redirect("/");
}
