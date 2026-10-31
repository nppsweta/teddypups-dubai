import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const pill = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:translate-y-0.5 disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-sticker hover:-translate-y-0.5",
        whatsapp: "bg-whatsapp text-whatsapp-foreground shadow-sticker hover:-translate-y-0.5",
        outline: "border-2 border-foreground bg-background text-foreground hover:bg-secondary",
        ghost: "text-foreground hover:bg-secondary",
      },
      size: { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);
export type PillProps = VariantProps<typeof pill>;
export const pillClass = (v: PillProps & { className?: string } = {}) => cn(pill(v), v.className);
