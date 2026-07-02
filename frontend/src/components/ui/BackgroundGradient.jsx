import { cn } from "../../lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("relative p-[4px] group inline-block", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: "400% 400%",
        }}
        className={cn(
          "absolute inset-0 rounded-full z-[1] opacity-60 group-hover:opacity-100 blur-xl  transition duration-500 will-change-transform",
          " bg-[radial-gradient(circle_farthest-side_at_0_100%,#6366F1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#A855F7,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#22D3EE,transparent),radial-gradient(circle_farthest-side_at_0_0,#F472B6,#141316)]"
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: "400% 400%",
        }}
        className={cn(
          "absolute inset-0 rounded-full z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#6366F1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#A855F7,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#22D3EE,transparent),radial-gradient(circle_farthest-side_at_0_0,#F472B6,#141316)]"
        )}
      />

      <div className={cn("relative z-10 rounded-full overflow-hidden bg-black flex items-center justify-center", className)}>
        {children}
      </div>
    </div>
  );
};
