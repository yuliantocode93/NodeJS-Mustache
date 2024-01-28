import Mustache from "mustache";

test("mustache", () => {
  const template = "Hello, {{name}}!";
  const data = { name: "World" };
  const result = Mustache.render(template, data);
  expect(result).toBe("Hello, World!");
});

//* Simple
test("Menggunakan Mustache", () => {
  const data = Mustache.render("Hello, {{name}}!", { name: "World" });
  expect(data).toBe("Hello, World!");
});

test("Menggunakan Mustache Cache", () => {
  Mustache.parse("Hello, {{name}}");
  const data = Mustache.render("Hello, {{name}}", { name: "World" });
  expect(data).toBe("Hello, World");
});

test("Tags", () => {
  const data = Mustache.render("Hello {{name}}, my hobby is {{{hobby}}}", {
    name: "World",
    hobby: "playing piano",
  });

  expect(data).toBe("Hello World, my hobby is playing piano");
});

test("Tags2", () => {
  const data = Mustache.render("Hello {{name}}, my hobby is {{{hobby}}}", {
    name: "yuli",
    hobby: "<b>Programming</b>",
  });
  expect(data).toBe("Hello yuli, my hobby is <b>Programming</b>");
});
