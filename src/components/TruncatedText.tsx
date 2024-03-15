import React, { useState, useEffect, useRef } from "react";

interface TruncatedTextProps {
  text: string;
  className?: string; // Allow custom styles to be passed
}

export const TruncatedText: React.FC<TruncatedTextProps> = ({
  text,
  className,
}) => {
  const [displayedText, setDisplayedText] = useState(text);
  const containerRef = useRef<HTMLDivElement>(null);

  const truncateTextToFit = () => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const availableWidth = container.offsetWidth;
    const context = document.createElement("canvas").getContext("2d");
    const font = window.getComputedStyle(container).font;
    if (context) {
      context.font = font;
      if (context.measureText(text).width <= availableWidth) {
        setDisplayedText(text);
        return;
      }

      let low = 0,
        high = text.length,
        mid;
      while (low < high) {
        mid = Math.floor((low + high) / 2);
        const currentText = text.substring(0, mid) + "...";
        if (context.measureText(currentText).width <= availableWidth) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }

      setDisplayedText(text.substring(0, low - 1) + "...");
    }
  };

  useEffect(() => {
    truncateTextToFit();
    // Optional: Re-check on window resize
    const handleResize = () => {
      truncateTextToFit();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [text]); // Dependency on `text` ensures re-checking when text changes

  return (
    <div
      ref={containerRef}
      className={`truncate-container ${className || ""}`}
      title={text}
    >
      {displayedText}
    </div>
  );
};
