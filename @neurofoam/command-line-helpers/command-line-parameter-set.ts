type CommandLineParameterSet<
  TStringKey extends string,
  TIntegerKey extends string,
  > = {
    readonly strings: {
      readonly [TKey in TStringKey]: {
        readonly name: {
          readonly short: string
          readonly long: string
        }
        readonly helpText: string
        readonly argumentHelpText: string
        readonly length: {
          readonly minimum: number
          readonly maximum: number
        }
      }
    }
    readonly integers: {
      readonly [TKey in TIntegerKey]: {
        readonly name: {
          readonly short: string
          readonly long: string
        }
        readonly helpText: string
        readonly argumentHelpText: string
        readonly minimum: number
        readonly maximum: number
      }
    }
  }

export default CommandLineParameterSet
