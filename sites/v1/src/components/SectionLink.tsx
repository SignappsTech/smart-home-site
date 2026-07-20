import Link from "next/link";
import { ArrowRight } from "@/components/icons";

/** A subtle "see more →" text link used under homepage teaser sections. */
export function SectionLink({ label, href }: { label: string; href: string }) {
  return (
    <div className="mt-10 text-center">
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-medium text-brand-300 transition-colors hover:text-brand-200"
      >
        {label} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
