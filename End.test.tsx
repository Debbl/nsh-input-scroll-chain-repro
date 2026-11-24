import { expect, open, test } from "nsh/test";

const pageOffset = (texts: string[]) => texts.find((t) => t.startsWith("page:"));

test("overflowing text scrolls to its end, then the page scrolls", async () => {
  const app = await open("./App.tsx", { width: 400, height: 600 });
  await app.screenshot("before.png");
  for (let i = 1; i <= 10; i++) {
    await app.scroll("id:page", 200);
    await app.wait(200);
    if (i === 2 || i === 10) await app.screenshot(`gesture-${i}.png`);
    console.log(`gesture ${i}:`, pageOffset(app.texts()));
  }
  // Two gestures bring the text to its end; the eight after them should scroll the page.
  expect(app.texts()).not.toContain("page:0");
});
