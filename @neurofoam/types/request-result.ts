import Json from "./json"

type RequestResult<
  TEvent extends Json,
  > = {
    readonly statusCode: number
    readonly response: Json
    readonly event: null | TEvent
  }

export default RequestResult
