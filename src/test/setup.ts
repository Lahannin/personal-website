import "@testing-library/jest-dom";

// --- matchMedia mock ---
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// --- IntersectionObserver mock ---
type IOCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;

interface MockIOInstance {
  callback: IOCallback;
  elements: Set<Element>;
  disconnect: ReturnType<typeof vi.fn>;
  observe: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
  trigger: (isIntersecting?: boolean) => void;
}

// Global list so tests can access observer instances
declare global {
  // eslint-disable-next-line no-var
  var __intersectionObserverInstances: MockIOInstance[];
}
globalThis.__intersectionObserverInstances = [];

class MockIntersectionObserver {
  private instance: MockIOInstance;

  constructor(callback: IOCallback, _options?: IntersectionObserverInit) {
    this.instance = {
      callback,
      elements: new Set(),
      disconnect: vi.fn(() => {
        this.instance.elements.clear();
      }),
      observe: vi.fn((el: Element) => {
        this.instance.elements.add(el);
      }),
      unobserve: vi.fn((el: Element) => {
        this.instance.elements.delete(el);
      }),
      trigger: (isIntersecting = true) => {
        const entries = Array.from(this.instance.elements).map((target) => ({
          isIntersecting,
          target,
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRatio: isIntersecting ? 1 : 0,
        }));
        if (entries.length > 0) callback(entries);
      },
    };
    globalThis.__intersectionObserverInstances.push(this.instance);
  }

  observe(el: Element) { this.instance.observe(el); }
  unobserve(el: Element) { this.instance.unobserve(el); }
  disconnect() { this.instance.disconnect(); }
  takeRecords() { return []; }
}

globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

// --- ResizeObserver mock ---
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver;

// --- scrollTo mock ---
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;

// --- localStorage / sessionStorage polyfill for jsdom ---
function createStorageMock(): Storage {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = String(value); }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
    get length() { return Object.keys(store).length; },
    key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
  };
}

Object.defineProperty(window, "localStorage", { value: createStorageMock(), writable: true });
Object.defineProperty(window, "sessionStorage", { value: createStorageMock(), writable: true });

// --- Cleanup between tests ---
afterEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  document.documentElement.classList.remove("dark");
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.touchAction = "";
  globalThis.__intersectionObserverInstances = [];
});
