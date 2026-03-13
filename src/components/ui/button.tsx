import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border text-[0.76rem] font-medium uppercase tracking-[0.24em] ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'border-primary/70 bg-primary text-primary-foreground hover:-translate-y-0.5 hover:bg-primary/92 hover:shadow-[0_18px_40px_-24px_hsl(34_42%_67%_/_0.55)]',
        destructive: 'border-destructive/80 bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border-border/90 bg-background/20 text-foreground hover:-translate-y-0.5 hover:border-primary/60 hover:bg-accent/70 hover:text-foreground',
        secondary: 'border-secondary/80 bg-secondary/55 text-secondary-foreground hover:bg-secondary/75',
        ghost: 'border-transparent bg-transparent text-foreground hover:bg-accent/55 hover:text-foreground',
        link: 'border-transparent p-0 text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-10 px-4',
        lg: 'h-12 px-8',
        icon: 'h-10 w-10 rounded-full px-0 tracking-normal',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
