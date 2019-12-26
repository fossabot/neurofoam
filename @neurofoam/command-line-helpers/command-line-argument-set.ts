type CommandLineArgumentSet<
  TStringKey extends string,
  TIntegerKey extends string,
  > = {
    readonly strings: {
      readonly [TKey in TStringKey]: string
    }
    readonly integers: {
      readonly [TKey in TIntegerKey]: number
    }
  }

export default CommandLineArgumentSet
