import { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { ALBUMS } from "../lib/i18n";
import {
  Btn, Input, Card, Avatar, Pill, StickerTag, BackBtn,
  SectionLabel, Divider, ProgressBar, GlowLine,
  Toggle, MatchScore, StatBox,
} from "../components/UI";

// ─── SPLASH ──────────────────────────────────────────────
export function SplashScreen() {
  const { t, goTo } = useApp();
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flex:1, padding:"0 24px 32px" }}>
      <div style={{
        width:88, height:88, background:"#0d1f0a",
        border:"1px solid #1a3a12", borderRadius:24,
        display:"flex", alignItems:"center", justifyContent:"center",
        marginBottom:20, boxShadow:"0 0 40px rgba(57,255,20,0.12)",
      }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="4" y="4" width="18" height="18" rx="4" fill="#39ff14"/>
          <rect x="26" y="4" width="18" height="18" rx="4" fill="#39ff14" opacity="0.25"/>
          <rect x="4" y="26" width="18" height="18" rx="4" fill="#39ff14" opacity="0.25"/>
          <rect x="26" y="26" width="18" height="18" rx="4" fill="#39ff14"/>
        </svg>
      </div>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:28, color:"#39ff14", marginBottom:10 }}>
        {t("splash_title")}
      </div>
      <div style={{ fontSize:14, color:"#555", textAlign:"center", marginBottom:32, lineHeight:1.7, whiteSpace:"pre-line" }}>
        {t("splash_sub")}
      </div>
      {[
        { icon: <path d="M2 7l3 3 6-6" stroke="#39ff14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>, key:"feat1" },
        { icon: <><circle cx="6.5" cy="6.5" r="4" stroke="#39ff14" strokeWidth="1.5"/><path d="M6.5 4v2.5l1.5 1.5" stroke="#39ff14" strokeWidth="1.5" strokeLinecap="round"/></>, key:"feat2" },
        { icon: <><circle cx="6.5" cy="4" r="2" stroke="#39ff14" strokeWidth="1.5"/><path d="M2 10c0-2 1.5-3 4.5-3s4.5 1 4.5 3" stroke="#39ff14" strokeWidth="1.5" strokeLinecap="round"/></>, key:"feat3" },
      ].map(f => (
        <div key={f.key} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12, width:"100%" }}>
          <div style={{ width:26, height:26, background:"#0d1f0a", border:"1px solid #1a3a12", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">{f.icon}</svg>
          </div>
          <div style={{ fontSize:13, color:"#aaa" }}>{t(f.key)}</div>
        </div>
      ))}
      <div style={{ width:"100%", marginTop:24 }}>
        <Btn onClick={() => goTo("signup")}>{t("get_started")}</Btn>
        <Btn variant="ghost" onClick={() => goTo("login")} style={{ marginTop:8 }}>{t("sign_in")}</Btn>
      </div>
    </div>
  );
}

