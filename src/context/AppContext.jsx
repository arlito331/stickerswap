import { createContext, useContext, useState, useCallback } from "react";
import { translations } from "../lib/i18n";

const AppContext = createContext(null);

// Mock users for matching demo
const MOCK_USERS = [
  {
    id: 1, initials: "CR", name: "Carlos R.", location: "David, Chiriquí",
    swaps: 23, rating: 4.9, color: "#39ff14", bg: "#0d1f0a",
    missing: { wc2026: [3,7,22,45,67,100], ucl: [20,33,60] },
    extra:   { wc2026: [12,34,56,78,99,120], ucl: [5,18,44] },
  },
  {
    id: 2, initials: "SL", name: "Sofía L.", location: "Colón",
    swaps: 15, rating: 4.7, color: "#00f5ff", bg: "#001f22",
    missing: { wc2026: [12,34,88,100,200], ucl: [44,77] },
    extra:   { wc2026: [3,45,67,120,201], ucl: [18,33] },
  },
  {
    id: 3, initials: "AM", name: "Andrés M.", location: "Santiago, Veraguas",
    swaps: 8, rating: 4.5, color: "#ffbe00", bg: "#1f1500",
    missing: { wc2026: [56,78,99,120,145], ucl: [5,20] },
    extra:   { wc2026: [22,34,67,88,201], ucl: [44,60] },
  },
  {
    id: 4, initials: "JP", name: "Juan P.", location: "Chitré, Herrera",
    swaps: 41, rating: 5.0, color: "#bf00ff", bg: "#1a0a2e",
    missing: { wc2026: [3,22,34,67,201], ucl: [18,33,60] },
    extra:   { wc2026: [56,99,120,145], ucl: [5,44,77] },
  },
];

export function AppProvider({ children }) {
  const [lang, setLangState] = useState("es");
  const [screen, setScreen] = useState("splash");
  const [prevScreen, setPrevScreen] = useState(null);
  const [accountStatus, setAccountStatus] = useState("locked"); // locked | pending | active
  const [selectedAlbumId, setSelectedAlbumId] = useState("wc2026");
  const [missingStickers, setMissingStickers] = useState(new Set([12,34,56,78,99,120,145,167,201,223]));
  const [extraStickers, setExtraStickers] = useState(new Set([3,7,22,45,67,88]));
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const [messages, setMessages] = useState([
    { id: 1, from: "them", text_en: "Hi! I saw we matched for World Cup 2026. I have #12, #34 and #56 that you need!", text_es: "¡Hola! Vi que coincidimos para el Mundial 2026. ¡Tengo las láminas #12, #34 y #56 que te faltan!" },
    { id: 2, from: "me",   text_en: "Hi Carlos! I have #3, #7 and #22 for you. Want to meet up?", text_es: "¡Hola Carlos! Tengo #3, #7 y #22 para ti. ¿Nos encontramos?" },
    { id: 3, from: "them", text_en: "Saturday 11am near Multiplaza?", text_es: "¿El sábado a las 11am cerca de Multiplaza?" },
    { id: 4, from: "me",   text_en: "Yes! See you there 🤝", text_es: "¡Sí! Nos vemos 🤝" },
  ]);
  const [notifications, setNotifications] = useState(3);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  const t = useCallback((key) => {
    return translations[lang]?.[key] ?? translations["en"]?.[key] ?? key;
  }, [lang]);

  const setLang = (l) => setLangState(l);

  const goTo = (s) => {
    setPrevScreen(screen);
    setScreen(s);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (prevScreen) {
      setScreen(prevScreen);
      setPrevScreen(null);
    }
  };

  // Compute matches based on user's missing/extra stickers
  const getMatches = () => {
    return MOCK_USERS.map((user) => {
      const userMissing = new Set(user.missing[selectedAlbumId] ?? []);
      const userExtra   = new Set(user.extra[selectedAlbumId]   ?? []);
      const iGet  = [...missingStickers].filter(n => userExtra.has(n));
      const iGive = [...extraStickers].filter(n => userMissing.has(n));
      return { ...user, iGet, iGive, score: iGet.length + iGive.length };
    })
    .filter(u => u.score > 0)
    .sort((a, b) => b.score - a.score);
  };

  const addSticker = (type, numbers) => {
    const set = type === "missing"
      ? new Set(missingStickers)
      : new Set(extraStickers);
    numbers.forEach(n => set.add(n));
    type === "missing" ? setMissingStickers(set) : setExtraStickers(set);
  };

  const removeSticker = (type, n) => {
    const set = type === "missing"
      ? new Set(missingStickers)
      : new Set(extraStickers);
    set.delete(n);
    type === "missing" ? setMissingStickers(set) : setExtraStickers(set);
  };

  const sendMessage = (text) => {
    setMessages(prev => [...prev, { id: Date.now(), from: "me", text_en: text, text_es: text }]);
  };

  return (
    <AppContext.Provider value={{
      lang, setLang, t,
      screen, goTo, goBack,
      accountStatus, setAccountStatus,
      selectedAlbumId, setSelectedAlbumId,
      missingStickers, extraStickers,
      addSticker, removeSticker,
      selectedMatch, setSelectedMatch,
      chatUser, setChatUser,
      messages, sendMessage,
      getMatches,
      notifications, setNotifications,
      pushEnabled, setPushEnabled,
      emailEnabled, setEmailEnabled,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
