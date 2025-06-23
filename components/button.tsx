import { cn } from "@/utils/common";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
    children,
    className = "",
    variant = "primary",
    ...props
}) => {
    return (
        <button
            className={cn(
                "flex items-center justify-center",
                "px-4 py-2 rounded-2xl font-semibold",
                "transition-all duration-200 hover:brightness-105 active:brightness-95 disabled:bg-neutral-200 disabled:text-neutral-400",
                "active:translate-y-0.5",
                variant === "primary" && "bg-[#3B82F6] text-white",
                variant === "primary" &&
                "shadow-[0px_4px_0px_0px_rgba(29,78,216,1),inset_0px_2.4px_4.8px_0px_rgba(255,255,255,0.25),inset_0px_-2.4px_4.8px_0px_rgba(29,78,216,1)]",
                variant === "primary" &&
                "active:shadow-[0px_1px_0px_0px_rgba(29,78,216,1),inset_0px_2.4px_4.8px_0px_rgba(255,255,255,0.25),inset_0px_-2.4px_4.8px_0px_rgba(29,78,216,1)]",
                variant === "secondary" && "bg-white text-neutral-800",
                variant === "secondary" &&
                "shadow-[0px_4px_0px_0px_rgba(211,211,211,1),inset_0px_2.4px_4.8px_0px_rgba(0,0,0,0.05),inset_0px_-2.4px_4.8px_0px_rgba(211,211,211,1)]",
                variant === "secondary" &&
                "active:shadow-[0px_1px_0px_0px_rgba(211,211,211,1),inset_0px_2.4px_4.8px_0px_rgba(255,255,255,0.25),inset_0px_-2.4px_4.8px_0px_rgba(211,211,211,1)]",
                "disabled:shadow-[0px_4px_0px_0px_rgba(200,200,200,1),inset_0px_2.4px_4.8px_0px_rgba(255,255,255,0.25),inset_0px_-2.4px_4.8px_0px_rgba(200,200,200,1)]",
                "disabled:active:shadow-[0px_1px_0px_0px_rgba(200,200,200,1),inset_0px_2.4px_4.8px_0px_rgba(255,255,255,0.25),inset_0px_-2.4px_4.8px_0px_rgba(200,200,200,1)]",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
