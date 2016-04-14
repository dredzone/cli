"use strict";

exports.ProjectBuilder = class {
  constructor(choices) {
    this.choices = choices;
  }

  build() {
    let createProject = require(`./platforms/${this.choices.targetPlatform}/index`);
    let project = createProject(this.choices, this.choices.name);

    let configureTranspiler = require(`./transpilers/${this.choices.transpiler}/index`);
    configureTranspiler(project);

    let configureCSSProcessor = require(`./css-processors/${this.choices.cssProcessor}/index`);
    configureCSSProcessor(project);

    let configureCodeEditor = require(`./code-editors/${this.choices.codeEditor}/index`);
    configureCodeEditor(project);

    console.log(`Creating project "${project.choices.name}"`)

    return project.create(process.cwd())
      .then(() => console.log('Project resources successfully created.'))
      .then(() => console.log('Installing project dependencies.'))
      .then(() => project.install(true))
      .then(() => console.log('Project dependencies successfully installed.'))
      .then(() => project);
  }
}