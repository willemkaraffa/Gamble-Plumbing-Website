// Inline SVG icons — small, sharp, no emoji.
const Icon = ({ name, size = 24, stroke = 1.6, ...rest }) => {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round", ...rest };
  switch (name) {
    case "drop":
      return <svg {...common}><path d="M12 3c3.5 4 6 7.2 6 10.5a6 6 0 0 1-12 0C6 10.2 8.5 7 12 3Z"/></svg>;
    case "flame":
      return <svg {...common}><path d="M12 3s4 4 4 8a4 4 0 1 1-8 0c0-1.7 1-3 1-3s.5 1.4 1.6 2c0-2.3 1.4-5 1.4-7Z"/><path d="M9 17a3 3 0 0 0 6 0"/></svg>;
    case "snow":
      return <svg {...common}><path d="M12 2v20M2 12h20M4.5 4.5l15 15M19.5 4.5l-15 15"/><path d="M12 6l-2-2M12 6l2-2M12 18l-2 2M12 18l2 2M6 12l-2-2M6 12l-2 2M18 12l2-2M18 12l2 2"/></svg>;
    case "wrench":
      return <svg {...common}><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2.7-.4-.4-2.7 2.4-2.2Z"/></svg>;
    case "pipe":
      return <svg {...common}><path d="M3 8h6v3a2 2 0 0 0 2 2h2a2 2 0 0 1 2 2v5"/><path d="M9 5v6"/><path d="M21 16h-6"/></svg>;
    case "filter":
      return <svg {...common}><path d="M4 5h16l-6 8v6l-4-2v-4L4 5Z"/></svg>;
    case "fan":
      return <svg {...common}><circle cx="12" cy="12" r="2.5"/><path d="M12 9.5c0-3 1-6 4-6 0 3-1 6-4 6Z"/><path d="M12 14.5c0 3-1 6-4 6 0-3 1-6 4-6Z"/><path d="M14.5 12c3 0 6 1 6 4-3 0-6-1-6-4Z"/><path d="M9.5 12c-3 0-6-1-6-4 3 0 6 1 6 4Z"/></svg>;
    case "wind":
      return <svg {...common}><path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 12h17a3 3 0 1 1-3 3"/><path d="M3 16h9"/></svg>;
    case "heat-pump":
      return <svg {...common}><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="3.5"/><path d="M12 8.5v7M8.5 12h7"/></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case "shield":
      return <svg {...common}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>;
    case "phone":
      return <svg {...common}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>;
    case "star":
      return <svg {...common} fill="currentColor" stroke="none"><path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1L12 2Z"/></svg>;
    case "check":
      return <svg {...common}><path d="m5 12 5 5L20 7"/></svg>;
    case "arrow-right":
      return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case "plus":
      return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case "calendar":
      return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>;
    case "map-pin":
      return <svg {...common}><path d="M12 22s8-7.5 8-13a8 8 0 0 0-16 0c0 5.5 8 13 8 13Z"/><circle cx="12" cy="9" r="3"/></svg>;
    case "google":
      return <svg width={size} height={size} viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.3H12v4.3h5.9c-.3 1.4-1 2.5-2.2 3.3v2.7h3.6c2.1-2 3.3-4.8 3.3-8Z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.3 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2v2.8A11 11 0 0 0 12 23Z"/><path fill="#FBBC04" d="M5.8 14.2A6.6 6.6 0 0 1 5.4 12c0-.8.1-1.5.4-2.2V7H2A11 11 0 0 0 1 12c0 1.8.4 3.5 1.1 5l3.7-2.8Z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2 7l3.8 2.8C6.7 7.2 9.1 5.4 12 5.4Z"/></svg>;
    case "badge-check":
      return <svg {...common}><path d="m12 3 2.4 1.8 3 .2.2 3L19.4 10 17.6 12.4 19.4 14.8l-1.8 2-3 .2L12 19 9.6 17.2l-3-.2-.2-3L4.6 12 6.4 9.6 4.6 7.2l1.8-2 3-.2L12 3Z"/><path d="m9 12 2 2 4-4"/></svg>;
    case "lightning":
      return <svg {...common}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>;
    default:
      return null;
  }
};

window.Icon = Icon;
