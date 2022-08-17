import { useState, useEffect } from "react";

export default function useOffSetTop(top: number) {
  const [offsetTop, setOffSetTop] = useState(false);
  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > top) {
        setOffSetTop(true);
      } else {
        setOffSetTop(false);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, [top]);

  return offsetTop;
}