// ─── SIGN UP ─────────────────────────────────────────────
export function SignupScreen() {
  const { t, goTo } = useApp();
  return (
    <div style={{ padding:"8px 0 32px", overflowY:"auto" }}>
      <LogoHeader title={t("create_account")} sub={t("join_collectors")} />
      <SocialRow />
      <OrDivider />
      <Input label={t("full_name")} type="text" placeholder="Maria González" />
      <Input label={t("email")} type="email" placeholder="maria@email.com" />
      <Input label={t("password")} type="password" placeholder="••••••••" />
      <Input label={t("confirm_password")} type="password" placeholder="••••••••" />
      <Btn onClick={() => goTo("profile-setup")} style={{ marginTop:4 }}>{t("create_account")}</Btn>
      <TermsText />
      <div style={{ textAlign:"center", marginTop:14 }}>
        <Btn variant="ghost" onClick={() => goTo("login")} style={{ width:"auto", fontSize:12 }}>{t("already_account")}</Btn>
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────
export function LoginScreen() {
  const { t, goTo } = useApp();
  return (
    <div style={{ padding:"8px 0 32px", overflowY:"auto" }}>
      <LogoHeader title={t("welcome_back")} sub={t("sign_in_account")} />
      <SocialRow />
      <OrDivider />
      <Input label={t("email")} type="email" placeholder="maria@email.com" />
      <Input label={t("password")} type="password" placeholder="••••••••" />
      <div style={{ textAlign:"right", marginBottom:16 }}>
        <span style={{ fontSize:11, color:"#39ff14", cursor:"pointer" }}>{t("forgot_password")}</span>
      </div>
      <Btn onClick={() => goTo("home")}>{t("sign_in")}</Btn>
      <Btn variant="ghost" onClick={() => goTo("signup")} style={{ marginTop:8 }}>{t("no_account")}</Btn>
    </div>
  );
}

// ─── PROFILE SETUP ────────────────────────────────────────
export function ProfileSetupScreen() {
  const { t, goTo } = useApp();
  return (
    <div style={{ padding:"8px 0 32px", overflowY:"auto" }}>
      <StepDots total={3} current={0} />
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:18, marginBottom:6 }}>{t("setup_profile")}</div>
      <div style={{ fontSize:13, color:"#555", marginBottom:20, lineHeight:1.6 }}>{t("setup_profile_sub")}</div>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", marginBottom:18 }}>
        <div style={{
          width:72, height:72, borderRadius:"50%", background:"#0d1f0a",
          border:"2px dashed #1a3a12", display:"flex", alignItems:"center",
          justifyContent:"center", cursor:"pointer", marginBottom:8,
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="#39ff14" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={{ fontSize:11, color:"#39ff14", cursor:"pointer" }}>{t("upload_photo")}</span>
      </div>
      <Input label={t("display_name")} type="text" placeholder="Maria G." />
      <Input label={t("city")} type="text" placeholder="Panama City, Panama" />
      <Input label={t("whatsapp")} type="tel" placeholder="+507 6000-0000" />
      <Btn onClick={() => goTo("album-setup")}>{t("continue")}</Btn>
    </div>
  );
}

// ─── ALBUM SETUP ──────────────────────────────────────────
export function AlbumSetupScreen() {
  const { t, goTo, setSelectedAlbumId, selectedAlbumId } = useApp();
  const [selected, setSelected] = useState(new Set([selectedAlbumId]));
  const toggle = (id) => {
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelected(s);
    setSelectedAlbumId(id);
  };
  return (
    <div style={{ padding:"8px 0 32px", overflowY:"auto" }}>
      <StepDots total={3} current={1} />
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:18, marginBottom:6 }}>{t("choose_album")}</div>
      <div style={{ fontSize:13, color:"#555", marginBottom:20 }}>{t("choose_album_sub")}</div>
      {ALBUMS.map(a => (
        <div key={a.id} onClick={() => toggle(a.id)} style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          background: selected.has(a.id) ? "#0d1f0a" : "#0f0f0f",
          border: `1px solid ${selected.has(a.id) ? "#1a3a12" : "#1e1e1e"}`,
          borderRadius:10, padding:"12px 14px", marginBottom:8, cursor:"pointer",
          transition:"all 0.2s",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:20 }}>{a.emoji}</span>
            <div>
              <div style={{ fontSize:13, fontWeight:500 }}>{t(a.nameKey)}</div>
              <div style={{ fontSize:11, color:"#555", marginTop:2 }}>{a.total} stickers</div>
            </div>
          </div>
          <div style={{
            width:20, height:20, borderRadius:"50%",
            border: `1.5px solid ${selected.has(a.id) ? "#39ff14" : "#333"}`,
            background: selected.has(a.id) ? "#39ff14" : "transparent",
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            {selected.has(a.id) && <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="#080808" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
        </div>
      ))}
      <Btn onClick={() => goTo("stickers-setup")} style={{ marginTop:8 }}>{t("continue")}</Btn>
    </div>
  );
}

// ─── STICKERS SETUP ───────────────────────────────────────
export function StickersSetupScreen() {
  const { t, goTo, missingStickers, extraStickers, addSticker, removeSticker } = useApp();
  const [missingInput, setMissingInput] = useState("");
  const [extraInput, setExtraInput] = useState("");

  const handleAdd = (type, val, setVal) => {
    const nums = val.split(/[\s,;]+/).map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0 && n <= 9999);
    if (nums.length) { addSticker(type, nums); setVal(""); }
  };

  return (
    <div style={{ padding:"8px 0 32px", overflowY:"auto" }}>
      <StepDots total={3} current={2} />
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:18, marginBottom:6 }}>{t("your_stickers")}</div>
      <div style={{ fontSize:13, color:"#555", marginBottom:20 }}>{t("your_stickers_sub")}</div>

      <SectionLabel>{t("missing_label")}</SectionLabel>
      <StickerInputRow value={missingInput} onChange={setMissingInput} onAdd={() => handleAdd("missing", missingInput, setMissingInput)} placeholder={t("sticker_number_placeholder")} label={t("add")} />
      <TagRow stickers={missingStickers} type="miss" onRemove={n => removeSticker("missing", n)} />

      <Divider />

      <SectionLabel>{t("extra_label")}</SectionLabel>
      <StickerInputRow value={extraInput} onChange={setExtraInput} onAdd={() => handleAdd("extra", extraInput, setExtraInput)} placeholder={t("sticker_number_placeholder")} label={t("add")} />
      <TagRow stickers={extraStickers} type="xtra" onRemove={n => removeSticker("extra", n)} />

      <Btn onClick={() => goTo("paywall")} style={{ marginTop:16 }}>{t("find_matches")}</Btn>
    </div>
  );
}

