import * as React from 'react'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group inline-flex items-center justify-center gap-2 whitespace-nowrap font-body text-[0.82rem] font-medium tracking-[0.04em] transition-colors duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-ink-soft',
        ink: 'bg-ink text-ink-foreground hover:bg-ink-soft',
        light: 'bg-ink-foreground text-ink hover:bg-white',
        outline: 'border border-border-strong text-foreground hover:border-foreground hover:bg-foreground/[0.03]',
        'outline-light': 'border border-white/35 text-ink-foreground hover:border-gold hover:text-gold',
        ghost: 'text-foreground hover:bg-foreground/5',
        link: 'text-primary underline-offset-4 hover:underline px-0',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6',
        lg: 'h-[3.25rem] px-8 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type ButtonAsLink = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string
    external?: boolean
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button(props: ButtonProps) {
  const { variant, size, className, children } = props
  const classes = cn(buttonVariants({ variant, size }), className)

  if ('href' in props && props.href !== undefined) {
    const { href, external, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props
    if (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a
          href={href}
          className={classes}
          {...(external || href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...rest}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  const { variant: _v, size: _s, className: _c, children: _ch, type, ...rest } = props as ButtonAsButton
  return (
    <button type={type ?? 'button'} className={classes} {...rest}>
      {children}
    </button>
  )
}

export { buttonVariants }
