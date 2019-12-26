export default function (
  main: () => Promise<void>
): void {
  main()
    .then(
      () => {
        process.exit(0)
      },
      reason => {
        console.error(reason)
        process.exit(1)
      }
    )
}
