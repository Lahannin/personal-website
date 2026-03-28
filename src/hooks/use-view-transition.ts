import { useCallback } from "react";
import { useNavigate, type NavigateOptions } from "react-router-dom";

/**
 * Wraps `useNavigate` with the View Transitions API when supported.
 * Falls back to a regular navigation in unsupported browsers.
 */
export function useViewTransitionNavigate() {
  const navigate = useNavigate();

  return useCallback(
    (to: string, options?: NavigateOptions) => {
      if (document.startViewTransition) {
        document.startViewTransition(() => {
          navigate(to, options);
        });
      } else {
        navigate(to, options);
      }
    },
    [navigate],
  );
}