// ─── PAYWALL ──────────────────────────────────────────────
export function PaywallScreen() {
  const { t, goTo, accountStatus, setAccountStatus } = useApp();
  const [uploaded, setUploaded] = useState(false);
  const fileRef = useRef();

  if (accountStatus === "pending") {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flex:1, padding:"0 8px", textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:16 }}>⏳</div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:18, marginBottom:10 }}>{t("pending_approval")}</div>
        <div style={{ fontSize:13, color:"#555", lineHeight:1.7, marginBottom:24 }}>{t("pending_sub")}</div>
        <Pill variant="green">{t("pending")}</Pill>
        {/* DEV shortcut */}
        <Btn variant="ghost" onClick={() => { setAccountStatus("active"); goTo("home"); }} style={{ marginTop:24, fontSize:12 }}>
          [Dev] Simulate approval →
        </Btn>
      </div>
    );
  }

  return (
    <div style={{ padding:"8px 0 32px", overflowY:"auto" }}>
      <div style={{ textAlign:"center", marginBottom:16 }}>
        <div style={{
          width:44, height:44, background:"#0d1f0a", border:"1px solid #1a3a12",
          borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center",
          margin:"0 auto 12px", boxShadow:"0 0 20px rgba(57,255,20,0.15)",
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="2" fill="#39ff14"/><rect x="13" y="3" width="8" height="8" rx="2" fill="#39ff14" opacity="0.3"/><rect x="3" y="13" width="8" height="8" rx="2" fill="#39ff14" opacity="0.3"/><rect x="13" y="13" width="8" height="8" rx="2" fill="#39ff14"/></svg>
        </div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:18, marginBottom:4 }}>{t("unlock_app")}</div>
        <div style={{ fontSize:12, color:"#555" }}>{t("unlock_sub")}</div>
      </div>

      <div style={{ textAlign:"center", padding:"14px 0" }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:52, color:"#fff", lineHeight:1 }}>
          <span style={{ fontSize:22, verticalAlign:"top", marginTop:10, display:"inline-block", color:"#39ff14" }}>$</span>1
          <span style={{ fontSize:16, color:"#555", fontWeight:400 }}>/mo</span>
        </div>
        <div style={{ fontSize:12, color:"#555", marginTop:6 }}>{t("less_than_pack")}</div>
      </div>

      {/* 3 steps */}
      <Card style={{ marginBottom:14, background:"#0d1f0a", border:"1px solid #1a3a12" }}>
        {[
          { n:"1", key:"paywall_step1", sub:"paywall_step1_sub" },
          { n:"2", key:"paywall_step2", sub:"paywall_step2_sub" },
          { n:"3", key:"paywall_step3", sub:"paywall_step3_sub" },
        ].map((s, i) => (
          <div key={s.n} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom: i<2 ? 14 : 0 }}>
            <div style={{
              width:24, height:24, borderRadius:"50%", background:"#39ff14",
              color:"#080808", display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:12, fontWeight:700, flexShrink:0, fontFamily:"'Space Mono',monospace",
            }}>{s.n}</div>
            <div>
              <div style={{ fontSize:13, fontWeight:500 }}>{t(s.key)}</div>
              <div style={{ fontSize:11, color:"#39ff14", marginTop:2 }}>{t(s.sub)}</div>
            </div>
          </div>
        ))}
      </Card>

      <input ref={fileRef} type="file" accept="image/*" style={{ display:"none" }}
        onChange={() => { setUploaded(true); setAccountStatus("pending"); }} />

      <Btn onClick={() => fileRef.current.click()} style={{ marginBottom:8 }}>
        📸 {t("upload_proof")}
      </Btn>
      <Btn variant="outline" onClick={() => window.open("https://yappy.com.pa","_blank")}>
        💚 {t("open_yappy")}
      </Btn>
      <div style={{ display:"flex", justifyContent:"center", gap:10, marginTop:14 }}>
        <Pill variant="green" style={{ fontSize:10 }}>{t("no_ads")}</Pill>
        <Pill variant="green" style={{ fontSize:10 }}>{t("cancel_any")}</Pill>
      </div>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────
