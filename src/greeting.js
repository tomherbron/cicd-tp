function getGreeting(name) {
  const greeting = `Hey there!`;

  if (name) {
    const wisher = `from ${name}`;

    return `${greeting} ${wisher}`;
  }

  return greeting;
}

module.exports = { getGreeting };
