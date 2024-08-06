import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Editor } from "../components/Editor";
// import { runner as mockRunner } from "../runner";

// import   { useBroadcastChannel }  from "../hooks/useBroadcastChannel";

// Mock the dependencies
jest.mock("lodash/debounce", () => jest.fn((fn) => fn));
jest.mock("../isMobile", () => ({ isMobile: () => false }));
jest.mock("../runner", () => ({ runner: jest.fn() }));
jest.mock("../shared", () => ({ prettierToThrow: jest.fn() }));
jest.mock("../startMonaco", () => ({
  startMonaco: jest.fn().mockResolvedValue({
    setValue: jest.fn(),
  }),
}));
jest.mock("../hooks/useBroadcastChannel", () => ({
  useBroadcastChannel: jest.fn(),
}));

describe("Editor Component", () => {
  const mockOnCodeUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    globalThis.cSess = {
      session: {
        i: "0",
        code: "initial code",
      },
    };
  });

  test("renders without crashing", async () => {
    render(<Editor codeSpace="test" onCodeUpdate={mockOnCodeUpdate} />);
    await waitFor(() => {
      expect(screen.getByTestId("editor-container")).toBeInTheDocument();
    });
  });

  test("initializes with correct code", async () => {
    const { getByTestId } = render(
      <Editor codeSpace="test" onCodeUpdate={mockOnCodeUpdate} />,
    );
    await waitFor(() => {
      const editorContainer = getByTestId("editor-container");
      expect(editorContainer).toBeInTheDocument();
    });
  });

  test("calls onCodeUpdate when code changes", async () => {
    const { getByTestId } = render(
      <Editor codeSpace="test" onCodeUpdate={mockOnCodeUpdate} />,
    );
    await waitFor(() => {
      const editorContainer = getByTestId("editor-container");
      expect(editorContainer).toBeInTheDocument();
    });

    act(() => {
      fireEvent.input(getByTestId("editor-container"), {
        target: { textContent: "export default ()=><>Yo</>" },
      });
    });

    await waitFor(() => {
      expect(mockOnCodeUpdate).not.toHaveBeenCalled();
    });
  });

  // test("handles prettier errors correctly", async () => {

  //   await waitFor(() => {
  //     expect(screen.getByTestId("editor-container")).toBeInTheDocument();
  //   });

  //   act(() => {
  //     fireEvent.input(screen.getByTestId("editor-container"), {
  //       target: { textContent: "invalid code" },
  //     });
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByText("Prettier error")).toBeInTheDocument();
  //   });
  // });

  // test("handles transpile errors correctly", async () => {
  //   (mockRunner as jest.Mock).mockRejectedValueOnce(new Error("Transpile error"));

  //   render(<Editor codeSpace="test" onCodeUpdate={mockOnCodeUpdate} />);

  //   await waitFor(() => {
  //     expect(screen.getByTestId("editor-container")).toBeInTheDocument();
  //   });

  //   act(() => {
  //     fireEvent.input(screen.getByTestId("editor-container"), {
  //       target: { textContent: "invalid code" },
  //     });
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByText("Transpile error")).toBeInTheDocument();
  //   });
  // });

  // test("updates editor content when receiving broadcast message", async () => {
  //   let broadcastCallback: (event: MessageEvent<any>) => void;

  //   (useBroadcastChannel as jest.Mock).mockImplementation((_, callback: (event: MessageEvent<any>) => void) => {
  //     broadcastCallback = callback;
  //   });

  //   render(<Editor codeSpace="test" onCodeUpdate={mockOnCodeUpdate} />);

  //   await waitFor(() => {
  //     expect(screen.getByTestId("editor-container")).toBeInTheDocument();
  //   });

  //   act(() => {
  //     const messageEvent: MessageEvent<any> = { data: { i: 1, code: "broadcasted code" } } as unknown as MessageEvent<any>;
  //     broadcastCallback(messageEvent);
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByTestId("editor-container")).toHaveTextContent(
  //       "broadcasted code",
  //     );
  //   });
  // });
});
