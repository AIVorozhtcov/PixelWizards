export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full pt-12 md:pt-24 lg:pt-32 bg-[#0c1b2a]">
      <div className="w-full space-y-12 px-4 md:px-6">{children}</div>
    </section>
  );
}
