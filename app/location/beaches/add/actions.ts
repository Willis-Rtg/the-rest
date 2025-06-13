"use server";

import { z } from "zod";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

const beachSchema = z.object({
  files: z.array(z.instanceof(File)).min(2),
  payload: z.string(),
});

export async function uploadBeach(_: any, formData: FormData) {
  const data = {
    files: formData.getAll("files"),
    payload: formData.get("payload"),
  };
  if (!data)
    return {
      errors: { fieldError: "Data maybe is null" },
    };
  const validData = await beachSchema.safeParse(data);
  if (!validData.success) {
    return {
      errors: { fieldError: "It's valid error." },
    };
  }
  const session = await getSession();
  const beach = await db.beach.create({
    data: { payload: validData.data.payload, userId: session.id! },
  });
  if (validData.data.files.length > 1) {
    for (let [index, file] of validData.data.files.entries()) {
      const beachFormData = new FormData();
      beachFormData.append("file", file);
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          },
          body: beachFormData,
        }
      );
      console.log(response);
      const responseJson = await response.json();
      if (!responseJson.success) {
        return {
          errors: { fieldError: " upload error." },
        };
      }
      console.log(responseJson);
      const result = responseJson.result;
      const newFile = await db.file.create({
        data: {
          filename: result.filename,
          type: "photo",
          index,
          storageId: result.id,
          url: result.variants[0],
          beachId: beach.id,
        },
      });
      console.log(newFile);
      if (!newFile)
        return {
          errors: {
            fieldError: "File upload on DB eeror.",
          },
        };
    }
    revalidateTag("beaches");
    redirect("/location/beaches");
  }
}
