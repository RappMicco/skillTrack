import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ScrambleNumber = ({ value, suffix = "", digits = 2 }) => {
  const wrapperRef = useRef(null);
  const [display, setDisplay] = useState("0".padStart(digits, "0"));

  useEffect(() => {
    const el = wrapperRef.current;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          const counter = { val: 0 };

          tl.to(
            {},
            {
              duration: 0.05,
              repeat: 14,
              onRepeat: () => {
                const randomVal = Math.floor(
                  Math.random() * Math.pow(10, digits),
                );
                setDisplay(String(randomVal).padStart(digits, "0"));
              },
            },
          );

          tl.to(counter, {
            val: value,
            duration: 1.1,
            ease: "power2.out",
            onUpdate: () => {
              setDisplay(String(Math.floor(counter.val)).padStart(digits, "0"));
            },
          });
        },
      });
    }, el);

    return () => ctx.revert();
  }, [value, digits]);

  return (
    <span ref={wrapperRef} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
};
