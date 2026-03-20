import { useEffect, useRef, useState } from 'react';

export const useElementHeight = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const observer = new ResizeObserver(() => {
      setHeight(el.getBoundingClientRect().height);
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return { ref, height };
};
