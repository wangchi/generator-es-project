'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(`Welcome to the impeccable ${chalk.red('generator-es-project')} generator!`)
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Would you like to enable this generator to generate project?',
        default: true
      },
      {
        type: 'list',
        name: 'framework',
        message: 'Which framework would you like?',
        choices: [
          {
            name: 'React',
            value: 'react',
            checked: true
          },
          {
            name: 'Vue',
            value: 'vue',
            checked: false
          },
          {
            name: 'Without any framework',
            value: 'empty',
            checked: false
          }
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    if (!this.props.confirm) {
      this.end();
    }

    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));

    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copy(
      this.templatePath('.eslintignore'),
      this.destinationPath('.eslintignore')
    );

    if (this.props.framework === 'react') {
      this.fs.copy(
        this.templatePath('.eslintrc_react.json'),
        this.destinationPath('.eslintrc.json')
      );
    } else if (this.props.framework === 'vue') {
      this.fs.copy(
        this.templatePath('.eslintrc_vue.json'),
        this.destinationPath('.eslintrc.json')
      );
    } else {
      this.fs.copy(
        this.templatePath('.eslintrc.json'),
        this.destinationPath('.eslintrc.json')
      );
    }
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      skipInstall: true
    });
  }

  end() {
    console.log('End!');
  }
};
