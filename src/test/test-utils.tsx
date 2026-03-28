import { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter, type MemoryRouterProps } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";

interface ProviderOptions {
  routerProps?: MemoryRouterProps;
}

function createWrapper(providerOptions?: ProviderOptions) {
  return function AllProviders({ children }: { children: React.ReactNode }) {
    return (
      <LazyMotion features={domAnimation}>
        <MemoryRouter {...providerOptions?.routerProps}>{children}</MemoryRouter>
      </LazyMotion>
    );
  };
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & { providerOptions?: ProviderOptions },
) {
  const { providerOptions, ...renderOptions } = options ?? {};
  return render(ui, { wrapper: createWrapper(providerOptions), ...renderOptions });
}

export * from "@testing-library/react";
export { renderWithProviders as renderApp };
