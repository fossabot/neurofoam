import * as fs from "fs"
import * as path from "path"

export default async function (
  name: ReadonlyArray<string>,
  originalPackageJson: {
    readonly description: string
    readonly version: string
    readonly dependencies?: { readonly [name: string]: string }
    readonly devDependencies?: { readonly [name: string]: string }
    readonly bin?: { readonly [name: string]: string }
    readonly scripts?: { readonly [name: string]: string }
  }
): Promise<void> {
  console.log(`Writing package.json...`)
  const newPackageJsonPath = path.join.apply(path, name.concat([`package.json`]))

  let hasTypes = true
  try {
    await fs.promises.stat(path.join.apply(path, name.concat([`index.ts`])))
  } catch (e) {
    if (e.code === `ENOENT`) {
      hasTypes = false
    } else {
      throw e
    }
  }

  const newPackageJson = {
    name: `${name.join(`/`)}`,
    description: originalPackageJson.description,
    version: originalPackageJson.version,
    engines: {
      node: `>=12.13.0`,
    },
    engineStrict: true,
    publishConfig: {
      access: `public`,
    },
    private: false,
    files: [
      `**/*.js`,
      `**/*.d.ts`,
      `!**/*-tests.*`,
    ],
    repository: {
      type: `git`,
      url: `https://github.com/jameswilddev/neurofoam`,
    },
    license: `MIT`,
    dependencies: originalPackageJson.dependencies,
    devDependencies: originalPackageJson.devDependencies,
    bin: originalPackageJson.bin,
    scripts: originalPackageJson.scripts,
    types: hasTypes ? `index.d.ts` : undefined,
  }

  const newPackageJsonText = `${JSON.stringify(newPackageJson, null, 2)}\n`
  await fs.promises.writeFile(newPackageJsonPath, newPackageJsonText)
}
