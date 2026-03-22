import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const bitcoinCursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><text y="18" font-size="18" fill="%23F7931A">₿</text></svg>') 12 12, pointer`;

const BitcoinWord = forwardRef<HTMLSpanElement, { children?: string }>(
  ({ children = "Bitcoin" }, ref) => {
    const navigate = useNavigate();

    return (
      <span
        ref={ref}
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          navigate("/secret");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigate("/secret");
          }
        }}
        style={{ cursor: bitcoinCursor }}
        className="relative inline-block transition-all duration-300 hover:text-[#F7931A] hover:[text-shadow:0_0_12px_rgba(247,147,26,0.5),0_0_24px_rgba(247,147,26,0.25)]"
      >
        {children}
      </span>
    );
  }
);

BitcoinWord.displayName = "BitcoinWord";

export default BitcoinWord;
