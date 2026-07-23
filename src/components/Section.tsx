export default function Section({
  children,
  className = "",
  muted = false,
}: {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <section className={`${muted ? "bg-card" : ""} ${className}`}>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">{children}</div>
    </section>
  );
}
