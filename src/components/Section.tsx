type SectionProps = {
  title: string;
  children: React.ReactNode;
  isEditable?: boolean;
};

const Section = ({ title, children, isEditable }: SectionProps) => (
  <div className="flex flex-col items-start gap-2 w-full">
    <div className="flex items-center gap-2 justify-between w-full flex-row">
      <h3 className="font-degular font-semibold text-[24px] pb-4 leading-none tracking-[-0.03em] text-black flex items-center gap-2">
        {title}
      </h3>
      {isEditable && (
        <button className="font-poppins text-[16px] leading-none tracking-0 font-normal text-[#707070] px-4 py-2 rounded-full underline cursor-pointer">
          Edit
        </button>
      )}
    </div>
    <div className="flex flex-col gap-2 w-full">{children}</div>
  </div>
);

export default Section;