export function HomeScreen() {
  const { t, goTo, accountStatus, setSelectedMatch, missingStickers, extraStickers, getMatches, notifications, setNotifications } = useApp();
  const matches = getMatches();
  const isLocked = accountStatus !== "active";

  return (
    <div style={{ paddingBottom:80, overflowY:"auto" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:17 }}>{t("hi_user")}, Maria 👋</div>
          <div style={{ fontSize:12, color:"#39ff14", marginTop:3 }}>{matches.length} {t("new_matches_today")}</div>
        </div>
        <div style={{ position:"relative", cursor:"pointer" }} onClick={() => goTo("profile")}>
          <Avatar initials="MG" size={38} />
          {notifications > 0 && (
            <div style={{ position:"absolute", top:-2, right:-2, width:9, height:9, background:"#39ff14", borderRadius:"50%", border:"2px solid #080808", boxShadow:"0 0 6px #39ff14" }} />
          )}
        </div>
      </div>

      {/* Album banner */}
      <div style={{ background:"#0d1f0a", border:"1px solid #1a3a12", borderRadius:14, padding:14, marginBottom:14, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-30, right:-30, width:100, height:100, background:"#39ff14", opacity:0.05, borderRadius:"50%", pointerEvents:"none" }} />
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:13 }}>FIFA World Cup 2026</div>
            <div style={{ fontSize:11, color:"#39ff14", marginTop:3 }}>62% {t("album_progress_label")} · 243 {t("missing_count")}</div>
            <ProgressBar pct={62} />
          </div>
          <Pill variant="green" style={{ cursor:"pointer", marginLeft:12, fontSize:10 }} onClick={() => goTo("album-setup")}>{t("change")}</Pill>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
        <StatBox num={missingStickers.size} label={t("missing")} color="#00f5ff" />
        <StatBox num={extraStickers.size} label={t("extra")} color="#ffbe00" />
        <StatBox num={isLocked ? "?" : matches.length} label={t("matches")} color="#39ff14" />
      </div>

      {/* Locked state */}
      {isLocked ? (
        <Card style={{ textAlign:"center", padding:"20px 16px", marginBottom:14 }}>
          <div style={{ fontSize:32, marginBottom:10 }}>🔒</div>
          <div style={{ fontSize:14, fontWeight:500, marginBottom:6 }}>{matches.length} {t("locked_matches")}</div>
          <div style={{ fontSize:12, color:"#555", marginBottom:16, lineHeight:1.6 }}>{t("unlock_to_see")}</div>
          <Btn onClick={() => goTo("paywall")}>{t("unlock_now")}</Btn>
        </Card>
      ) : (
        <>
          <SectionLabel>{t("top_matches")}</SectionLabel>
          {matches.slice(0,3).map(u => (
            <MatchRow key={u.id} user={u} onClick={() => { setSelectedMatch(u); goTo("match-detail"); }} />
          ))}
        </>
      )}

      <GlowLine />
      <SectionLabel>{t("recent_activity")}</SectionLabel>
      <Card style={{ marginBottom:8 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <Avatar initials="SL" size={30} color="#00f5ff" bg="#001f22" />
          <div style={{ fontSize:12, color:"#ccc" }}>Sofía L. {t("activity_joined")}</div>
          <div style={{ marginLeft:"auto", fontSize:10, color:"#444" }}>2h</div>
        </div>
      </Card>
      <Card>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <Avatar initials="AM" size={30} color="#ffbe00" bg="#1f1500" />
          <div style={{ fontSize:12, color:"#ccc" }}>Andrés M. {t("activity_updated")}</div>
          <div style={{ marginLeft:"auto", fontSize:10, color:"#444" }}>5h</div>
        </div>
      </Card>
    </div>
  );
}

// ─── MATCHES ──────────────────────────────────────────────
export function MatchesScreen() {
  const { t, goTo, accountStatus, setSelectedMatch, getMatches } = useApp();
  const matches = getMatches();
  const isLocked = accountStatus !== "active";

  if (isLocked) {
    return (
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", flex:1, textAlign:"center", padding:"0 8px" }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🔒</div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:18, marginBottom:8 }}>{t("matches_title")}</div>
        <div style={{ fontSize:13, color:"#555", marginBottom:24, lineHeight:1.6 }}>{t("unlock_to_see")}</div>
        <Btn onClick={() => goTo("paywall")}>{t("unlock_now")}</Btn>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom:80, overflowY:"auto" }}>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:18, marginBottom:4 }}>{t("matches_title")}</div>
      <div style={{ fontSize:12, color:"#555", marginBottom:16 }}>{t("matches_sub")}</div>
      {matches.length === 0
        ? <div style={{ fontSize:13, color:"#555", padding:"20px 0", textAlign:"center" }}>{t("no_matches")}</div>
        : matches.map(u => (
            <MatchRow key={u.id} user={u} onClick={() => { setSelectedMatch(u); goTo("match-detail"); }} />
          ))
      }
    </div>
  );
}

