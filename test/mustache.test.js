import Mustache, { render } from "mustache";
import fs from "fs/promises";

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

test("Nested Object", () => {
  const data = Mustache.render("Hello, {{person.name}}", {
    person: {
      name: "World",
    },
  });
  expect(data).toBe("Hello, World");
});

test("Mustache File", async () => {
  const helloTemplate = await fs.readFile("../templates/hello.mustache").then((data) => data.toString());

  const data = Mustache.render(helloTemplate, { title: "Hello, World" });

  console.info(data);
  expect(data).toContain("Hello, World");
});

test("Mustache Sections Not Show", async () => {
  const helloTemplate = await fs.readFile("../templates/person.mustache").then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {});

  console.info(data);
  expect(data).not.toContain("Hello Person");
});

test("Sections Data", async () => {
  const helloTemplate = await fs.readFile("../templates/person.mustache").then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    person: {
      name: "World",
    },
  });

  console.info(data);
  expect(data).toContain("Hello Person World!");
});

test("Inverted Sections", async () => {
  const helloTemplate = await fs.readFile("../templates/person.mustache").then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {});

  console.info(data);
  expect(data).toContain("Hello Guest");
});

test("List", async () => {
  const helloTemplate = await fs.readFile("../templates/hobbies.mustache").then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    hobbies: ["Playing Piano", "Coding"],
  });

  console.info(data);
  expect(data).toContain("Playing Piano");
  expect(data).toContain("Coding");
});

test("List Object", async () => {
  const helloTemplate = await fs.readFile("../templates/students.mustache").then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    students: [
      {
        name: "Yuli",
        value: "90",
      },
      {
        name: "Yuli2",
        value: "100",
      },
    ],
  });

  console.info(data);
  expect(data).toContain("Yuli");
  expect(data).toContain("Yuli2");
  expect(data).toContain("90");
  expect(data).toContain("100");
});

test("Functions", async () => {
  const parameter = {
    name: "Yuli",
    upper: () => {
      return (text, render) => {
        return render(text).toUpperCase();
      };
    },
  };

  const data = Mustache.render("Hello {{#upper}}{{name}}{{/upper}}", parameter);
  console.info(data);
  expect(data).toContain("YULI");
});

test("Comment", async () => {
  const helloTemplate = await fs.readFile("../templates/comment.mustache").then((data) => data.toString());

  const data = Mustache.render(helloTemplate, {
    title: "Yuli",
  });

  console.info(data);
  expect(data).toContain("Yuli");
  expect(data).not.toContain("this is a comment");
});

test("Partials", async () => {
  const contentTemplate = await fs.readFile("../templates/content.mustache").then((data) => data.toString());
  const headerTemplate = await fs.readFile("../templates/header.mustache").then((data) => data.toString());
  const footerTemplate = await fs.readFile("../templates/footer.mustache").then((data) => data.toString());

  const data = Mustache.render(
    contentTemplate,
    {
      title: "Yuli",
      content: "Belajar Mustache JS",
    },
    {
      header: headerTemplate,
      footer: footerTemplate,
    }
  );

  console.info(data);
  expect(data).toContain("Yuli");
  expect(data).toContain("Belajar Mustache JS");
  expect(data).toContain("Powered by yulinato");
});
