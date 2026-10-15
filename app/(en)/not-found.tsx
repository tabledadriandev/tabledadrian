import { ChefHat } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-20">
      <div className="max-w-md text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-soft text-primary">
          <ChefHat size={28} />
        </span>
        <p className="mt-8 font-display text-7xl">404</p>
        <h1 className="mt-4 font-display text-3xl">This course is not on the menu</h1>
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
          The page you asked for has wandered off. Return home, or write to Adrian about a table.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/contact" variant="ink">
            Book your experience
          </Button>
          <Button href="/" variant="outline">
            Return home
          </Button>
        </div>
      </div>
    </div>
  )
}
