import Link from "next/link";
import GitHubActivity from "@/components/ui/github-activity";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/config/meta";

export async function GitHubContributions() {
  return (
    <Container>
      <SectionHeading title="GitHub Activity" uppercase className="ml-2" />

      <div className="mt-4 w-full">
        <GitHubActivity
          username="coder-nik200"
          accent={["#9be9a8", "#40c463", "#30a14e", "#216e39"]}
          showMonths={true}
          months={12}
        />
      </div>

      <Link
        href={`https://github.com/${siteConfig.githubUsername}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 ml-2 inline-block text-[11px] text-secondary transition-colors hover:text-foreground"
      >
        @{siteConfig.githubUsername}
      </Link>
    </Container>
  );
}
