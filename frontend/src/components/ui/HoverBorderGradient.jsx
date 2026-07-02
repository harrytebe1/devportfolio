import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "span",
  duration = 3,
  clockwise = true,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState("TOP");

  const rotateDirection = (currentDirection) => {
    const directions = ["TOP", "RIGHT", "BOTTOM", "LEFT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap = {
    TOP: "radial-gradient(30% 50% at 50% 0%, var(--accent-secondary) 0%, transparent 100%)",
    LEFT: "radial-gradient(30% 50% at 0% 50%, var(--accent-primary) 0%, transparent 100%)",
    BOTTOM: "radial-gradient(30% 50% at 50% 100%, var(--accent-secondary) 0%, transparent 100%)",
    RIGHT: "radial-gradient(30% 50% at 100% 50%, var(--accent-primary) 0%, transparent 100%)",
  };

  const highlight = "radial-gradient(100% 100% at 50% 50%, var(--accent-primary) 0%, transparent 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, (duration * 1000) / 4);
      return () => clearInterval(interval);
    }
  }, [hovered, duration]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative inline-flex items-center justify-center overflow-visible",
        "bg-transparent rounded-full",
        containerClassName
      )}
      {...props}
    >
      <div className={cn("relative z-10 w-full h-full", className)}>{children}</div>
      <motion.div
        className="absolute inset-0 z-0 overflow-hidden rounded-full pointer-events-none"
        style={{
          padding: "1px", // the border thickness
        }}
        initial={{ background: "transparent" }}
        animate={{
          background: hovered ? highlight : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration / 4 }}
      >
        <div className="w-full h-full rounded-full bg-[var(--bg-surface-elevated)]" />
      </motion.div>
    </Tag>
  );
}
