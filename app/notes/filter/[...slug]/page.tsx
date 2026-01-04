import type { Metadata } from "next";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/notes";
import NotesClient from "./Notes.client";
import type { Note } from "@/types/note";

const PER_PAGE = 12;

const SITE_URL = "https://notehub.app";
const OG_IMAGE = "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

const TAG_TITLES: Record<string, string> = {
  all: "All notes",
  todo: "Todo",
  work: "Work",
  personal: "Personal",
  meeting: "Meeting",
  shopping: "Shopping",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const raw = slug?.[0] ?? "all";

  const tagTitle = TAG_TITLES[raw] ?? raw;

  const title = `NoteHub | ${tagTitle}`;
  const description = `Notes filtered by: ${tagTitle}`;
  const url = `${SITE_URL}/notes/filter/${raw}`;

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

export default async function NotesByTagPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;

  const raw = slug?.[0] ?? "all";

  const selectedTag: Note["tag"] | undefined =
    raw === "all" ? undefined : (raw as Note["tag"]);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", selectedTag ?? "all"],
    queryFn: () => fetchNotes(1, PER_PAGE, "", selectedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={raw} />
    </HydrationBoundary>
  );
}
