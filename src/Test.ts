import { Root, RunContext, Suite } from "./Suite";
import { red, green, gray } from "colors/safe";

export class Test {
  public depth: number;
  constructor(
    public title: string,
    private fn: () => Promise<void> | void,
    public parent: Suite | Root
  ) {
    this.depth = parent.depth + 1;
  }

  public status = "loaded";
  public err?: unknown;
  public async exec(runCtx: RunContext) {
    let timeoutId: NodeJS.Timeout;
    const timeoutPromise = new Promise<void>(
      (_, reject) =>
        (timeoutId = setTimeout(() => reject(new Error("timeout")), 2000))
    );
    try {
      const fnPromise = this.fn();

      await Promise.race([fnPromise, timeoutPromise]);

      this.status = "succeed";
    } catch (err) {
      this.status = "failed";
      this.err = err;
    } finally {
      clearTimeout(timeoutId!);

      const color = this.status === "failed" ? red : green;
      if (this.status === "failed") {
        runCtx.failedTests.push(this);
        console.log(
          color(
            `${"".padStart(
              (this.parent.depth + 1) * 2,
              " "
            )}${++runCtx.failCount}) ${this.title}`
          )
        );
      } else {
        runCtx.successCount += 1;
        console.log(
          `${"".padStart((this.parent.depth + 1) * 2, " ")}${color("✔")} ${gray(
            this.title
          )}`
        );
      }
    }
  }
}
