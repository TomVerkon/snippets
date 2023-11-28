import * as actions from "@/actons";
import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SnippetViewPageProps {
  params: { id: string };
}
export default async function SnippetViewPage(props: SnippetViewPageProps) {
  // add an artificial delay
  // await new Promise((r) => setTimeout(r, 2000));

  const id = parseInt(props.params.id);
  const snippet = await db.snippet.findFirst({ where: { id } });
  const deleteSnippetById = actions.deleteSnippet.bind(null, id);
  // function deleteSnippetById() {
  //   actions.deleteSnippet(id);
  // }

  if (!snippet) {
    return notFound();
  }
  console.log(snippet);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <form action={deleteSnippetById}>
            <button className="p-2 border rounded w-20 border-gray-300 text-center">
              Delete
            </button>
          </form>
          <Link
            href={`/snippets/${id}/edit`}
            className="p-2 border rounded bg-gray-200 border-gray-300 w-20 text-center"
          >
            Edit
          </Link>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-300">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}
