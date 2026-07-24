/**
 * Brand logo: the Signapps SVG mark.
 */
export function Logo({ className = "h-8 w-auto" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/signapps_logo_long_dark_bluegrad_transparent.svg"
        alt="Signapps"
        className="h-full w-auto"
      />
    </span>
  );
}
