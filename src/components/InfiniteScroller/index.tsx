import Box from "@mui/material/Box";
import { ReactNode, useEffect, useRef } from "react";

type InfiniteScrollerProps = {
  children: ReactNode;
  loadMore: () => void;
  hasMore: boolean;
};

export const InfiniteScroller = ({
  children,
  loadMore,
  hasMore,
}: InfiniteScrollerProps) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore) {
          loadMore();
        }
      },
      {
        threshold: 1,
      }
    );
    const currentContainerRef = containerRef.current;
    if (currentContainerRef) {
      observer.observe(currentContainerRef);
    }
    return () => {
      if (currentContainerRef) {
        observer.unobserve(currentContainerRef);
      }
    };
  }, [loadMore, containerRef, hasMore]);
  return (
    <Box>
      {children}
      <Box sx={{ height: "10px" }} ref={containerRef}></Box>
    </Box>
  );
};
