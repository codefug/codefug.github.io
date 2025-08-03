export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="prose mx-auto dark:prose-invert">{children}</div>;
}
