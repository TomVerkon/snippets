"use client";
import * as actions from "@/actons";
import { Editor } from "@monaco-editor/react";
import type { Snippet } from "@prisma/client";
import { useState } from "react";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [title, setTitle] = useState(snippet.title);
  const [code, setCode] = useState(snippet.code);

  const handleOnCodeChange = (value: string = "") => {
    setCode(value);
  };

  const handleOnTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const editSnippet = actions.updateSnippet.bind(null, snippet.id, title, code);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <label className="w-12" htmlFor="title">
          Title
        </label>
        <input
          name="title"
          className="border rounded-md p-2 w-full"
          id="title"
          value={title}
          onChange={handleOnTitleChange}
        />
      </div>
      <div className="flex gap-4">
        <label className="w-12" htmlFor="code">
          Code
        </label>
        <Editor
          height="40vh"
          theme="vs-dark"
          language="typescript"
          defaultValue={snippet.code}
          options={{ minimap: { enabled: false } }}
          onChange={handleOnCodeChange}
        />
      </div>
      <form action={editSnippet}>
        <button type="submit" className="rounded-md p-2 bg-blue-200">
          Save
        </button>
      </form>
    </div>
  );
}
