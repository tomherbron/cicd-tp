const { getGreeting } = require("../../src/greeting");

describe("getGreeting", () => {
  it("retourne le message de base sans nom", () => {
    expect(getGreeting()).toBe("Hey there!");
  });

  it("retourne le message avec le nom fourni", () => {
    const name = "Alice";
    expect(getGreeting(name)).toBe("Hey there! from Alice");
  });

  it("retourne le message avec un nom vide", () => {
    expect(getGreeting("")).toBe("Hey there!");
  });

  it("retourne le message avec un nom null", () => {
    expect(getGreeting(null)).toBe("Hey there!");
  });

  it("retourne le message avec un nom undefined", () => {
    expect(getGreeting(undefined)).toBe("Hey there!");
  });
});
