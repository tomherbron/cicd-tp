const { getGreeting } = require("../../src/greeting");

describe("getGreeting", () => {
  it("returns base message without name", () => {
    expect(getGreeting()).toBe("Hello world!");
  });

  it("returns base message with provided name", () => {
    const name = "Alice";
    expect(getGreeting(name)).toBe("Hello world! From Alice");
  });

  it("returns base message if provided name is empty", () => {
    expect(getGreeting("")).toBe("Hello world!");
  });

  it("returns base message if provided name is null", () => {
    expect(getGreeting(null)).toBe("Hello world!");
  });

  it("returns base message if provided name is undefined", () => {
    expect(getGreeting(undefined)).toBe("Hello world!");
  });
});