
import { cn } from "@/lib/utils";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  isGlass?: boolean;
  isHoverable?: boolean;
  isBordered?: boolean;
  isPadded?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  isGlass = false,
  isHoverable = false,
  isBordered = true,
  isPadded = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl",
        isPadded && "p-6",
        isBordered && "border border-gray-200 dark:border-gray-800",
        isGlass && "glass",
        isHoverable && "glass-hover transform transition-all duration-300 hover:translate-y-[-2px]",
        !isGlass && "bg-white dark:bg-gray-800 shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={cn("mb-4", className)}>{children}</div>;
};

export const CardTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <h3 className={cn("text-xl font-semibold text-gray-900 dark:text-white", className)}>
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <p className={cn("text-sm text-gray-500 dark:text-gray-400", className)}>
      {children}
    </p>
  );
};

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={cn("mt-4 flex items-center justify-between", className)}>
      {children}
    </div>
  );
};
