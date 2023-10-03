import { Suite } from "../Suite";
import { Test } from "../Test";
import { root } from "../instance";

export function describe(title: string, fn: (this: Suite) => void): Suite {
  const suite = new Suite(title, root.ctx);
  root.ctx.suites.push(suite);
  root.ctx = suite;
  fn.bind(suite)();
  root.ctx = suite.parent;
  return suite;
}

export function it(title: string, fn: () => void): Test {
  const test = new Test(title, fn, root.ctx);
  root.ctx.tests.push(test);
  return test;
}
