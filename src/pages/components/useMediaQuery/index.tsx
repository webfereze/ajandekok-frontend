import { useState, useEffect, useCallback } from 'react';

export default function useWindowDimensions() {
  const hasWindow = typeof window !== 'undefined';

  const getWindowDimensions = useCallback(() => {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    const isMobile = ((hasWindow && window.innerWidth < 768));
    return {
      width,
      height,
      isMobile,
    };
  }, [hasWindow]);

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);

  const handleResize = useCallback(() => {
    setWindowDimensions(getWindowDimensions());
  }, [getWindowDimensions]);

  useEffect(() => {
    if (hasWindow) {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
    return () => null;
  }, [hasWindow, getWindowDimensions, handleResize]);

  return windowDimensions;
}
