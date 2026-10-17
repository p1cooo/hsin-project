import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { Header } from "@/components/site/Header";
import { FloatingWhatsApp, Footer } from "@/components/site/Sections";
import { LangProvider } from "@/lib/i18n";

describe("site navigation and contact links", () => {
  beforeEach(() => window.localStorage.clear());

  it("points Contact to the footer and removes About Us from navigation", () => {
    render(
      <LangProvider>
        <Header />
        <Footer />
        <FloatingWhatsApp />
      </LangProvider>,
    );
    const mainNav = within(screen.getByRole("navigation", { name: "Main" }));
    expect(mainNav.getByRole("link", { name: "Contact" }).getAttribute("href")).toBe("#contact");
    expect(mainNav.queryByRole("link", { name: "About Us" })).toBeNull();
    expect(within(screen.getByRole("banner")).queryByRole("link", { name: /WhatsApp/ })).toBeNull();
    expect(document.querySelector("footer#contact")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Enquire Now" }).getAttribute("href")).toBe("#enquiry");
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const mobileNav = within(screen.getByRole("navigation", { name: "Mobile" }));
    expect(mobileNav.getByRole("link", { name: "Contact" }).getAttribute("href")).toBe("#contact");
    expect(mobileNav.getByRole("link", { name: "Enquire Now" }).getAttribute("href")).toBe(
      "#enquiry",
    );
  });

  it("uses the selected language in the floating WhatsApp greeting", () => {
    render(
      <LangProvider>
        <Header />
        <Footer />
        <FloatingWhatsApp />
      </LangProvider>,
    );
    const floating = screen
      .getByRole("link", { name: "Chat with Hsin Travel on WhatsApp" });
    expect(floating.classList.contains("fixed")).toBe(true);
    expect(floating.className).not.toMatch(/opacity-0|pointer-events-none|translate-y-4/);
    expect(new URL(floating.getAttribute("href")!).searchParams.get("text")).toContain(
      "Hello Hsin Travel! 👋",
    );
    fireEvent.scroll(window);
    expect(screen.getByRole("link", { name: "Chat with Hsin Travel on WhatsApp" })).toBe(floating);
    fireEvent.click(screen.getByRole("button", { name: "中文" }));
    const chinese = screen
      .getByRole("link", { name: "通过 WhatsApp 联系欣旅游" });
    expect(new URL(chinese.getAttribute("href")!).searchParams.get("text")).toContain(
      "你好，欣旅游！👋",
    );
  });
});
