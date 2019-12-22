import * as fs from "fs"
import * as path from "path"

export default async function (
  name: ReadonlyArray<string>,
): Promise<string> {
  const readmeContentPath = path.join.apply(path, name.concat([`readme-content.md`]))
  const readmeContent = await fs.promises.readFile(readmeContentPath, `utf8`)
  const trimmed = readmeContent.trim()

  if (trimmed === ``) {
    return readmeContent
  }

  return `

${trimmed}`
}
