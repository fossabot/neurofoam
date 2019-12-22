interface IJsonArray extends ReadonlyArray<Json> { }

interface IJsonObject {
  readonly [key: string]: Json
}

type Json =
  | string
  | number
  | boolean
  | IJsonArray
  | IJsonObject
  | null

export default Json
