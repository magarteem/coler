"use client";

import cn from "classnames";
import { usePathname } from "next/navigation";
import styles from "./linkElement.module.scss";
import Link from "next/link";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
  classNameContainer?: string;
  variant?: "active" | "info" | "md";
}

export const LinkElement = ({
  children,
  to,
  classNameContainer,
  onClick,
  variant,
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  const linkClass = cn(styles.link, variant && styles[variant], {
    [styles.active]: isActive,
  });

  return (
    <Link
      href={to}
      className={cn(linkClass, classNameContainer)}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
