import type { Metadata } from "next";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";

const SITE_URL = "https://notehub.app";
const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    const title = `NoteHub | ${note.title}`;
    const description = note.content ? note.content.slice(0, 120) : "Note details";
    const url = `${SITE_URL}/notes/${id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: [{ url: OG_IMAGE }],
      },
    };
  } catch {
    const title = "NoteHub | Note";
    const description = "Note details";
    const url = `${SITE_URL}/notes/${id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        images: [{ url: OG_IMAGE }],
      },
    };
  }
}

export default async function NoteDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
