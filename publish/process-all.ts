import * as fs from "fs"
import processPackage from "./process-package"

export default async function (): Promise<void> {
  await processPackage([`neurofoam`])

  console.log(`Publishing namespaced packages...`)
  for (const name of await fs.promises.readdir(`@neurofoam`)) {
    await processPackage([`@neurofoam`, name])
  }
}
