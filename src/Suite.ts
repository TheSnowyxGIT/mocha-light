import { Test } from "./Test";

export class Suite {
  public suites: Suite[] = [];
  public tests: Test[] = [];
  public depth: number;
  public runCtx?: RunContext;

  constructor(public title: string, public parent: Suite | Root) {
    this.depth = parent.depth + 1;
  }

  public async exec(runCtx: RunContext) {
    console.log(`${"".padStart(this.depth * 2, " ")}${this.title}`);
    for (const test of this.tests) {
      await test.exec(runCtx);
    }
    for (const suite of this.suites) {
      await suite.exec(runCtx);
    }
  }
}

export class Root {
  public suites: Suite[] = [];
  public tests: Test[] = [];
  public depth: number = 0;
  public ctx: Suite | Root = this;
  public runCtx?: RunContext;

  public async exec() {
    this.runCtx = new RunContext();
    for (const test of this.tests) {
      await test.exec(this.runCtx);
    }
    for (const suite of this.suites) {
      await suite.exec(this.runCtx);
    }
  }
}

export class RunContext {
  public failCount = 0;
  public successCount = 0;
  public failedTests: Test[] = [];
}
