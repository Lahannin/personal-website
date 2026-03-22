import { useRef, useEffect } from "react";

export function useScrollLock(isLocked: boolean) {
  const isLockedRef = useRef(false);

  useEffect(() => {
    if (isLocked && !isLockedRef.current) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      isLockedRef.current = true;
    } else if (!isLocked && isLockedRef.current) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      isLockedRef.current = false;
    }

    return () => {
      if (isLockedRef.current) {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
        isLockedRef.current = false;
      }
    };
  }, [isLocked]);
}
