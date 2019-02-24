'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-es-project:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ confirm: true });
  });

  it('creates files', () => {
    assert.file(['.editorconfig']);
    assert.file(['.eslintignore']);
    assert.file(['.eslintrc.json']);
  });
});
