import { useState, useRef, useCallback } from 'react';

export function useInfiniteScroll<T>(page_size: number, fetchFn: (page: number, size: number) => Promise<T[]>) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver>(null);

  const fetchItems = useCallback(async () => {
    if (isLoading || !hasMore) return;
      
    setIsLoading(true);
    try {
      const newItems = await fetchFn(page, page_size);
      setItems(prev => [...prev, ...newItems]);
      setHasMore(newItems.length > 0);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore, fetchFn]);

  const lastItemRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          fetchItems();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isLoading, hasMore, fetchItems]
  );

  return { items, isLoading, hasMore, lastItemRef };
}