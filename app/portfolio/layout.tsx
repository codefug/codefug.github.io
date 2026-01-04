export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose dark:prose-invert mx-auto px-4 py-8">{children}</div>
  );
}
