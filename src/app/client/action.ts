"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createCatsAction(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const breed = formData.get("breed") as string;

    const spayed: boolean = formData.get("spayed") === "on" ? true : false;

    await db.cats.create({
      data: {
        name,
        breed,
        spayed,
      },
    });

    revalidatePath("/");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
