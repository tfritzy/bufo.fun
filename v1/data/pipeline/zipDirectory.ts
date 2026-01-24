export function zipDirectory(sourceDir: string, outPath: string) {
  const child_process = require("child_process");
  child_process.execSync(`zip -r ${outPath} *`, {
    cwd: sourceDir,
  });
}