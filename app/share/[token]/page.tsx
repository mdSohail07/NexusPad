import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSharedDocument } from "@/app/actions/documents";
import { SharedDocumentView } from "@/components/editor/shared-document-view";

type SharedDocumentPageProps = {
  params: Promise<{ token: string }>;
};

export async function generateMetadata({
  params,
}: SharedDocumentPageProps): Promise<Metadata> {
  const { token } = await params;
  const document = await getSharedDocument(token);

  return {
    title: document?.title ?? "Shared document",
  };
}

export default async function SharedDocumentPage({
  params,
}: SharedDocumentPageProps) {
  const { token } = await params;
  const document = await getSharedDocument(token);

  if (!document) {
    notFound();
  }

  return <SharedDocumentView title={document.title} body={document.body} />;
}
