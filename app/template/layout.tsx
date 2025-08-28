export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="size-full">
        {children}
    </section>
  );
}
