import * as path from "path"
import runCommandLine from "./run-command-line"

export default async function (
  name: ReadonlyArray<string>,
): Promise<void> {
  console.log(`Installing dependencies...`)
  const command = process.env.NEUROFOAM_CI ? `ci` : `install`
  console.log(await runCommandLine(`npm ${command} --prefix ${path.join.apply(path, name.slice())}`))
}
