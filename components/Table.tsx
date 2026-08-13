type Props<T> = {
  labels: string[];
  lines: T[];
  renderRow: (item: T) => React.ReactNode[];
};

export function Table<T>({ labels, lines, renderRow }: Props<T>) {
  return (
    <table>
      <thead>
        <tr>
          {labels.map((label) => (
            <th key={label}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lines.map((item, index) => (
          <tr key={index}>
            {renderRow(item).map((cell, i) => (
              <td key={i}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
