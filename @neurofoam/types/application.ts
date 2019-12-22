import * as jsonschema from "jsonschema"
import Json from "./json"
import RequestResult from "./request-result"

type Application<
  TState extends Json,
  TRequest extends Json,
  TEvent extends Json,
  > = {
    readonly initialState: TState

    readonly requestSchema: jsonschema.Schema

    requestCallback(
      state: TState,
      sessionKey: string,
      request: TRequest,
    ): Promise<RequestResult<TEvent>>

    applyEvent(
      state: TState,
      event: TEvent,
    ): TState
  }

export default Application
