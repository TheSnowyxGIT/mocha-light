[![NPM version](https://badge.fury.io/js/mocha-light.svg)](http://badge.fury.io/js/mocha-light)

The goal of this package was to build a light version of Mocha, within **1 day of coding**.
There is no real reason to use this package, except if you want to understand how Mocha works.

## Table of content

- [Table of content](#table-of-content)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Run Cycle Overview](#run-cycle-overview)
- [Command line usage](#command-line-usage)

## Installation

Install using _npm_:

```sh
npm install --save-dev mocha-light
```

_npm_ is the only package manager yet supported.

## Getting Started

```sh
npm install --save-dev mocha-light
mkdir tests
touch tests/test.spec.js
$EDITOR tests/test.spec.js
```

Writing up your first test:

- tests/test.spec.js

  ```js
  const { it } = require("mocha-light");

  it("my test 1", () => {
    assert(true);
  });

  it("my test 2", () => {
    assert(false);
  });

  describe("my suite 1", () => {
    it("my test 3", () => {
      assert(true);
    });
  });
  ```

  Back in the terminal:

```sh
$ npx mocha-light tests/test.spec.js
```

## Run Cycle Overview

1. User (you) executes Mocha light (mocha-light [...files]).
2. Mocha Light searches for the test files:
3. Mocha Light builds the test Tree from the test files.
4. Then executes the test Tree.
5. At the end of the execution, Mocha Light shows the status of tests executions.

## Command line usage

```sh
npx mocha-light [...files]
```
