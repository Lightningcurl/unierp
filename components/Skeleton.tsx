export function Skeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-4 w-3/5 bg-gray-200 rounded"></div>
      <div className="h-4 w-4/5 bg-gray-200 rounded"></div>
      <div className="h-4 w-2/5 bg-gray-200 rounded"></div>
    </div>
  );
}