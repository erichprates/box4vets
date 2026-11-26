import type { SVGProps } from "react";
import type { IconName } from "@/content/site";

type Props = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 24, children, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

const paths: Record<IconName, React.ReactNode> = {
  dna: (
    <>
      <path d="M8 2.5c0 4.75 8 4.75 8 9.5s-8 4.75-8 9.5" />
      <path d="M16 2.5c0 4.75-8 4.75-8 9.5s8 4.75 8 9.5" />
      <path d="M8.4 4.6h7.2M8.4 19.4h7.2M8 12h8M9.6 9.6h4.8M9.6 14.4h4.8" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  searchCheck: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.5-4.5" />
      <path d="M8 11l2 2 4-4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    </>
  ),
  brain: (
    <>
      <path d="M12 4a3 3 0 00-5.6 1.5A3 3 0 004 9a3 3 0 001 5 3 3 0 003 4 3 3 0 004 1V4z" />
      <path d="M12 4a3 3 0 015.6 1.5A3 3 0 0120 9a3 3 0 01-1 5 3 3 0 01-3 4 3 3 0 01-4 1" />
    </>
  ),
  drop: <path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z" />,
  paw: (
    <>
      <circle cx="7" cy="6" r="2" />
      <circle cx="17" cy="6" r="2" />
      <circle cx="4" cy="11" r="1.8" />
      <circle cx="20" cy="11" r="1.8" />
      <path d="M12 11c-3 0-6 4-6 7 0 2 2 3 6 3s6-1 6-3c0-3-3-7-6-7z" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M6 3v6a4 4 0 008 0V3" />
      <path d="M10 13v3a5 5 0 0010 0v-2" />
      <circle cx="20" cy="12" r="2" />
    </>
  ),
  clinic: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21V9l7-5 7 5v12" />
      <path d="M10 21v-5h4v5" />
      <path d="M12 9v3M10.5 10.5h3" />
    </>
  ),
  heart: <path d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z" />,
};

export function Icon({ name, ...rest }: Props & { name: IconName }) {
  return <Base {...rest}>{paths[name]}</Base>;
}

export function ArrowUpRight(props: Props) {
  return (
    <Base {...props}>
      <path d="M7 17L17 7M8 7h9v9" />
    </Base>
  );
}

export function ArrowRight(props: Props) {
  return (
    <Base {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  );
}

export function Plus(props: Props) {
  return (
    <Base {...props}>
      <path d="M12 5v14M5 12h14" />
    </Base>
  );
}

export function Check(props: Props) {
  return (
    <Base {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </Base>
  );
}

export function Minus(props: Props) {
  return (
    <Base {...props}>
      <path d="M6 12h12" />
    </Base>
  );
}

export function Close(props: Props) {
  return (
    <Base {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Base>
  );
}

export function Menu(props: Props) {
  return (
    <Base {...props}>
      <path d="M4 8h16M4 16h16" />
    </Base>
  );
}