// ─── MATCH DETAIL ─────────────────────────────────────────
export function MatchDetailScreen() {
  const { t, goTo, goBack, selectedMatch: u } = useApp();
  if (!u) return null;
  return (
    <div style={{ paddingBottom:32, overflowY:"auto" }}>
      <BackBtn onClick={goBack} />
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
        <Avatar initials={u.initials} size={52} color={u.color} bg={u.bg} />
        <div>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:17 }}>{u.name}</div>
          <div style={{ fontSize:12, color:"#555", marginTop:3 }}>{u.location}</div>
          <div style={{ display:"flex", gap:6, marginTop:6 }}>
            <Pill variant="green">★ {u.rating}</Pill>
            <Pill variant="gray">{u.swaps} {t("swaps_label")}</Pill>
          </div>
        </div>
      </div>

      <div style={{ background:"#0d1f0a", border:"1px solid #1a3a12", borderRadius:10, padding:"10px 12px", display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" fill="#39ff14" opacity="0.15"/><path d="M4.5 7l2 2 3-3" stroke="#39ff14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span style={{ fontSize:12, color:"#39ff14" }}>{t("verified")}</span>
      </div>

      <div style={{ display:"flex", gap:10, marginBottom:12 }}>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:10, fontWeight:500, color:"#00f5ff", marginBottom:6, letterSpacing:"0.05em" }}>{t("i_receive")}</div>
          <div style={{ display:"flex", flexWrap:"wrap" }}>
            {u.iGet.map(n => <StickerTag key={n} number={n} type="miss" />)}
          </div>
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:10, fontWeight:500, color:"#ffbe00", marginBottom:6, letterSpacing:"0.05em" }}>{t("i_give")}</div>
          <div style={{ display:"flex", flexWrap:"wrap" }}>
            {u.iGive.map(n => <StickerTag key={n} number={n} type="xtra" />)}
          </div>
        </div>
      </div>

      <Divider />
      <SectionLabel>{t("meetup_pref")}</SectionLabel>
      <Card style={{ marginBottom:14 }}>
        <div style={{ fontSize:13, color:"#ccc" }}>{t("prefers_person")}</div>
        <div style={{ fontSize:11, color:"#555", marginTop:3 }}>{t("meetup_location")}</div>
      </Card>

      <Btn onClick={() => goTo("chat")}>{t("send_request")}</Btn>
      <Btn variant="outline" onClick={() => goTo("chat")} style={{ marginTop:8 }}>{t("message_user")}</Btn>
    </div>
  );
}

// ─── ALBUM SCREEN ─────────────────────────────────────────
export function AlbumScreen() {
  const { t, missingStickers, extraStickers, addSticker, removeSticker } = useApp();
  const [tab, setTab] = useState("missing");
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const nums = input.split(/[\s,;]+/).map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0);
    if (nums.length) { addSticker(tab, nums); setInput(""); }
  };

  const pct = Math.round((638 - missingStickers.size) / 638 * 100);

  return (
    <div style={{ paddingBottom:80, overflowY:"auto" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:18 }}>{t("my_album")}</div>
        <Pill variant="green" style={{ cursor:"pointer", fontSize:10 }}>{t("add_stickers")}</Pill>
      </div>

      <div style={{ background:"#0d1f0a", border:"1px solid #1a3a12", borderRadius:14, padding:14, marginBottom:14, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-30, right:-30, width:100, height:100, background:"#39ff14", opacity:0.05, borderRadius:"50%", pointerEvents:"none" }} />
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:13 }}>FIFA World Cup 2026</div>
        <div style={{ fontSize:11, color:"#39ff14", marginTop:3 }}>{638 - missingStickers.size} / 638 {t("album_collected_label")}</div>
        <ProgressBar pct={pct} />
      </div>

      <div style={{ display:"flex", gap:6, marginBottom:14 }}>
        {[["missing","missing_tab"],["extra","extra_tab"],["have","have_tab"]].map(([id,key]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            flex:1, padding:"8px 0", borderRadius:8, fontSize:12, cursor:"pointer",
            fontFamily:"inherit", border: "1px solid",
            borderColor: tab===id ? "#1a3a12" : "#2a2a2a",
            background: tab===id ? "#0d1f0a" : "transparent",
            color: tab===id ? "#39ff14" : "#666",
          }}>{t(key)}</button>
        ))}
      </div>

      {tab !== "have" && (
        <StickerInputRow value={input} onChange={setInput} onAdd={handleAdd} placeholder={t("sticker_number_placeholder")} label={t("add")} />
      )}

      {tab === "missing" && (
        missingStickers.size === 0
          ? <EmptyState label={t("no_stickers_missing")} />
          : <TagRow stickers={missingStickers} type="miss" onRemove={n => removeSticker("missing", n)} />
      )}
      {tab === "extra" && (
        extraStickers.size === 0
          ? <EmptyState label={t("no_stickers_extra")} />
          : <TagRow stickers={extraStickers} type="xtra" onRemove={n => removeSticker("extra", n)} />
      )}
      {tab === "have" && <EmptyState label={t("have_placeholder")} />}
    </div>
  );
}

