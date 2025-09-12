type FieldRowProps = {
  label: string;
  value: React.ReactNode;
  valueHref?: string;
  type: "text" | "document" | "link";
};

const FieldRow = ({ label, value, valueHref, type }: FieldRowProps) => (
  <div className="flex justify-between items-center w-full rounded-lg bg-[#F6F6F6] px-4 py-2 gap-2">
    {/* label: fixed left */}
    <span className="shrink-0 font-[400] font-[Poppins] text-[16px] leading-none tracking-[-0.03em] text-[#4E4E4E]">
      {label}
    </span>

    {/* value: right aligned */}
    <div className="text-right min-w-0 max-w-[75%]">
      {type === "link" ? (
        <a
          href={valueHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-[400] font-[Poppins] text-[16px] leading-none tracking-[-0.03em] text-[#000080] underline"
        >
          {value as string}
        </a>
      ) : type === "document" ? (
        <div className="flex items-center gap-2 justify-end w-full">
          <button className="font-[400] font-[Poppins] text-[16px] leading-none tracking-[-0.03em] text-[#4E4E4E] underline">
            Preview
          </button>

          <button className="font-[400] font-[Poppins] text-[16px] leading-none tracking-[-0.03em] text-[#000080] underline">
            Download
          </button>
        </div>
      ) : (
        <span className="font-[400] font-[Poppins] text-[16px] leading-none tracking-[-0.03em] text-[#000080]">
          {value ?? "-"}
        </span>
      )}
    </div>
  </div>
);

export default FieldRow;
