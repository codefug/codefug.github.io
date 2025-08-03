export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose mx-auto px-4 py-8 dark:prose-invert">{children}</div>
  );
}
