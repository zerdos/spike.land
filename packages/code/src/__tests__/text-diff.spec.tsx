import { diffLines, diffWords } from "diff";

describe("text-diff", () => {
  describe("diffLines", () => {
    it("should identify added lines", () => {
      const oldText = "line 1\nline 2\n";
      const newText = "line 1\nline 2\nline 3\n";

      const result = diffLines(oldText, newText);

      expect(result).toHaveLength(2);
      expect(result[0].value).toBe("line 1\nline 2\n");
      expect(result[0].added).toBe(false);
      expect(result[0].removed).toBe(false);
      expect(result[1].value).toBe("line 3\n");
      expect(result[1].added).toBe(true);
    });

    it("should identify removed lines", () => {
      const oldText = "line 1\nline 2\nline 3";
      const newText = "line 1\nline 3";

      const result = diffLines(oldText, newText);

      expect(result).toHaveLength(3);
      expect(result[0].value).toBe("line 1\n");
      expect(result[1].value).toBe("line 2\n");
      expect(result[1].removed).toBe(true);
      expect(result[2].value).toBe("line 3");
    });

    it("should identify changed lines", () => {
      const oldText = "line 1\nline 2\nline 3";
      const newText = "line 1\nmodified line 2\nline 3";

      const result = diffLines(oldText, newText);

      expect(result).toHaveLength(4);
      expect(result[0].value).toBe("line 1\n");
      expect(result[1].value).toBe("line 2\n");
      expect(result[1].removed).toBe(true);
      expect(result[2].value).toBe("modified line 2\n");
      expect(result[2].added).toBe(true);
      expect(result[3].value).toBe("line 3");
    });
  });

  describe("diffWords", () => {
    it("should identify added words", () => {
      const oldText = "This is a test";
      const newText = "This is a complete test";

      const result = diffWords(oldText, newText);

      expect(result).toHaveLength(3);
      expect(result[0].value).toBe("This is a ");
      expect(result[1].value).toBe("complete ");
      expect(result[1].added).toBe(true);
      expect(result[2].value).toBe("test");
    });

    it("should identify removed words", () => {
      const oldText = "This is a complete test";
      const newText = "This is a test";

      const result = diffWords(oldText, newText);

      expect(result).toHaveLength(3);
      expect(result[0].value).toBe("This is a ");
      expect(result[1].value).toBe("complete ");
      expect(result[1].removed).toBe(true);
      expect(result[2].value).toBe("test");
    });

    it("should identify changed words", () => {
      const oldText = "This is a test";
      const newText = "This was a test";

      const result = diffWords(oldText, newText);

      expect(result).toHaveLength(4);
      expect(result[0].value).toBe("This ");
      expect(result[1].value).toBe("is");
      expect(result[1].removed).toBe(true);
      expect(result[2].value).toBe("was");
      expect(result[2].added).toBe(true);
      expect(result[3].value).toBe(" a test");
    });
  });
});
