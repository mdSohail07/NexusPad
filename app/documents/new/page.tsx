import { redirect } from "next/navigation";
import { createDocument } from "@/app/actions/documents";

export default async function NewDocumentPage() {
  const document = await createDocument();
  redirect(`/documents/${document.id}`);
}
