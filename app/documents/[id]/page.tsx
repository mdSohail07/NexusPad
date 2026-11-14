import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getDocument } from "@/app/actions/documents";
import { DocumentRoom } from "@/components/editor/document-room";

type DocumentPageProps = {
  params: Promise<{ id: string }>;
};

export default async function DocumentPage({ params }: DocumentPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!process.env.LIVEBLOCKS_SECRET_KEY?.trim()) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#f9fbfd] px-6">
        <div className="max-w-md rounded-lg border border-docs-border bg-white p-6 text-[#202124] shadow-sm">
          <h1 className="text-lg font-medium">Liveblocks key needed</h1>
          <p className="mt-2 text-sm leading-6 text-docs-muted">
            Add <code className="rounded bg-black/[0.06] px-1">LIVEBLOCKS_SECRET_KEY</code> from
            the Liveblocks dashboard to your <code className="rounded bg-black/[0.06] px-1">.env</code>{" "}
            file, then restart the dev server.
          </p>
        </div>
      </div>
    );
  }

  const { id } = await params;
  const document = await getDocument(id);

  if (!document) {
    notFound();
  }

  return (
    <DocumentRoom
      documentId={document.id}
      title={document.title}
      body={document.body}
      name={session.user.name}
      email={session.user.email}
      image={session.user.image}
    />
  );
}
