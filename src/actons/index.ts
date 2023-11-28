"use server";

import { db } from "@/db";
import { redirect } from "next/navigation";

export async function updateSnippet(id: number, title: string, code: string) {
  console.log("title:", title, "code:", code);
  const snippet = await db.snippet.update({
    where: {
      id,
    },
    data: {
      title,
      code,
    },
  });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  const deletedSnippet = await db.snippet.delete({
    where: {
      id,
    },
  });

  redirect(`/`);
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    // Check users input for validity
    let title = formData.get("title") as string;
    let code = formData.get("code") as string;
    if (typeof title !== "string" || title.length < 3) {
      return { message: "Title must be at least 3 characters long" };
    }
    if (typeof code !== "string" || code.length < 10) {
      return { message: "Code must be at least 10 characters long" };
    }

    // Create a new record in the database
    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { message: err.message };
    } else {
      return { message: "An unknown error occured" };
    }
  }

  // Redirect user back to home page
  redirect("/");
}
