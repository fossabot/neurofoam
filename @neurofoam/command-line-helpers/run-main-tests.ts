import { runMain } from "./index"

describe(`@neurofoam/command-line-helpers`, () => {
  describe(`runMain`, () => {
    function withFakedGlobals(
      description: string,
      mainBody: () => Promise<void>,
      assert: (
        main: jasmine.Spy,
        console: object,
        consoleError: jasmine.Spy,
        process: object,
        processExit: jasmine.Spy,
      ) => void,
    ): void {
      describe(description, () => {
        const main = jasmine.createSpy(`main`).and.callFake(mainBody)

        const consoleError = jasmine.createSpy(`console.error`)
        const mockConsole = {
          error: consoleError,
        }
        const originalConsole = console

        const processExit = jasmine.createSpy(`process.exit`)
        const mockProcess = {
          exit: processExit,
        }
        const originalProcess = process

        beforeAll((done) => {
          const globalAny = (global as any)
          globalAny.console = mockConsole
          globalAny.process = mockProcess
          runMain(main)
          setTimeout(() => {
            global.console = originalConsole
            global.process = originalProcess
            done()
          }, 100)
        })

        assert(
          main,
          mockConsole,
          consoleError,
          mockProcess,
          processExit
        )
      })
    }

    withFakedGlobals(
      `when the promise does not resolve or reject`,
      () => new Promise<void>(() => { }),
      (main, console, consoleError, process, processExit) => {
        console
        process
        it(`executes main once`, () => expect(main).toHaveBeenCalledTimes(1))
        it(`does not log failure`, () => expect(consoleError).not.toHaveBeenCalled())
        it(`does not exit`, () => expect(processExit).not.toHaveBeenCalled())
      }
    )

    withFakedGlobals(
      `when the promise resolves`,
      async () => { },
      (main, console, consoleError, process, processExit) => {
        console
        it(`executes main once`, () => expect(main).toHaveBeenCalledTimes(1))
        it(`does not log failure`, () => expect(consoleError).not.toHaveBeenCalled())
        it(`exits once`, () => expect(processExit).toHaveBeenCalledTimes(1))
        it(`uses the correct "this" when exiting`, () => expect(processExit.calls.first().object).toBe(process))
        it(`exits successfully`, () => expect(processExit).toHaveBeenCalledWith(0))
      }
    )

    withFakedGlobals(
      `when the promise is rejected`,
      async () => {
        throw `Test Reason`
      },
      (main, console, consoleError, process, processExit) => {
        it(`executes main once`, () => expect(main).toHaveBeenCalledTimes(1))
        it(`logs failure once`, () => expect(consoleError).toHaveBeenCalledTimes(1))
        it(`uses the correct "this" when logging that a failure occurred`, () => expect(consoleError.calls.first().object).toBe(console))
        it(`logs the reason for the failure`, () => expect(consoleError).toHaveBeenCalledWith(`Test Reason`))
        it(`uses the correct "this" when logging the reason for the failure`, () => expect(consoleError.calls.mostRecent().object).toBe(console))
        it(`exits once`, () => expect(processExit).toHaveBeenCalledTimes(1))
        it(`uses the correct "this" when exiting`, () => expect(processExit.calls.first().object).toBe(process))
        it(`exits unsuccessfully`, () => expect(processExit).toHaveBeenCalledWith(1))
        it(`exits after logging`, () => expect(processExit).not.toHaveBeenCalledBefore(consoleError))
      }
    )
  })
})
