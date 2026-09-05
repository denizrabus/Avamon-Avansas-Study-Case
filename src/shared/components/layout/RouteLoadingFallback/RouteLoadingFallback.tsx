export function RouteLoadingFallback() {
  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-page-bg"
    >
      <div
        className="size-8 animate-spin rounded-full border-4 border-line border-t-avamon-red"
        role="status"
      >
        <span className="sr-only">Loading…</span>
      </div>
    </main>
  )
}
