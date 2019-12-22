import * as fs from "fs"
import * as path from "path"

export default async function (
  name: ReadonlyArray<string>
): Promise<void> {
  console.log(`Copying license...`)
  await fs.promises.copyFile(`license`, path.join.apply(path, name.concat(`license`)))
}
