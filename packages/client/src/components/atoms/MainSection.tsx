function MainSection({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col min-h-dvh dark:bg-[#0c1b2a] bg-white py-5 relative w-full">
      {children}
    </main>
  );
}

export default MainSection;
