import { useApp } from "./context/AppContext";
import { LangSwitch } from "./components/UI";
import {
  SplashScreen, SignupScreen, LoginScreen,
  ProfileSetupScreen, AlbumSetupScreen, StickersSetupScreen,
  PaywallScreen, HomeScreen, MatchesScreen, MatchDetailScreen,
  AlbumScreen, ChatScreen, ProfileScreen,
} from "./screens/Screens";

const SCREENS = {
  splash:         SplashScreen,
  signup:         SignupScreen,
  login:          LoginScreen,
  "profile-setup": ProfileSetupScreen,
  "album-setup":  AlbumSetupScreen,
  "stickers-setup": StickersSetupScreen,
  paywall:        PaywallScreen,
  home:           HomeScreen,
  matches:        MatchesScreen,
  "match-detail": MatchDetailScreen,
  album:          AlbumScreen,
  chat:           ChatScreen,
  profile:        ProfileScreen,
};

const NAV_TABS = [
  {
    id:"home",
    labelKey:"nav_home",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="2" width="8" height="8" rx="2" fill={active?"#39ff14":"#333"}/>
        <rect x="12" y="2" width="8" height="8" rx="2" fill={active?"#39ff14":"#333"} opacity={active?0.3:1}/>
        <rect x="2" y="12" width="8" height="8" rx="2" fill={active?"#39ff14":"#333"} opacity={active?0.3:1}/>
        <rect x="12" y="12" width="8" height="8" rx="2" fill={active?"#39ff14":"#333"} opacity={active?0.3:1}/>
      </svg>
    ),
  },
  {
    id:"matches",
    labelKey:"nav_matches",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke={active?"#39ff14":"#333"} strokeWidth="1.5"/>
        <path d="M7.5 11l2.5 2.5 4.5-4.5" stroke={active?"#39ff14":"#333"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id:"album",
    labelKey:"nav_album",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 18V8l8-5 8 5v10" stroke={active?"#39ff14":"#333"} strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="8" y="11" width="6" height="7" rx="1.5" stroke={active?"#39ff14":"#333"} strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id:"profile",
    labelKey:"nav_profile",
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="8" r="3.5" stroke={active?"#39ff14":"#333"} strokeWidth="1.5"/>
        <path d="M3 19c0-4 3.5-6 8-6s8 2 8 6" stroke={active?"#39ff14":"#333"} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const MAIN_SCREENS = ["home","matches","album","profile"];
const NO_TOPBAR   = ["splash","chat","match-detail"];
const NO_NAVBAR   = ["splash","signup","login","profile-setup","album-setup","stickers-setup","paywall","chat","match-detail"];

export default function App() {
  const { screen, goTo, t, notifications } = useApp();
  const Screen = SCREENS[screen] ?? HomeScreen;
  const showNav    = !NO_NAVBAR.includes(screen);
  const showTopbar = !NO_TOPBAR.includes(screen);

  return (
    <div style={{
      maxWidth:430, margin:"0 auto", minHeight:"100vh",
      background:"#080808", display:"flex", flexDirection:"column",
      position:"relative",
      /* iPhone safe areas */
      paddingTop:"env(safe-area-inset-top)",
    }}>
      {/* Global top bar */}
      {showTopbar && (
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"12px 16px 8px",
          borderBottom:"1px solid #1a1a1a",
          background:"#080808",
          position:"sticky", top:0, zIndex:100,
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, fontFamily:"'Space Mono',monospace", fontSize:14, color:"#39ff14" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:2, width:22, height:22 }}>
              {[1,2,3,4].map(i=><div key={i} style={{borderRadius:3,background:"#39ff14",opacity:[1,0.3,0.3,1][i-1]}}/>)}
            </div>
            StickerSwap
          </div>
          <LangSwitch />
        </div>
      )}

      {/* Screen content */}
      <div style={{
        flex:1, padding: NO_TOPBAR.includes(screen) ? "16px 16px 0" : "16px",
        display:"flex", flexDirection:"column",
        overflowY: screen==="chat" ? "hidden" : "auto",
        // key forces remount / scroll reset on screen change
      }} key={screen}>
        <Screen />
      </div>

      {/* Bottom nav */}
      {showNav && (
        <div style={{
          display:"flex", justifyContent:"space-around",
          padding:"8px 0",
          paddingBottom:`max(8px, env(safe-area-inset-bottom))`,
          borderTop:"1px solid #1a1a1a",
          background:"#080808",
          position:"sticky", bottom:0, zIndex:100,
        }}>
          {NAV_TABS.map(tab => {
            const active = screen === tab.id;
            return (
              <button key={tab.id} onClick={() => goTo(tab.id)} style={{
                display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                background:"none", border:"none", cursor:"pointer",
                padding:"4px 16px", borderRadius:8,
                position:"relative",
              }}>
                {tab.id==="matches" && notifications>0 && (
                  <div style={{ position:"absolute", top:2, right:10, width:7, height:7, background:"#39ff14", borderRadius:"50%", border:"1.5px solid #080808", boxShadow:"0 0 5px #39ff14" }} />
                )}
                {tab.icon(active)}
                <span style={{ fontSize:9, letterSpacing:"0.04em", color: active ? "#39ff14" : "#444", fontFamily:"inherit" }}>
                  {t(tab.labelKey)}
                </span>
                {active && <div style={{ width:4, height:4, borderRadius:"50%", background:"#39ff14", boxShadow:"0 0 5px #39ff14" }} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
