import { StartWithPrompt } from "@/components/ui/start-with-prompt";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the useDarkMode hook
vi.mock("@/hooks/use-dark-mode", () => ({
  useDarkMode: vi.fn(),
}));

// Mock the md5 function
vi.mock("@/lib/md5", () => ({
  md5: vi.fn((input) => `mocked-md5-${input}`),
}));

// Mock fetch function
globalThis.fetch = vi.fn(() => Promise.resolve({ ok: true })) as unknown as typeof fetch;

// Mock URL.createObjectURL
URL.createObjectURL = vi.fn(() => "mocked-url");

describe("StartWithPrompt", () => {
  beforeEach(() => {
    // Mock the useDarkMode hook to return a default value
    (useDarkMode as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isDarkMode: false,
    });
    // Clear all mocks before each test
    vi.clearAllMocks();
    // Clear sessionStorage before each test
    sessionStorage.clear();
  });

  it("renders without crashing", () => {
    render(<StartWithPrompt />);
    expect(screen.getByText("Generate a new app or website")).toBeTruthy();
  });

  it("updates prompt when user types", async () => {
    render(<StartWithPrompt />);
    const textarea = screen.getByPlaceholderText(
      "Enter your prompt here or paste an image...",
    ) as HTMLTextAreaElement;

    await userEvent.type(textarea, "Test prompt");

    // Check using the value property directly
    expect(textarea.value).toBe("Test prompt");
  });

  it("shows upload image button", () => {
    render(<StartWithPrompt />);
    expect(screen.getByText("Upload Image")).toBeTruthy();
  });

  it("shows generate button", () => {
    render(<StartWithPrompt />);
    expect(screen.getByText("Generate")).toBeTruthy();
  });

  it("shows template button when no images are uploaded", () => {
    render(<StartWithPrompt />);
    expect(screen.getByText("Choose from templates")).toBeTruthy();
  });

  it("hides template button when images are uploaded", async () => {
    const { container } = render(<StartWithPrompt />);
    const file = new File(["dummy content"], "test.png", { type: "image/png" });
    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    if (!fileInput) {
      throw new Error("File input not found");
    }

    // Simulate file upload
    await userEvent.upload(fileInput, file);

    // Wait for the component to update
    await waitFor(() => {
      expect(screen.queryByText("Choose from templates")).toBeNull();
    });
  });

  it("calls handleGenerate when generate button is clicked", async () => {
    render(<StartWithPrompt />);
    const generateButton = screen.getByText("Generate");
    const promptTextarea = screen.getByPlaceholderText(
      "Enter your prompt here or paste an image...",
    );

    await userEvent.type(promptTextarea, "Test prompt");
    await userEvent.click(generateButton);

    expect(sessionStorage.getItem("mocked-md5-Test prompt")).toBeTruthy();

    // Check if the sessionStorage was set correctly
    const sessionData = JSON.parse(
      sessionStorage.getItem("mocked-md5-Test prompt") || "{}",
    );
    expect(sessionData.prompt).toBe("Test prompt");

    // Verify that location.href was set (using the mocked location)
    expect(window.location.href).toBe("/live/x-mocked-md5-Test prompt");
  });

  it("changes styles based on dark mode", () => {
    (useDarkMode as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      isDarkMode: true,
    });

    const { container } = render(<StartWithPrompt />);

    // Use a simpler selector to verify dark mode styles
    const mainElement = container.firstChild as HTMLElement;
    expect(mainElement.className).toContain("bg-gradient-to-br");
    expect(mainElement.className).toContain("from-gray-900");
    expect(mainElement.className).toContain("to-gray-800");
    expect(mainElement.className).toContain("text-white");
  });

  it("removes an image when the remove button is clicked", async () => {
    const { container } = render(<StartWithPrompt />);
    const file = new File(["dummy content"], "test.png", { type: "image/png" });
    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    if (!fileInput) {
      throw new Error("File input not found");
    }

    // Upload an image
    await userEvent.upload(fileInput, file);

    // Wait for the image to be added - use a combination of queries
    await waitFor(() => {
      // First check for the image container
      const imageGallery = container.querySelector(
        ".flex.flex-wrap.gap-4.mt-4",
      );
      expect(imageGallery?.children.length).toBeGreaterThan(0);

      // Then check for the image element
      const uploadedImage = container.querySelector('img[alt="Uploaded 0"]');
      expect(uploadedImage).not.toBeNull();
    });

    // Find and click the remove button
    const removeButton = screen.getByLabelText("Remove image");
    await userEvent.click(removeButton);

    // Check if the image is removed
    await waitFor(() => {
      const uploadedImage = container.querySelector('img[alt="Uploaded 0"]');
      expect(uploadedImage).toBeNull();
    });
  });

  it("handles image paste", async () => {
    render(<StartWithPrompt />);
    const textarea = screen.getByPlaceholderText(
      "Enter your prompt here or paste an image...",
    );

    // Create a mock clipboard event with an image
    const file = new File(["dummy content"], "pasted-image.png", {
      type: "image/png",
    });
    const clipboardEvent = new Event("paste", { bubbles: true });
    Object.assign(clipboardEvent, {
      clipboardData: {
        items: [
          { kind: "file", type: "image/png", getAsFile: () => file },
        ],
      },
    });

    // Dispatch the paste event
    fireEvent(textarea, clipboardEvent);

    // Wait for the component to update
    await waitFor(() => {
      expect(screen.getByAltText("Uploaded 0")).toBeTruthy();
    });
  });

  it("enlarges image when clicked", async () => {
    const { container } = render(<StartWithPrompt />);
    const file = new File(["dummy content"], "test.png", { type: "image/png" });
    const fileInput = container.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    if (!fileInput) {
      throw new Error("File input not found");
    }

    // Upload an image
    await userEvent.upload(fileInput, file);

    // Wait for the image to be added to the DOM
    await waitFor(() => {
      expect(screen.getByAltText("Uploaded 0")).toBeTruthy();
    });

    // Click on the uploaded image
    const uploadedImage = screen.getByAltText("Uploaded 0");
    await userEvent.click(uploadedImage);

    // Check if the enlarged image modal is displayed
    expect(screen.getByAltText("Enlarged")).toBeTruthy();
  });
});
