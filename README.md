# StickerSwap 🟩

> Intercambia láminas con coleccionistas cerca de ti.  
> Find sticker collectors near you and complete your album.

**Stack:** React + Vite (web) · Supabase (DB + Auth) · Expo (mobile - next phase)  
**Market:** Panama 🇵🇦 · Bilingual ES/EN  
**Monetization:** $1/month via manual Yappy confirmation

---

## 🚀 Quick Start

```bash
cd stickerswap
npm install
npm run dev
# → http://localhost:3000
```

---

## 📁 Project Structure

```
stickerswap/
├── index.html              # iPhone-optimized HTML shell
├── vite.config.js
├── package.json
├── supabase_schema.sql     # Full DB schema — run in Supabase SQL editor
└── src/
    ├── main.jsx            # Entry point
    ├── App.jsx             # Navigation + layout + bottom nav
    ├── context/
    │   └── AppContext.jsx  # Global state: lang, screen, user, stickers, matches
    ├── components/
    │   └── UI.jsx          # All shared components (Btn, Input, Card, Avatar...)
    ├── screens/
    │   └── Screens.jsx     # All 13 screens
    └── lib/
        └── i18n.js         # All EN/ES translations + ALBUMS data
```

---

## 🗄️ Supabase Setup

1. Go to [supabase.com](https://supabase.com) → New project
2. SQL Editor → paste contents of `supabase_schema.sql` → Run
3. Storage → Create buckets:
   - `payment-proofs` (private)
   - `avatars` (public)
4. Copy your `SUPABASE_URL` and `SUPABASE_ANON_KEY`
5. Create `.env`:
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
```

---

## 💚 Yappy Payment Flow (Manual)

1. User creates profile → adds stickers → reaches paywall
2. User sends **$1 via Yappy** to your personal number
3. User takes screenshot of confirmed payment
4. User uploads screenshot in the app
5. You receive notification → verify screenshot → approve in Supabase dashboard:
   ```sql
   update payment_proofs set status = 'approved' where id = 'xxx';
   -- This auto-triggers account activation via DB trigger
   ```
6. User gets push notification → account unlocked → can see all matches

**Admin panel (Phase 2):** We'll build a simple admin screen to approve proofs with one tap.

---

## 📱 iPhone Optimization

- `viewport-fit=cover` for edge-to-edge
- `safe-area-inset` padding on top/bottom nav
- `font-size: 16px` on inputs (prevents iOS zoom)
- `-webkit-tap-highlight-color: transparent`
- `overscroll-behavior: none` (no bounce on body)
- `apple-mobile-web-app-capable` for PWA mode

---

## 🗺️ Roadmap

### Phase 1 — NOW (current)
- [x] Full UI: all 13 screens, EN/ES, dark neon design
- [x] Sticker matching algorithm
- [x] Manual Yappy payment flow
- [x] Supabase schema

### Phase 2 — Connect to Supabase
- [ ] Wire auth (sign up, login, session)
- [ ] Save/load stickers from DB
- [ ] Real matches from DB view
- [ ] Real-time chat via Supabase Realtime
- [ ] Upload payment proof to Storage
- [ ] Push notifications (Expo Push)

### Phase 3 — Admin
- [ ] Admin screen to approve Yappy payments
- [ ] User management
- [ ] Monthly renewal reminders

### Phase 4 — Mobile
- [ ] Expo React Native app (shares most logic)
- [ ] App Store + Play Store submission
- [ ] Yappy Business account integration (auto payments)

---

## 🏗️ Environment Variables

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_YAPPY_PHONE=+507 6000-0000   # Your personal Yappy number
```

---

Made with 💚 in Panama 🇵🇦
