# 🌯 LASSI WASSI — Premium Restaurant Web Platform

A production-ready modern restaurant web application built for **LASSI WASSI**, a Pune-based food brand specializing in slow-roasted chicken and paneer shawarmas, loaded burgers, handcrafted creamy lassi, thick shakes, mojitos, and appetizers across **Kothrud**, **Sinhgad Road**, **Katraj**, and **Bavdhan**.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, delivering high-energy street-food aesthetics combined with high-converting online ordering capabilities.

---

## ⚡ Key Features

- **Cinematic Full-Screen Hero**: Punchy typography (*"TASTE THAT PULLS YOU IN"*), ambient flame gradients, and high-contrast food visuals.
- **Interactive 17-Category Menu Engine**: Categorized strictly according to the official Lassi Wassi menu board:
  - *Shawarma, Shawarma Burgers, Lassi, Juice, Lemonade, Mojito, Coffee, Burgers, Appetizers, Sandwich, Ice Cream, Smoothie, Thick Shake, Summer Slam, Modern Twist, International, Ice Tea.*
  - Search by dish name or ingredients with real-time filtering.
  - One-click pure veg / non-veg dietary toggles.
- **WhatsApp Quick-Order Tray**: Live item counter, quantity modifiers, special notes field, subtotal calculation, and instant pre-filled order generation for the official WhatsApp line (`+91 98602 52911`).
- **Multi-Outlet Pune Locator**: Dedicated cards for **Kothrud**, **Sinhgad Road**, **Katraj**, and **Bavdhan** with one-click Google Maps navigation, hours, and direct ordering.
- **Search Engine & Local SEO**:
  - Valid **JSON-LD Schema** (`Restaurant`, `LocalBusiness`, `FAQPage`, `WebSite`).
  - Dynamic `sitemap.xml` and `robots.txt` generation.
  - AEO/GEO structured FAQ section.
- **Enterprise Analytics & Webmaster Tooling**:
  - Pre-configured Google Analytics 4 (GA4) custom event tracking.
  - Google Search Console (GSC) verification tag support.
  - Bing Webmaster Tools (`msvalidate.01`) verification tag support.
- **Mobile First & Accessible**: WCAG AA compliant contrast, thumb-friendly sticky order bar, and strict `prefers-reduced-motion` accessibility support.

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+ (tested on Node v20/v22/v24)
- npm or yarn or pnpm

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url> lassi-wassi
cd lassi-wassi
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Populate the variables:
```env
# Production domain (e.g., https://lassiwassi.in)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: Google Analytics 4 ID (e.g., G-XXXXXXXXXX)
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Optional: Search Console HTML verification tag
NEXT_PUBLIC_GSC_VERIFICATION=

# Optional: Bing Webmaster verification code
NEXT_PUBLIC_BING_VERIFICATION=
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## ☁️ Deploying to Vercel

1. Push your repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `lassi-wassi` repository.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL`: Set to your production domain (e.g. `https://lassiwassi.in` or `https://lassi-wassi.vercel.app`).
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Your Google Analytics 4 measurement ID.
   - `NEXT_PUBLIC_GSC_VERIFICATION`: Your Google Search Console verification code.
   - `NEXT_PUBLIC_BING_VERIFICATION`: Your Bing Webmaster verification code.
5. Click **Deploy**. Vercel will build and serve your site globally on edge CDN.

---

## 🌐 Custom Domain Setup

1. In your Vercel project dashboard, navigate to **Settings > Domains**.
2. Enter your custom domain (e.g., `lassiwassi.in` and `www.lassiwassi.in`).
3. Add the required DNS records at your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):
   - **Type A**: `@` points to `76.76.21.21`
   - **Type CNAME**: `www` points to `cname.vercel-dns.com`
4. Once DNS propagates, Vercel automatically generates free SSL/TLS certificates.

---

## 🔍 Google Search Console & Sitemap Submission

1. Visit [Google Search Console](https://search.google.com/search-console).
2. Choose **URL Prefix** and enter your domain (`https://lassiwassi.in`).
3. Select **HTML Tag** as the verification method. Copy the verification code string (the value inside `content="..."`).
4. Set that code as `NEXT_PUBLIC_GSC_VERIFICATION` in Vercel environment variables and redeploy.
5. Click **Verify** in Search Console.
6. Once verified, go to **Sitemaps** in the left sidebar, enter `sitemap.xml`, and click **Submit**.
7. Use the **URL Inspection** tool to request indexing for your home page (`/`).

---

## 🔎 Bing Webmaster Tools & IndexNow

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Add your site URL and select **HTML Meta Tag** verification.
3. Copy the token and paste it into `NEXT_PUBLIC_BING_VERIFICATION` in your environment.
4. Redeploy and click **Verify** in Bing Webmaster Tools.
5. In Bing Webmaster, go to **Sitemaps > Submit Sitemap**, and submit `https://your-domain.com/sitemap.xml`.

---

## 📊 Google Analytics 4 (GA4) Tracking

The app includes automatic event dispatchers in `lib/analytics.ts` that log custom conversion metrics without slowing down page load:

| Event Name | Trigger | Parameters |
|---|---|---|
| `order_now_click` | Clicks on "ORDER NOW" buttons | `source` (hero, navbar, mobile, modal) |
| `whatsapp_click` | Outbound WhatsApp conversions | `source`, `items_count`, `order_total` |
| `swiggy_click` | Direct Swiggy outlet links | `outlet` |
| `zomato_click` | Direct Zomato outlet links | `outlet` |
| `outlet_interaction` | Map directions, selection | `outlet_name`, `action_type` |
| `menu_category_select` | Switching among 17 categories | `category_name` |
| `add_to_order_tray` | Adding dish to WhatsApp cart | `item_name`, `item_category`, `price` |

*Note: If `NEXT_PUBLIC_GA_MEASUREMENT_ID` is left empty, analytics code is never loaded, ensuring zero performance penalty.*

---

## 📋 Updating Menu Items & Pricing

All menu items are stored in a typed dataset file:
`data/menuData.ts`

To modify an item or price:
1. Open [`data/menuData.ts`](file:///c:/Users/zaiba/Downloads/lassy/data/menuData.ts).
2. Locate the dish by `id` or name.
3. Update `price`, `description`, `badge`, or `image`.
4. Run `npm run build` to verify types, then commit and push to deploy automatically!

---

## 🏢 Adding or Updating Outlets

Outlets are configured in:
[`data/outletsData.ts`](file:///c:/Users/zaiba/Downloads/lassy/data/outletsData.ts)

Each outlet object contains:
- `name`: Outlet display title
- `area`: Locality in Pune (e.g. Kothrud, Sinhgad Road, Katraj, Bavdhan)
- `landmark`: Physical landmark reference
- `addressNote`: Street details
- `timingNote`: Operating hours
- `googleMapsQuery`: Direct navigation URL
- `swiggyUrl`: Swiggy store URL
- `zomatoUrl`: Zomato store URL
- `phone`: Contact telephone number

---

## 🛡️ License

Private and proprietary to **LASSI WASSI Pune**.
