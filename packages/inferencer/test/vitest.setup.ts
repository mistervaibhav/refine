import "@testing-library/jest-dom/vitest";
import "@testing-library/react";
import { TextEncoder, TextDecoder } from "util";

import { vi } from "vitest";

/** Antd mocks */
window.matchMedia = vi.fn().mockImplementation((query) => {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  };
});

window.scroll = vi.fn();
window.alert = vi.fn();

// Improved TextEncoder/TextDecoder setup
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}

class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

window.ResizeObserver = ResizeObserver;

const defaultLocale = "en-US";

const originalNumberToLocaleString = Number.prototype.toLocaleString;
Number.prototype.toLocaleString = function (
  locales?: Intl.LocalesArgument,
  options?: Intl.NumberFormatOptions,
) {
  return originalNumberToLocaleString.call(
    this,
    locales ?? defaultLocale,
    options,
  );
};

const originalDateToLocaleString = Date.prototype.toLocaleString;
Date.prototype.toLocaleString = function (
  locales?: Intl.LocalesArgument,
  options?: Intl.DateTimeFormatOptions,
) {
  return originalDateToLocaleString.call(
    this,
    locales ?? defaultLocale,
    options,
  );
};

const originalGetComputedStyle = window.getComputedStyle;
const computedStyleFallback = {
  width: "0px",
  height: "0px",
  scrollbarColor: "",
  scrollbarWidth: "",
  getPropertyValue: () => "",
} as unknown as CSSStyleDeclaration;

window.getComputedStyle = ((elt: Element, pseudoElt?: string) => {
  if (pseudoElt) {
    return computedStyleFallback;
  }

  return originalGetComputedStyle
    ? originalGetComputedStyle(elt)
    : computedStyleFallback;
}) as typeof window.getComputedStyle;
