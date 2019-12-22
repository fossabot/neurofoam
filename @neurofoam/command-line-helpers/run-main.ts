export default function (
  main: () => Promise<void>
): void {
  main()
    .then(
      () => {
        console.log(`Done.`)
        process.exit(0)
      },
      reason => {
        console.error(`Failed.`)
        console.error(reason)
        process.exit(1)
      }
    )
}
