import {
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
interface FullPageScrollProps {
  children: ReactNode[];
}

export default function FullPageScroll({
  children,
}: FullPageScrollProps) {

  const [current, setCurrent] = useState(0);

  const locked = useRef(false);

  const total = children.length;

  const goNext = () => {
    if (current >= total - 1) return;

    setCurrent((prev) => prev + 1);
  };

  const goPrevious = () => {
    if (current <= 0) return;

    setCurrent((prev) => prev - 1);
  };

  useEffect(() => {

    const handleWheel = (event: WheelEvent) => {

      event.preventDefault();

      if (locked.current) return;

      locked.current = true;

      if (event.deltaY > 0) {
        goNext();
      } else if (event.deltaY < 0) {
        goPrevious();
      }

      setTimeout(() => {
        locked.current = false;
      }, 700);
    };


    const handleKeyDown = (event: KeyboardEvent) => {

      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown"
      ) {
        event.preventDefault();

        if (!locked.current) {
          locked.current = true;
          goNext();

          setTimeout(() => {
            locked.current = false;
          }, 700);
        }
      }

      if (
        event.key === "ArrowUp" ||
        event.key === "PageUp"
      ) {
        event.preventDefault();

        if (!locked.current) {
          locked.current = true;
          goPrevious();

          setTimeout(() => {
            locked.current = false;
          }, 700);
        }
      }
    };


    window.addEventListener(
      "wheel",
      handleWheel,
      { passive: false }
    );

    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {

      window.removeEventListener(
        "wheel",
        handleWheel
      );

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, [current, total]);


  return (
    <div className="fixed inset-0 overflow-hidden">

      {children.map((child, index) => (

        <div
          key={index}
          className="absolute inset-0 transition-all duration-700 ease-in-out"
          style={{
            opacity: index === current ? 1 : 0,
            pointerEvents:
              index === current
                ? "auto"
                : "none",
          }}
        >
          {child}
        </div>

      ))}

    </div>
  );
}