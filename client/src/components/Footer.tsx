export function Footer() {
  return (
    <footer className="fixed bottom-0 z-50 w-full border-t bg-background/80 backdrop-blur-xl">
      <div className="container flex h-14 items-center">
        <p className="text-sm text-muted-foreground">
          Built with ❤️ by{" "}
          <a
            href="https://pythagora.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            Pythagora
          </a>
        </p>
      </div>
    </footer>
  )
}