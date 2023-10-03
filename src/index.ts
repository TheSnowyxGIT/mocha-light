import { argv } from "process";
import * as fs from "fs";
import path from "path";
import { root } from "./instance";
import { Root, Suite } from "./Suite";
import { Test } from "./Test";
import { gray, green, red } from "colors/safe";

const files = argv.slice(2);

if (files.length === 0) {
  throw new Error("No test files given.");
}

for (const file of files) {
  const absoluteFile = path.resolve(file);
  if (!fs.existsSync(absoluteFile)) {
    throw new Error(`The file '${file}' does not exists.`);
  }
}

for (const file of files) {
  const absoluteFile = path.resolve(file);
  require(absoluteFile);
}

root.exec().then(() => {
  console.log();
  console.log(green(`${root.runCtx!.successCount} passing`));
  console.log(red(`${root.runCtx!.failCount} failing`));
  console.log();
  console.log();
  let count = 1;
  for (const test of root.runCtx!.failedTests) {
    const path: (Suite | Test)[] = [];
    let current = test.parent;
    while (current instanceof Suite) {
      path.push(current);
      current = current.parent;
    }
    path.push(test);
    console.log(
      `${"".padStart(path[0].depth * 2, " ")}${count}) ${path[0].title}`
    );

    for (let i = path.length - 1; i >= 1; i--) {
      const cur = path[i];
      console.log(`${"".padStart(cur.depth * 2, " ")} ${cur.title}`);
    }
    if (test.err instanceof Error) {
      console.log(red(test.err.message));
      if (test.err.stack) console.log(gray(test.err.stack));
    } else {
      console.log(red(`${test.err!}`));
    }

    count += 1;
  }
});
