const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-[#ffc107]">
      {children}
    </h1>
  );
};

export default Title;
