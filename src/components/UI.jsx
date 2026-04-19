import { useApp } from "../context/AppContext";

export function LangSwitch() {
  const { lang, setLang } = useApp();
  return (
    <div style={{
      display:"flex", background:"#141414", border:"1px solid #2a2a2a",
      borderRadius:20, overflow:"hidden",
    }}>
      {["en","es"].map(l => (
        <button key={l} onClick={() => setLang(l)} style={{
          padding:"4px 11px", fontSize:10, fontWeight:500,
          border:"none", cursor:"pointer", letterSpacing:"0.06em",
          background: lang===l ? "#39ff14" : "transparent",
          color: lang===l ? "#080808" : "#666",
          fontFamily:"inherit", transition:"all 0.2s",
        }}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Btn({ children, variant="primary", onClick, style={}, disabled=false }) {
  const base = {
    width:"100%", padding:"13px 0", borderRadius:10, border:"none",
    cursor: disabled ? "not-allowed" : "pointer", fontSize:14, fontWeight:500,
    fontFamily:"inherit", display:"flex", alignItems:"center",
    justifyContent:"center", gap:8, transition:"all 0.2s",
    opacity: disabled ? 0.5 : 1,
  };
  const variants = {
    primary:  { background:"#39ff14", color:"#080808", boxShadow:"0 0 18px rgba(57,255,20,0.2)" },
    outline:  { background:"transparent", color:"#fff", border:"1px solid #2a2a2a" },
    ghost:    { background:"transparent", color:"#39ff14", border:"none" },
    danger:   { background:"transparent", color:"#ff4444", border:"1px solid #3a1212" },
  };
  return (
    <button onClick={disabled ? undefined : onClick} style={{...base, ...variants[variant], ...style}}>
      {children}
    </button>
  );
}

export function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom:14 }}>
      {label && <div style={{ fontSize:11, color:"#666", marginBottom:5, fontWeight:500, letterSpacing:"0.04em" }}>{label}</div>}
      <input {...props} style={{
        width:"100%", background:"#0f0f0f", border:"1px solid #2a2a2a",
        borderRadius:10, padding:"10px 12px", color:"#fff", fontSize:13,
        fontFamily:"inherit", outline:"none",
        ...props.style,
      }}
        onFocus={e => e.target.style.borderColor="#39ff14"}
        onBlur={e => e.target.style.borderColor="#2a2a2a"}
      />
    </div>
  );
}

export function Card({ children, style={}, onClick }) {
  return (
    <div onClick={onClick} style={{
      background:"#0f0f0f", border:"1px solid #1e1e1e",
      borderRadius:14, padding:"14px",
      cursor: onClick ? "pointer" : "default",
      ...style,
    }}>
      {children}
    </div>
  );
}

export function Avatar({ initials, color="#39ff14", bg="#0d1f0a", size=36 }) {
  return (
    <div style={{
      width:size, height:size, borderRadius:"50%",
      background:bg, border:`1.5px solid ${color}`,
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize: size*0.3, fontWeight:500, color,
      flexShrink:0, fontFamily:"'Space Mono',monospace",
    }}>
      {initials}
    </div>
  );
}

export function Pill({ children, variant="green", style={} }) {
  const variants = {
    green:  { background:"#0d1f0a", color:"#39ff14", border:"1px solid #1a3a12" },
    cyan:   { background:"#001f22", color:"#00f5ff", border:"1px solid #004a50" },
    amber:  { background:"#1f1500", color:"#ffbe00", border:"1px solid #3a2a00" },
    gray:   { background:"#1a1a1a", color:"#666",    border:"1px solid #2a2a2a" },
    purple: { background:"#1a0a2e", color:"#bf00ff", border:"1px solid #3a0a5e" },
  };
  return (
    <span style={{
      display:"inline-flex", alignItems:"center",
      padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:500,
      ...variants[variant], ...style,
    }}>
      {children}
    </span>
  );
}

export function StickerTag({ number, type="miss", onRemove }) {
  const styles = {
    miss:  { background:"#001f22", color:"#00f5ff", border:"1px solid #004a50" },
    xtra:  { background:"#1f1500", color:"#ffbe00", border:"1px solid #3a2a00" },
  };
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:4,
      fontSize:11, padding:"3px 8px", borderRadius:20,
      margin:"2px 3px 2px 0",
      ...styles[type],
    }}>
      #{number}
      {onRemove && (
        <span onClick={() => onRemove(number)}
          style={{ cursor:"pointer", opacity:0.6, fontSize:13, lineHeight:1 }}>×</span>
      )}
    </span>
  );
}

export function BackBtn({ onClick }) {
  const { t } = useApp();
  return (
    <button onClick={onClick} style={{
      display:"flex", alignItems:"center", gap:6,
      background:"none", border:"none", color:"#666",
      cursor:"pointer", fontSize:13, fontFamily:"inherit",
      marginBottom:14, padding:0, transition:"color 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.color="#39ff14"}
      onMouseLeave={e => e.currentTarget.style.color="#666"}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {t("back")}
    </button>
  );
}

export function SectionLabel({ children }) {
  return (
    <div style={{ fontSize:10, fontWeight:500, color:"#555", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:8 }}>
      {children}
    </div>
  );
}

export function Divider({ margin="14px 0" }) {
  return <div style={{ height:1, background:"#1a1a1a", margin }} />;
}

export function ProgressBar({ pct, style={} }) {
  return (
    <div style={{ height:3, background:"#1a3a12", borderRadius:2, marginTop:8, ...style }}>
      <div style={{ height:3, borderRadius:2, background:"#39ff14", boxShadow:"0 0 6px #39ff14", width:`${pct}%`, transition:"width 0.6s ease" }} />
    </div>
  );
}

export function GlowLine() {
  return <div style={{ height:1, background:"linear-gradient(90deg,transparent,#39ff14,transparent)", margin:"16px 0", opacity:0.2 }} />;
}

export function Toggle({ on, onToggle }) {
  return (
    <div onClick={onToggle} style={{
      width:36, height:20, borderRadius:10,
      background: on ? "#39ff14" : "#2a2a2a",
      position:"relative", cursor:"pointer", transition:"background 0.2s",
      flexShrink:0,
    }}>
      <div style={{
        position:"absolute", top:3,
        left: on ? "calc(100% - 17px)" : 3,
        width:14, height:14, background: on ? "#080808" : "#666",
        borderRadius:"50%", transition:"left 0.2s",
      }} />
    </div>
  );
}

export function MatchScore({ score }) {
  return (
    <span style={{
      marginLeft:"auto", fontSize:12, fontWeight:500, color:"#39ff14",
      background:"#0d1f0a", padding:"4px 10px", borderRadius:20,
      border:"1px solid #1a3a12", whiteSpace:"nowrap",
      boxShadow:"0 0 8px rgba(57,255,20,0.1)",
    }}>
      +{score}
    </span>
  );
}

export function StatBox({ num, label, color="#fff" }) {
  return (
    <div style={{
      flex:1, background:"#0f0f0f", border:"1px solid #1e1e1e",
      borderRadius:10, padding:"10px",
    }}>
      <div style={{ fontSize:20, fontWeight:500, color, fontFamily:"'Space Mono',monospace" }}>{num}</div>
      <div style={{ fontSize:10, color:"#555", marginTop:2 }}>{label}</div>
    </div>
  );
}
