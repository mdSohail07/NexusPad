"use client";

import { useState } from "react";
import { AppHeader } from "@/components/dashboard/app-header";
import { DocumentGrid } from "@/components/dashboard/document-grid";

type DashboardViewProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export function DashboardView({ name, email, image }: DashboardViewProps) {
  const [query, setQuery] = useState("");

  return (
    <>
      <AppHeader
        name={name}
        email={email}
        image={image}
        searchQuery={query}
        onSearchQueryChange={setQuery}
      />
      <DocumentGrid searchQuery={query} />
    </>
  );
}
