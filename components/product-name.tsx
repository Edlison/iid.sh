function joinClasses(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ProductName({
  name,
  className,
  prefixClassName,
  restClassName,
}: {
  name: string;
  className?: string;
  prefixClassName?: string;
  restClassName?: string;
}) {
  if (!name.startsWith("Sh")) {
    return <span className={className}>{name}</span>;
  }

  return (
    <span className={joinClasses("inline", className)} aria-label={name}>
      <span aria-hidden="true" className={joinClasses(prefixClassName)}>
        Sh
      </span>
      <span
        aria-hidden="true"
        style={{ fontFamily: "Georgia, Times New Roman, serif" }}
        className={joinClasses(restClassName)}
      >
        {name.slice(2)}
      </span>
    </span>
  );
}
