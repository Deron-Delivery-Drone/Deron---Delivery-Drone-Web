import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { fetchPublishedContent } from "./lib/supabase";

jest.mock("./lib/supabase", () => ({
  fetchPublishedContent: jest.fn().mockResolvedValue([]),
}));

beforeAll(() => {
  // JSDOM doesn't implement matchMedia; provide a minimal mock for theme detection.
  window.matchMedia =
    window.matchMedia ||
    function (query) {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };
    };
});

test("renders hero copy", async () => {
  render(<App />);

  await waitFor(() => expect(fetchPublishedContent).toHaveBeenCalled());

  expect(
    screen.getByText(/Điện Biên Phủ của ngành vận chuyển/i)
  ).toBeInTheDocument();

});
