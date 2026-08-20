type Props<T> = {
  labels: string[];
  lines: T[];
  renderRow: (item: T) => React.ReactNode[];
  className?: string;
};

export function Table<T>({ labels, lines, renderRow, className }: Props<T>) {
  return (
    <div className={`${className ?? "max-h-[70vh]"} overflow-x-auto overflow-y-auto rounded-lg border border-border bg-card`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="sticky top-0 z-10 border-b border-border bg-card">
            {labels.map((label) => (
              <th
                key={label}
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {lines.map((item, index) => (
            <tr key={index} className="transition-colors hover:bg-muted/50">
              {renderRow(item).map((cell, i) => (
                <td key={i} className="px-4 py-3 text-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
