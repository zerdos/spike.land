import { StartWithPrompt } from "@/components/ui/start-with-prompt";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { useDictation } from "@/hooks/use-dictation";
import { md5 } from "@/lib/md5";
import { processImage } from "@/lib/process-image";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock dependencies
vi.mock("@/hooks/use-dark-mode");
vi.mock("@/hooks/use-dictation");
vi.mock("@/lib/md5");
vi.mock("@/lib/process-image");
vi.mock("framer-motion", () => ({
  motion: {
    img: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <img {...props}>{children}</img>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock location
const mockLocation = {
  href: "",
};
Object.defineProperty(window, "location", {
  value: mockLocation,
  writable: true,
});

describe("StartWithPrompt Integration Flow", () => {
  const mockSetPrompt = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    mockLocation.href = "";

    // Setup default mocks
    vi.mocked(useDarkMode).mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: vi.fn(),
    });

    // Mock useDictation to simply return the current value and setter
    vi.mocked(useDictation).mockReturnValue(["", mockSetPrompt, {
      isRecording: false,
      isProcessing: false,
      error: "",
    }] as const);
    vi.mocked(md5).mockReturnValue("test-hash-123");
    vi.mocked(processImage).mockResolvedValue({
      src: "data:image/png;base64,processed",
      imageName: "processed-image.png",
      url: "http://example.com/processed-image.png",
      mediaType: "image/png",
      data: "processed",
      type: "image",
    } as unknown as ImageData);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Complete User Flow", () => {
    it("should handle the complete flow from prompt entry to navigation", async () => {
      const user = userEvent.setup();
      
      render(<StartWithPrompt />);

      // 1. User enters a prompt
      const textarea = screen.getByPlaceholderText("Enter your prompt here or paste an image...");
      // Directly set the value since we're testing the flow, not the typing
      fireEvent.change(textarea, { target: { value: "Create a todo list application" } });
      expect(mockSetPrompt).toHaveBeenCalledWith("Create a todo list application");

      // 2. User clicks Generate
      const generateButton = screen.getByRole("button", { name: /generate/i });
      await user.click(generateButton);

      // 3. Verify data was stored in sessionStorage
      const storedData = sessionStorage.getItem("test-hash-123");
      expect(storedData).toBeTruthy();
      
      const parsedData = JSON.parse(storedData!);
      expect(parsedData).toEqual({
        prompt: "Create a todo list application",
        images: [],
      });

      // 4. Verify navigation happened
      expect(mockLocation.href).toBe("/live/x-test-hash-123");
    });

    it("should handle prompt with images", async () => {
      const user = userEvent.setup();
      
      render(<StartWithPrompt />);

      // 1. User enters a prompt
      const textarea = screen.getByPlaceholderText("Enter your prompt here or paste an image...");
      fireEvent.change(textarea, { target: { value: "Recreate this design" } });

      // 2. User uploads an image
      const file = new File(["dummy content"], "design.png", { type: "image/png" });
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      
      await waitFor(() => {
        fireEvent.change(fileInput, { target: { files: [file] } });
      });

      // Wait for image processing
      await waitFor(() => {
        const uploadedImages = screen.getAllByAltText(/Uploaded/);
        expect(uploadedImages).toHaveLength(1);
      });

      // 3. User clicks Generate
      const generateButton = screen.getByRole("button", { name: /generate/i });
      await user.click(generateButton);

      // 4. Verify data was stored with images
      const storedData = sessionStorage.getItem("test-hash-123");
      const parsedData = JSON.parse(storedData!);
      
      expect(parsedData).toEqual({
        prompt: "Recreate this design",
        images: [{
          src: "data:image/png;base64,processed",
          imageName: "processed-image.png",
          url: "http://example.com/processed-image.png",
          mediaType: "image/png",
          data: "processed",
          type: "image",
        }],
      });

      expect(mockLocation.href).toBe("/live/x-test-hash-123");
    });

    it("should handle paste image functionality", async () => {
      render(<StartWithPrompt />);

      const textarea = screen.getByPlaceholderText("Enter your prompt here or paste an image...");
      
      // Create a paste event with an image
      const file = new File(["image data"], "pasted.png", { type: "image/png" });
      const clipboardData = {
        items: [{
          type: "image/png",
          getAsFile: () => file,
        }],
      };

      fireEvent.paste(textarea, { clipboardData });

      // Wait for image processing
      await waitFor(() => {
        const uploadedImages = screen.getAllByAltText(/Uploaded/);
        expect(uploadedImages).toHaveLength(1);
      });

      // Add prompt and generate
      // Use userEvent to properly update the textarea
      await userEvent.clear(textarea);
      await userEvent.type(textarea, "Analyze this pasted image");
      
      const generateButton = screen.getByRole("button", { name: /generate/i });
      await userEvent.click(generateButton);

      await waitFor(() => {
        const storedData = sessionStorage.getItem("test-hash-123");
        expect(storedData).toBeTruthy();
        
        const parsedData = JSON.parse(storedData!);
        expect(parsedData.images).toHaveLength(1);
        expect(parsedData.prompt).toBe("Analyze this pasted image");
      });
    });

    it("should handle drag and drop images", async () => {
      render(<StartWithPrompt />);

      const dropZone = screen.getByText("Generate a new app or website").closest("div");
      const file = new File(["image data"], "dropped.png", { type: "image/png" });

      // Simulate drag over
      fireEvent.dragOver(dropZone!, {
        dataTransfer: { files: [] },
      });

      // Simulate drop
      fireEvent.drop(dropZone!, {
        dataTransfer: { files: [file] },
      });

      // Wait for image processing
      await waitFor(() => {
        const uploadedImages = screen.getAllByAltText(/Uploaded/);
        expect(uploadedImages).toHaveLength(1);
      });
    });

    it("should limit to 5 images maximum", async () => {
      render(<StartWithPrompt />);

      // Upload 5 images
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      
      // Since each file change replaces the previous file, we need to accumulate them
      for (let i = 0; i < 5; i++) {
        const file = new File(["content"], `image${i}.png`, { type: "image/png" });
        await waitFor(() => {
          fireEvent.change(fileInput, { target: { files: [file] } });
        });
      }

      // After 5 uploads, check button is disabled
      await waitFor(() => {
        const uploadButton = screen.getByRole("button", { name: /upload image/i });
        expect(uploadButton).toHaveAttribute("aria-disabled", "true");
      });
    });

    it("should handle image removal", async () => {
      const user = userEvent.setup();
      
      render(<StartWithPrompt />);

      // Upload an image
      const file = new File(["content"], "test.png", { type: "image/png" });
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      
      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(screen.getByAltText("Uploaded 0")).toBeInTheDocument();
      });

      // Remove the image
      const removeButton = screen.getByLabelText("Remove image");
      await user.click(removeButton);

      // Image should be removed
      await waitFor(() => {
        expect(screen.queryByAltText("Uploaded 0")).not.toBeInTheDocument();
      });

      // Template button should reappear
      expect(screen.getByText("Choose from templates")).toBeInTheDocument();
    });

    it("should generate unique hash for different prompts", async () => {
      const { rerender } = render(<StartWithPrompt />);

      // First prompt
      vi.mocked(md5).mockReturnValueOnce("hash-1");
      const textarea = screen.getByPlaceholderText("Enter your prompt here or paste an image...");
      fireEvent.change(textarea, { target: { value: "First prompt" } });
      fireEvent.click(screen.getByRole("button", { name: /generate/i }));

      expect(mockLocation.href).toBe("/live/x-hash-1");
      expect(sessionStorage.getItem("hash-1")).toBeTruthy();

      // Reset for second prompt
      mockLocation.href = "";
      rerender(<StartWithPrompt />);

      // Second prompt
      vi.mocked(md5).mockReturnValueOnce("hash-2");
      fireEvent.change(
        screen.getByPlaceholderText("Enter your prompt here or paste an image..."),
        { target: { value: "Second prompt" } }
      );
      fireEvent.click(screen.getByRole("button", { name: /generate/i }));

      expect(mockLocation.href).toBe("/live/x-hash-2");
      expect(sessionStorage.getItem("hash-2")).toBeTruthy();
    });

    it("should handle empty prompt generation", () => {
      render(<StartWithPrompt />);

      const generateButton = screen.getByRole("button", { name: /generate/i });
      fireEvent.click(generateButton);

      // Should still navigate with empty prompt
      const storedData = sessionStorage.getItem("test-hash-123");
      const parsedData = JSON.parse(storedData!);
      
      expect(parsedData).toEqual({
        prompt: "",
        images: [],
      });

      expect(mockLocation.href).toBe("/live/x-test-hash-123");
    });

    it("should navigate to templates when template button is clicked", async () => {
      const user = userEvent.setup();
      
      render(<StartWithPrompt />);

      const templateButton = screen.getByRole("button", { name: /choose from templates/i });
      await user.click(templateButton);

      expect(mockLocation.href).toBe("/start");
    });

    it("should handle image processing errors gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      vi.mocked(processImage).mockRejectedValueOnce(new Error("Processing failed"));

      render(<StartWithPrompt />);

      const file = new File(["content"], "error.png", { type: "image/png" });
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      
      fireEvent.change(fileInput, { target: { files: [file] } });

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith(
          "Error processing image:",
          expect.any(Error)
        );
      });

      // No image should be displayed
      expect(screen.queryByAltText(/Uploaded/)).not.toBeInTheDocument();

      consoleSpy.mockRestore();
    });
  });

  describe("Dark Mode Integration", () => {
    it("should apply dark mode styles throughout the flow", () => {
      vi.mocked(useDarkMode).mockReturnValue({
        isDarkMode: true,
        toggleDarkMode: vi.fn(),
      });

      render(<StartWithPrompt />);

      // Check dark mode classes
      const container = screen.getByText("Generate a new app or website").closest("div");
      expect(container?.className).toContain("bg-gradient-to-br from-gray-900 to-gray-800");
      expect(container?.className).toContain("text-white");

      // Check textarea dark mode
      const textarea = screen.getByPlaceholderText("Enter your prompt here or paste an image...");
      expect(textarea.className).toContain("bg-gray-800");
      expect(textarea.className).toContain("text-white");

      // Check button dark mode
      const generateButton = screen.getByRole("button", { name: /generate/i });
      expect(generateButton.className).toContain("bg-purple-600");
    });
  });
});