import * as fs from "fs"
import processPackage from "./process-package"
import writeRootReadme from "./write-root-readme"

export default async function (): Promise<void> {
  await processPackage([`neurofoam`])

  console.log(`Checking namespaced packages...`)
  for (const name of await fs.promises.readdir(`@neurofoam`)) {
    await processPackage([`@neurofoam`, name])
  }

  await writeRootReadme()
}
