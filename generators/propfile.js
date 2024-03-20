module.exports = function (plop) {
  plop.setGenerator("entities", {
    description: "Create a new entity",
    prompts: [{ type: "input", name: "name", message: "What is the name of the entity?" }],
    actions: [...entitiesCreations],
  });
}
plop.setGenerator("test", {
  description: "Create a new test",
  prompts: [
    { type: "input", name: "name", message: "What is the name of the file?" },
    { type: "input", name: "entity", message: "What is the name of the entity?" },
    { type: "input", name: "layer", message: "What is the name of the layer?" },
  ],
  actions: [
    {
      type: "add",
      path: "../src/slices/{{camelCase entity}}/{{camelCase layer}}/{{pascalCase name}}.spec.ts",
      templateFile: "./templates/test.spec.ts.hbs",
    },
  ],
});
const entitiesCreations = [
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/entities/{{pascalCase name}}Entity.ts",
    templateFile: "./templates/entities/DomainEntity.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/entities/{{pascalCase name}}Entity.spec.ts",
    templateFile: "./templates/entities/DomainEntity.spec.ts.hbs",
  },
  {
    type: "add",
    path: "../src/slices/{{camelCase name}}/entities/index.ts",
    templateFile: "./templates/entities/index.ts.hbs",
  },
];