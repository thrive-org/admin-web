const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col items-start gap-2 w-full">
    <h3 className="font-degular font-semibold text-[24px] leading-none tracking-[-0.03em] text-black">
      {title}
    </h3>
    <div className="flex flex-col gap-2 w-full">{children}</div>
  </div>
);

export default Section;