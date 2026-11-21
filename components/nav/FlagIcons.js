export function UkFlag({ size = 20, round = false }) {
  const height = round ? size : size * 0.6;
  const viewBox = round ? "-12 0 84 36" : "0 0 60 36";
  return (
    <svg width={size} height={height} viewBox={viewBox} aria-hidden="true">
      <rect x="-12" width="84" height="36" fill="#00247d" />
      <path d="M0 0L60 36M60 0L0 36" stroke="#fff" strokeWidth="6" />
      <path d="M0 0L60 36M60 0L0 36" stroke="#cf142b" strokeWidth="2" />
      <path d="M30 0V36M0 18H60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0V36M0 18H60" stroke="#cf142b" strokeWidth="6" />
    </svg>
  );
}

export function CambodiaFlag({ size = 20, round = false }) {
  const height = round ? size : size * 0.6;
  const viewBox = round ? "-12 0 84 36" : "0 0 60 36";
  return (
    <svg width={size} height={height} viewBox={viewBox} aria-hidden="true">
      <rect x="-12" width="84" height="36" fill="#032ea1" />
      <rect x="-12" y="9" width="84" height="18" fill="#e00025" />
      <g fill="#fff">
        <rect x="24" y="14" width="12" height="7" />
        <path d="M30 10l2.5 4h-5z" />
        <path d="M25 12l2 3.5h-4z" />
        <path d="M35 12l2 3.5h-4z" />
      </g>
    </svg>
  );
}
