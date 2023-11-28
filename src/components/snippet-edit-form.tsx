"use client";
import * as actions from "@/actons";
import { Editor } from "@monaco-editor/react";
import type { Snippet } from "@prisma/client";
import { useState } from "react";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);

  const handleOnCodeChange = (value: string = "") => {
    setCode(value);
  };

  const editSnippet = actions.updateSnippet.bind(null, snippet.id, code);

  return (
    <div className="mt-8">
      <Editor
        height="40vh"
        theme="vs-dark"
        language="typescript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleOnCodeChange}
      />
      <form action={editSnippet}>
        <button type="submit" className="rounded-md p-2 bg-blue-200 mt-2">
          Save
        </button>
      </form>
    </div>
  );
}
