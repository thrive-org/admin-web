// components/RequestInfoModal.tsx
import React, { useEffect, useId, useRef, useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (text: string) => void;
    title?: string;                 // default: "Request More Info"
    placeholder?: string;           // default: "Type here"
    maxLength?: number;             // default: 200
    initialValue?: string;          // optional prefill
};

export default function RequestInfoModal({
    open,
    onClose,
    onSubmit,
    title = "Request More Info",
    placeholder = "Type here",
    maxLength = 200,
    initialValue = "",
}: Props) {
    const [value, setValue] = useState(initialValue);
    const titleId = useId();
    const panelRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", onKey);
        const t = setTimeout(() => textRef.current?.focus(), 0);
        return () => { document.removeEventListener("keydown", onKey); clearTimeout(t); };
    }, [open, onClose]);

    // Close on backdrop click
    const onBackdrop = (e: React.MouseEvent) => {
        if (panelRef.current && !panelRef.current.contains(e.target as Node)) onClose();
    };

    if (!open) return null;

    const remaining = Math.max(0, maxLength - value.length);
    const canSend = value.trim().length > 0 && value.length <= maxLength;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onMouseDown={onBackdrop}
        >
            <div
                ref={panelRef}
                className="relative w-full max-w-[769px] rounded-[43px] bg-white p-[37px] md:px-[40px] md:py-[37px]"
                style={{ boxShadow: "0px 4px 134.6px 0px #00000030" }}
                onMouseDown={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    aria-label="Close"
                    onClick={onClose}
                    className="absolute right-4 top-4 grid h-[32px] w-[32px] place-items-center rounded-full bg-[#000093] focus:outline-none focus:ring-2 focus:ring-[#000093]/40"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" className="text-white">
                        <path fill="currentColor" d="M18.3 5.7a1 1 0 0 0-1.4-1.4L12 9.17 7.1 4.3A1 1 0 0 0 5.7 5.7L10.6 10.6 5.7 15.5a1 1 0 1 0 1.4 1.4L12 12.03l4.9 4.87a1 1 0 0 0 1.4-1.4l-4.9-4.87 4.9-4.93Z" />
                    </svg>
                </button>

                {/* Title */}
                <h2
                    id={titleId}
                    className="font-[600] text-[35.39px] leading-[1] tracking-[-0.03em] text-[#000093] font-degular"
                >
                    {title}
                </h2>

                {/* Label */}
                <label
                    htmlFor="request-text"
                    className="mt-5 block font-[500] text-[20px] leading-[1] tracking-[-0.03em] text-[#464646] font-poppins"
                >
                    Write Text Here
                </label>

                {/* Textarea */}
                <div className="mt-2">
                    <textarea
                        id="request-text"
                        ref={textRef}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        maxLength={maxLength * 3} // allow over-typing; we enforce count visually
                        className="h-[158px] w-full resize-none rounded-[20px] border border-[#F0F0F0] bg-[#F6F6F6] p-4 outline-none placeholder:font-[400] placeholder:text-[16px] placeholder:leading-[1] placeholder:tracking-[-0.03em] placeholder:text-[#A4A4A4] font-poppins"
                        placeholder={placeholder}
                    />
                    {/* Counter */}
                    <div className="mt-2 text-right font-inter text-[15.67px] tracking-[0.5%] text-[#554B4B]/80">
                        {Math.min(value.length, maxLength)}/{maxLength}
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex justify-end">
                    <button
                        type="button"
                        disabled={!canSend}
                        onClick={() => onSubmit(value.trim())}
                        className="h-[41px] rounded-[22.5px] bg-[#000080] px-6 text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50 font-poppins text-[15.75px] tracking-[-0.03em]"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
