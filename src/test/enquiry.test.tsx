import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { Enquiry } from "@/components/site/Enquiry";
import { LangProvider, useLang } from "@/lib/i18n";
import { waGreeting, waLink } from "@/lib/site-config";

function LanguageSwitch() {
  const { setLang } = useLang();
  return <button onClick={() => setLang("zh")}>中文</button>;
}

const field = (id: string, value: string) =>
  fireEvent.change(document.getElementById(`f-${id}`)!, { target: { value } });

const preparedMessage = () => {
  const link = screen.getByRole("link", {
    name: /Send Enquiry via WhatsApp|通过 WhatsApp 发送咨询/,
  });
  const url = new URL(link.getAttribute("href")!);
  expect(url.origin + url.pathname).toBe("https://wa.me/60122975187");
  return url.searchParams.get("text")!;
};

describe("WhatsApp enquiries", () => {
  beforeEach(() => window.localStorage.clear());

  it("validates a tour enquiry and prepares only the supplied details", async () => {
    render(
      <LangProvider>
        <Enquiry preset={null} />
      </LangProvider>,
    );
    field("name", "Tan Mei Ling");
    fireEvent.click(screen.getByRole("button", { name: "Review WhatsApp Enquiry" }));
    expect(screen.getAllByText("This field is required.")).toHaveLength(2);
    expect((document.getElementById("f-name") as HTMLInputElement).value).toBe("Tan Mei Ling");

    field("contact", "012-345 6789");
    field("destination", "Penang");
    field("notes", "Family trip & food");
    fireEvent.click(screen.getByRole("button", { name: "Review WhatsApp Enquiry" }));
    await waitFor(() => expect(screen.getByText("Review your enquiry")).toBeTruthy());
    const message = preparedMessage();
    expect(message).toContain("*Tour Enquiry Details*");
    expect(message).toContain("Full Name: Tan Mei Ling");
    expect(message).toContain("Preferred Destination: Penang");
    expect(message).toContain("Additional Requests: Family trip & food");
    expect(message).not.toContain("Interested Tour Package:");
    expect(message).toContain("\n\n");
    expect(screen.getByText(/This message has not been sent yet/)).toBeTruthy();
  });

  it("prepares a localized transport enquiry and greeting", async () => {
    render(
      <LangProvider>
        <LanguageSwitch />
        <Enquiry preset={null} />
      </LangProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "中文" }));
    fireEvent.click(screen.getByRole("tab", { name: /包车与接送咨询/ }));
    field("name", "陈美玲");
    field("contact", "012-345 6789");
    field("service", "airport");
    field("pickup", "KLIA Terminal 1");
    field("dropoff", "吉隆坡");
    field("date", "2026-12-20");
    field("passengers", "6");
    fireEvent.click(screen.getByRole("button", { name: "确认 WhatsApp 咨询信息" }));
    await waitFor(() => expect(screen.getByText("请确认您的咨询信息")).toBeTruthy());
    const message = preparedMessage();
    expect(message).toContain("*包车与接送咨询详情*");
    expect(message).toContain("服务类型: 机场接送");
    expect(message).toContain("接载日期: 2026-12-20");
    expect(message).toContain("乘客人数: 6");
    expect(message).not.toContain("行李详情:");
    expect(new URL(waLink(waGreeting("zh"))).searchParams.get("text")).toContain(
      "你好，欣旅游！👋",
    );
  });
});
