import { db } from "@/db";
import { notFound } from "next/navigation";

interface SnippetsViewPageProps {
  params?: { id: string };
  searchParams?: {};
}
export default async function SnippetViewPage(props: any) {
  // add an artificial delay
  await new Promise((r) => setTimeout(r, 2000));

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.id) },
  });

  if (!snippet) {
    return notFound();
  }
  console.log(snippet);

  return <div>{snippet.title}</div>;
}
