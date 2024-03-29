import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
   children: ReactElement;
   activeClassName: string;
}

export function ActiveLink({
   children,
   activeClassName,
   ...props
}: ActiveLinkProps) {
   const { asPath } = useRouter();
   const className = asPath === props.href ? activeClassName : ''
   return <Link {...props} className={className}>
      {cloneElement(children, { className })}
   </Link>;
}
