export function ContactSection({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section
      id="contact"
      className={`${className} px-5 py-12 md:px-8 md:py-20`}
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid max-w-[1280px] gap-8 rounded-[8px] border border-[var(--hairline)] bg-[var(--surface-solid)] p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
        <div>
          <h1
            id="contact-heading"
            className="text-[42px] font-semibold leading-[1.05] text-[var(--text)] md:text-[64px]"
          >
            Contact
          </h1>
          <p className="mt-5 max-w-[680px] text-[18px] leading-[1.55] text-[var(--text-secondary)]">
            For product, partnership, or ecosystem conversations.
          </p>
        </div>
        <a
          href="mailto:hi@iid.sh"
          className="text-[18px] font-semibold leading-tight text-[var(--text)] no-underline transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] md:text-[22px]"
        >
          hi@iid.sh
        </a>
      </div>
    </section>
  );
}
