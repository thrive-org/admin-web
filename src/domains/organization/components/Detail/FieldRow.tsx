const FieldRow = ({
  label,
  value,
  valueHref,
}: { label: string; value: React.ReactNode; valueHref?: string }) => (
  <div className="flex justify-between items-center w-full h-[39px] rounded-lg bg-[#F6F6F6] px-4 py-1 gap-2">
    {/* label: fixed left */}
    <span className="shrink-0 font-[400] font-[Poppins] text-[16px] leading-none tracking-[-0.03em] text-[#4E4E4E]">
      {label}
    </span>

    {/* value: right aligned */}
    <div className="text-right min-w-0">
      {valueHref ? (
        <a
          href={valueHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-[400] font-[Poppins] text-[16px] leading-none tracking-[-0.03em] text-[#000080] underline"
        >
          {value as string}
        </a>
      ) : (
        <span className="font-[400] font-[Poppins] text-[16px] leading-none tracking-[-0.03em] text-[#000080]">
          {value ?? "-"}
        </span>
      )}
    </div>
  </div>
);

export default FieldRow;