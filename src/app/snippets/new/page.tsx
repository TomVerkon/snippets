"use client";
import * as actions from "@/actons";
import { useFormState } from "react-dom";

export default function SnippetCreatePage() {
  const [formState, action] = useFormState(actions.createSnippet, {
    message: "",
  });

  return (
    <form action={action}>
      <h3 className="font-bold m-3">Create a snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded-md p-2 w-full"
            id="title"
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded-md p-2 w-full"
            id="code"
          />
        </div>
        {formState.message ? (
          <div className="my-2 p-2 bg-red-100 border rounded border-red-200 text-red-700">
            {formState.message}
          </div>
        ) : null}

        <button
          type="submit"
          className=" p-2 bg-blue-200 text-blue-700 border rounded border-blue-300 shadow-lg shadow-blue-100"
        >
          Create
        </button>
      </div>
    </form>
  );
}
