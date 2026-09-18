const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

export function ChevronLeft({ size = 20, color }) {
  return (
    <svg {...iconProps} style={{ width: size, height: size, color }}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export function ChevronRight({ size = 20, color }) {
  return (
    <svg {...iconProps} style={{ width: size, height: size, color }}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function BookOpenIcon({ size = 16, color }) {
  return (
    <svg {...iconProps} strokeWidth={1.8} style={{ width: size, height: size, color }}>
      <path d="M2 4h7a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H2z" />
      <path d="M22 4h-7a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H22z" />
    </svg>
  );
}

export function RotateIcon({ size = 14, color }) {
  return (
    <svg {...iconProps} strokeWidth={1.8} style={{ width: size, height: size, color }}>
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  );
}

export function HeartIcon({ size = 24, color }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} aria-hidden="true" style={{ width: size, height: size }}>
      <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
    </svg>
  );
}

export function SparklesIcon({ size = 14, color }) {
  return (
    <svg {...iconProps} style={{ width: size, height: size, color }}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}

export function BotanicalPlate() {
  return (
    <svg
      viewBox="0 0 320 300"
      className="folio-plate-art"
      role="img"
      aria-label="Illustration of a stone mortar and pestle with Khmer medicinal plants"
    >
      <rect width="320" height="300" fill="#E3D6BC" />
      <circle cx="160" cy="150" r="118" fill="#EDE3CB" opacity="0.7" />

      {/* back foliage */}
      <g stroke="#6E8158" strokeWidth="2" fill="none" opacity="0.65">
        <path d="M52 196 C52 150 70 116 96 96" />
        <path d="M268 196 C268 150 250 116 224 96" />
      </g>
      <g fill="#7E9163" opacity="0.7">
        <ellipse cx="84" cy="112" rx="19" ry="9" transform="rotate(-38 84 112)" />
        <ellipse cx="66" cy="142" rx="19" ry="9" transform="rotate(-20 66 142)" />
        <ellipse cx="236" cy="112" rx="19" ry="9" transform="rotate(38 236 112)" />
        <ellipse cx="254" cy="142" rx="19" ry="9" transform="rotate(20 254 142)" />
      </g>

      {/* tall stems */}
      <g stroke="#5F7350" strokeWidth="2.5" fill="none">
        <path d="M128 176 C124 128 132 92 142 62" />
        <path d="M192 176 C196 128 188 92 178 62" />
        <path d="M160 174 C160 124 160 92 160 54" />
      </g>
      <g fill="#6E8158">
        <ellipse cx="142" cy="62" rx="9" ry="17" />
        <ellipse cx="178" cy="62" rx="9" ry="17" />
        <ellipse cx="160" cy="54" rx="9" ry="19" />
      </g>
      <g fill="#8CA173">
        <ellipse cx="134" cy="104" rx="15" ry="7" transform="rotate(-28 134 104)" />
        <ellipse cx="186" cy="104" rx="15" ry="7" transform="rotate(28 186 104)" />
        <ellipse cx="146" cy="134" rx="14" ry="7" transform="rotate(-18 146 134)" />
        <ellipse cx="174" cy="134" rx="14" ry="7" transform="rotate(18 174 134)" />
      </g>

      {/* blossoms */}
      <g fill="#C49746">
        <circle cx="118" cy="86" r="5.5" />
        <circle cx="202" cy="86" r="5.5" />
        <circle cx="160" cy="34" r="6.5" />
      </g>

      {/* pestle */}
      <g>
        <rect
          x="206"
          y="120"
          width="13"
          height="86"
          rx="6"
          fill="#A9793F"
          transform="rotate(20 212 163)"
        />
        <ellipse cx="238" cy="130" rx="10" ry="7" fill="#8C6231" transform="rotate(20 238 130)" />
      </g>

      {/* mortar */}
      <path d="M96 196 C96 244 122 268 160 268 C198 268 224 244 224 196 Z" fill="#3F4A3A" />
      <path d="M96 196 C96 244 122 268 160 268 C198 268 224 244 224 196 Z" fill="#2F3A2C" opacity="0.45" />
      <ellipse cx="160" cy="196" rx="64" ry="15" fill="#C49746" />
      <ellipse cx="160" cy="196" rx="52" ry="10" fill="#243020" opacity="0.75" />
      <path d="M134 268 L128 284 L192 284 L186 268 Z" fill="#C49746" />

      {/* seeds and roots on the bench */}
      <g fill="#A9793F" opacity="0.9">
        <circle cx="68" cy="252" r="6" />
        <circle cx="84" cy="262" r="4.5" />
        <circle cx="252" cy="252" r="6" />
        <circle cx="236" cy="262" r="4.5" />
      </g>
      <path
        d="M40 268 C62 258 78 272 96 266"
        stroke="#8C6231"
        strokeWidth="2.5"
        fill="none"
        opacity="0.75"
      />
      <path
        d="M280 268 C258 258 242 272 224 266"
        stroke="#8C6231"
        strokeWidth="2.5"
        fill="none"
        opacity="0.75"
      />
    </svg>
  );
}
