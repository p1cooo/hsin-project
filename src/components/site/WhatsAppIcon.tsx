export function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Z" />
      <path d="M10.7 9.7c-.6.6-1 1.5-1 2.4 0 4.2 5.1 9.3 9.3 9.3.9 0 1.8-.4 2.4-1l1.2-1.5-3.8-2-1.5 1.4a10.3 10.3 0 0 1-3.6-3.6l1.4-1.5-2-3.8-1.4 1.3Z" />
    </svg>
  );
}