// ─── CHAT ─────────────────────────────────────────────────
export function ChatScreen() {
  const { t, goBack, messages, sendMessage, lang, selectedMatch } = useApp();
  const [input, setInput] = useState("");
  const bottomRef = useRef();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  const handle = () => { if (input.trim()) { sendMessage(input.trim()); setInput(""); } };
  const u = selectedMatch;

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", minHeight:0 }}>
      <BackBtn onClick={goBack} />
      <div style={{ display:"flex", alignItems:"center", gap:10, paddingBottom:12, borderBottom:"1px solid #1a1a1a", marginBottom:12 }}>
        <div style={{ width:8, height:8, borderRadius:"50%", background:"#39ff14", boxShadow:"0 0 6px #39ff14", flexShrink:0 }} />
        <Avatar initials={u?.initials ?? "CR"} size={32} color={u?.color ?? "#39ff14"} bg={u?.bg ?? "#0d1f0a"} />
        <div>
          <div style={{ fontSize:13, fontWeight:500 }}>{u?.name ?? "Carlos R."}</div>
          <div style={{ fontSize:10, color:"#39ff14" }}>{t("online")}</div>
        </div>
      </div>
      <div style={{ flex:1, overflowY:"auto", display:"flex", flexDirection:"column", paddingBottom:8 }}>
        <div style={{ textAlign:"center", fontSize:10, color:"#333", marginBottom:10 }}>{t("today")}</div>
        {messages.map(m => (
          <div key={m.id} style={{
            maxWidth:"80%", padding:"9px 12px", borderRadius:12, fontSize:13, lineHeight:1.5, marginBottom:6,
            ...(m.from === "me"
              ? { background:"#0d1f0a", border:"1px solid #1a3a12", color:"#fff", alignSelf:"flex-end", borderBottomRightRadius:3, marginLeft:"auto" }
              : { background:"#161616", border:"1px solid #222", color:"#ddd", alignSelf:"flex-start", borderBottomLeftRadius:3 }
            ),
          }}>
            {m[`text_${lang}`] ?? m.text_en}
          </div>
        ))}
        <div style={{ background:"#0d1f0a", border:"1px solid #1a3a12", borderRadius:10, padding:"10px 12px", fontSize:12, color:"#39ff14", textAlign:"center", marginTop:6 }}>
          {t("exchange_confirmed")}
        </div>
        <div ref={bottomRef} />
      </div>
      <div style={{ display:"flex", gap:8, alignItems:"center", paddingTop:10, borderTop:"1px solid #1a1a1a" }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key==="Enter" && handle()}
          placeholder={t("chat_placeholder")}
          style={{ flex:1, background:"#0f0f0f", border:"1px solid #222", borderRadius:20, padding:"9px 14px", color:"#fff", fontSize:13, fontFamily:"inherit", outline:"none" }}
          onFocus={e => e.target.style.borderColor="#39ff14"}
          onBlur={e => e.target.style.borderColor="#222"}
        />
        <button onClick={handle} style={{ width:36, height:36, background:"#39ff14", border:"none", borderRadius:"50%", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 0 10px rgba(57,255,20,0.3)", flexShrink:0 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 7 2 2v4l7 1-7 1v4z" fill="#080808"/></svg>
        </button>
      </div>
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────
export function ProfileScreen() {
  const { t, goTo, accountStatus, missingStickers, extraStickers, pushEnabled, setPushEnabled, emailEnabled, setEmailEnabled } = useApp();
  return (
    <div style={{ paddingBottom:80, overflowY:"auto" }}>
      <div style={{ textAlign:"center", marginBottom:18 }}>
        <div style={{
          width:68, height:68, borderRadius:"50%", background:"#0d1f0a",
          border:"2px solid #39ff14", display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:18, fontWeight:500, color:"#39ff14", margin:"0 auto 10px",
          fontFamily:"'Space Mono',monospace", boxShadow:"0 0 20px rgba(57,255,20,0.12)",
        }}>MG</div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:17 }}>Maria González</div>
        <div style={{ fontSize:12, color:"#555", marginTop:3 }}>Panama City · {t("member_since")} 2025</div>
        <div style={{ display:"flex", justifyContent:"center", gap:8, marginTop:8 }}>
          <Pill variant="green">★ 4.8</Pill>
          <Pill variant="gray">{t("verified_badge")}</Pill>
          <Pill variant={accountStatus==="active" ? "green" : "amber"}>
            {accountStatus==="active" ? t("active") : t("pending")}
          </Pill>
        </div>
      </div>

      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        <div style={{ flex:1, background:"#0f0f0f", border:"1px solid #1e1e1e", borderRadius:10, padding:10, textAlign:"center" }}>
          <div style={{ fontSize:20, fontWeight:500, color:"#39ff14", fontFamily:"'Space Mono',monospace" }}>31</div>
          <div style={{ fontSize:10, color:"#555", marginTop:2 }}>{t("swaps_done")}</div>
        </div>
        <div style={{ flex:1, background:"#0f0f0f", border:"1px solid #1e1e1e", borderRadius:10, padding:10, textAlign:"center" }}>
          <div style={{ fontSize:20, fontWeight:500, color:"#39ff14", fontFamily:"'Space Mono',monospace" }}>3</div>
          <div style={{ fontSize:10, color:"#555", marginTop:2 }}>{t("albums")}</div>
        </div>
        <div style={{ flex:1, background:"#0f0f0f", border:"1px solid #1e1e1e", borderRadius:10, padding:10, textAlign:"center" }}>
          <div style={{ fontSize:20, fontWeight:500, color:"#39ff14", fontFamily:"'Space Mono',monospace" }}>{missingStickers.size}</div>
          <div style={{ fontSize:10, color:"#555", marginTop:2 }}>{t("missing")}</div>
        </div>
      </div>

      <SectionLabel>{t("my_albums_label")}</SectionLabel>
      {[["FIFA World Cup 2026","62%"],["Pokémon Journey","81%"],["Disney 100 Years","45%"]].map(([name,pct]) => (
        <div key={name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#0f0f0f", border:"1px solid #1e1e1e", borderRadius:10, padding:"10px 14px", marginBottom:8, cursor:"pointer" }}>
          <div style={{ fontSize:13, fontWeight:500 }}>{name}</div>
          <div style={{ fontSize:12, color:"#39ff14" }}>{pct}</div>
        </div>
      ))}

      <Divider margin="16px 0" />
      <SectionLabel>{t("settings")}</SectionLabel>
      <Card>
        <SettingRow label={t("push_notif")} sub={t("push_notif_sub")} on={pushEnabled} onToggle={() => setPushEnabled(!pushEnabled)} />
        <Divider margin="0" />
        <SettingRow label={t("email_alerts")} on={emailEnabled} onToggle={() => setEmailEnabled(!emailEnabled)} />
        <Divider margin="0" />
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 0", cursor:"pointer" }} onClick={() => goTo("splash")}>
          <div style={{ fontSize:13, color:"#ff4444" }}>{t("sign_out")}</div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10 3l4 4-4 4M14 7H5" stroke="#ff4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </Card>

      {accountStatus !== "active" && (
        <>
          <Divider margin="16px 0" />
          <Btn onClick={() => goTo("paywall")}>{t("unlock_now")}</Btn>
        </>
      )}
    </div>
  );
}

// ─── SHARED SUB-COMPONENTS ────────────────────────────────

function LogoHeader({ title, sub }) {
  return (
    <div style={{ textAlign:"center", margin:"10px 0 20px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:3, width:36, height:36, margin:"0 auto 10px" }}>
        {[1,2,3,4].map(i => <div key={i} style={{ borderRadius:4, background:"#39ff14", opacity: [1,0.3,0.3,1][i-1] }} />)}
      </div>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:18, marginBottom:4 }}>{title}</div>
      <div style={{ fontSize:12, color:"#555", marginTop:4 }}>{sub}</div>
    </div>
  );
}

function SocialRow() {
  return (
    <div style={{ display:"flex", gap:8, marginBottom:12 }}>
      {[["#4285F4","Google"],["#1877F2","Facebook"]].map(([c,name]) => (
        <button key={name} style={{ flex:1, padding:10, background:"#0f0f0f", border:"1px solid #2a2a2a", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", gap:8, cursor:"pointer", fontSize:12, color:"#ccc", fontFamily:"inherit" }}>
          <div style={{ width:14, height:14, borderRadius:"50%", background:c }} />{name}
        </button>
      ))}
    </div>
  );
}

function OrDivider() {
  const { t } = useApp();
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, margin:"10px 0" }}>
      <div style={{ flex:1, height:1, background:"#1a1a1a" }} />
      <div style={{ fontSize:11, color:"#333" }}>{t("or")}</div>
      <div style={{ flex:1, height:1, background:"#1a1a1a" }} />
    </div>
  );
}

function TermsText() {
  const { t } = useApp();
  return (
    <div style={{ fontSize:10, color:"#333", textAlign:"center", marginTop:12, lineHeight:1.6 }}>
      {t("agree_terms")} <span style={{ color:"#39ff14", cursor:"pointer" }}>{t("terms")}</span> {t("and")} <span style={{ color:"#39ff14", cursor:"pointer" }}>{t("privacy")}</span>
    </div>
  );
}

function StepDots({ total, current }) {
  return (
    <div style={{ display:"flex", justifyContent:"center", gap:6, marginBottom:18 }}>
      {Array.from({length:total}).map((_, i) => (
        <div key={i} style={{
          height:7, borderRadius: i===current ? 4 : "50%",
          width: i===current ? 20 : 7,
          background: i===current ? "#39ff14" : "#2a2a2a",
          boxShadow: i===current ? "0 0 6px #39ff14" : "none",
          transition:"all 0.3s",
        }} />
      ))}
    </div>
  );
}

function MatchRow({ user: u, onClick }) {
  return (
    <div onClick={onClick} style={{
      display:"flex", alignItems:"center", gap:10, padding:"10px 0",
      borderBottom:"1px solid #161616", cursor:"pointer",
    }}>
      <Avatar initials={u.initials} color={u.color} bg={u.bg} />
      <div>
        <div style={{ fontSize:13, fontWeight:500 }}>{u.name}</div>
        <div style={{ fontSize:11, color:"#555", marginTop:2 }}>{u.location} · {u.score} stickers</div>
      </div>
      <MatchScore score={u.score} />
    </div>
  );
}

function StickerInputRow({ value, onChange, onAdd, placeholder, label }) {
  return (
    <div style={{ position:"relative", marginBottom:8 }}>
      <input value={value} onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key==="Enter" && onAdd()}
        placeholder={placeholder}
        style={{ width:"100%", background:"#0f0f0f", border:"1px solid #2a2a2a", borderRadius:10, padding:"10px 70px 10px 12px", color:"#fff", fontSize:13, fontFamily:"inherit", outline:"none" }}
        onFocus={e => e.target.style.borderColor="#39ff14"}
        onBlur={e => e.target.style.borderColor="#2a2a2a"}
      />
      <button onClick={onAdd} style={{ position:"absolute", right:4, top:4, background:"#39ff14", color:"#080808", border:"none", borderRadius:7, padding:"6px 12px", fontSize:12, fontWeight:500, cursor:"pointer", fontFamily:"inherit" }}>
        {label}
      </button>
    </div>
  );
}

function TagRow({ stickers, type, onRemove }) {
  const sorted = [...stickers].sort((a,b)=>a-b);
  return (
    <div style={{ display:"flex", flexWrap:"wrap", minHeight:28, marginBottom:12 }}>
      {sorted.map(n => <StickerTag key={n} number={n} type={type} onRemove={onRemove} />)}
    </div>
  );
}

function EmptyState({ label }) {
  return <div style={{ fontSize:13, color:"#444", padding:"20px 0", textAlign:"center" }}>{label}</div>;
}

function SettingRow({ label, sub, on, onToggle }) {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 0" }}>
      <div>
        <div style={{ fontSize:13 }}>{label}</div>
        {sub && <div style={{ fontSize:11, color:"#555", marginTop:2 }}>{sub}</div>}
      </div>
      <Toggle on={on} onToggle={onToggle} />
    </div>
  );
}
