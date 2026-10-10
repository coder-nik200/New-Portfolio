const highlightClass = "font-medium text-teal-600 dark:text-cyan-400";

export function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <span key={index} className={highlightClass}>
              {part.slice(2, -2)}
            </span>
          );
        }
        return part;
      })}
    </>
  );
}
