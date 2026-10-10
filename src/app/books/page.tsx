import { Container } from "@/components/container";
import { MediaCoverGrid } from "@/components/media-cover-grid";
import { books } from "@/config/books";
import { createPageMetadata, pageTitle } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: pageTitle("Books"),
  description:
    "Books I've enjoyed, lessons I've learned, and ideas that have stayed with me.",
  path: "/books",
});

export default function BooksPage() {
  return (
    <main className="pb-16 pt-8">
      <Container className="space-y-10">
        {/* Header */}
        <section>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Books<span className="text-muted-foreground">.</span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            A collection of books I like, books I want to read, and a few that
            caught my attention. Still figuring out what I enjoy reading the
            most.
          </p>
        </section>

        {/* Book Collection */}
        <section>
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              My Collection
            </h2>

            <span className="text-sm tabular-nums text-muted-foreground">
              {String(books.length).padStart(2, "0")} books
            </span>
          </div>

          <MediaCoverGrid items={books} getSubtitle={(book) => book.author} />
        </section>
      </Container>
    </main>
  );
}
