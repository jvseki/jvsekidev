"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/** true enquanto o elemento tem qualquer pedaço visível na viewport. */
export function useInView<T extends HTMLElement>(): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true); // assume visível até o observer confirmar (evita flash)

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}
