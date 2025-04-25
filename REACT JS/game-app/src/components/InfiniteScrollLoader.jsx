import { useEffect, useRef, useState } from "react";

export default function InfiniteScrollLoader({ setPage }) {
  const loaderRef = useRef();
  const isFetching = useRef();

  useEffect(() => {
    const observe = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching.current) {
         isFetching.current = true;
          setPage((prev) => prev + 1);

          setTimeout(()=> {
             isFetching.current = false
          }, 2000)
        }
      },
      {
        threshold: 1,
      }
    );

    if (loaderRef.current) observe.observe(loaderRef.current);

    return () => loaderRef.current && observe.unobserve(loaderRef.current);
  }, [setPage]);

  return <div className=" spinner-border text-primary" ref={loaderRef} role="status"></div>;
}
