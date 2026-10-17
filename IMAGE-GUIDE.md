# Hsin Travel image guide

The website serves photographs from `public/images/`. **Change image filenames in one place:** `src/lib/media.ts`. The tour and vehicle lists in `src/lib/site-config.ts` choose which of those named images appear in each gallery.

## Where each image appears

| Section | Files in `public/images/` | Keys in `src/lib/media.ts` |
| --- | --- | --- |
| Header, footer and browser icon | `branding/hsin-travel-logo.png` | `logo` |
| Main scenic hero | `hero/hero-langkawi.jpg` | `hero` |
| About Us | `about/about-traveller.jpg` | `about` |
| Tour cards and coverage | `tours/langkawi-beach.jpg`, `penang.jpg`, `singapore.jpg`, `thailand.jpg`, `cameron-highlands.jpg`, `sabah.jpg`, `kuala-lumpur.jpg` | Matching destination keys |
| White and green vans | `fleet/tourist-vans-lineup.jpg`, `tourist-van-luggage.jpg` | `fleetLineup`, `vanLuggage` |
| White Hyundai | `fleet/hyundai-front.jpg`, `hyundai-rear.jpg`, `hyundai-beige-passenger-seats.jpg`, `hyundai-seats-armrests.jpg`, `hyundai-front-seats.jpg`, `hyundai-dashboard.jpg` | `hyFront`, `hyRear`, `hyPassengerSeats`, `hyArmrests`, `hyFrontSeats`, `hyDashboard` |

The hero inset and About Us inset reuse `fleetLineup`. The Van Rental card and luggage showcase reuse `vanLuggage`. The white Hyundai's four interior photos stay in its own gallery. The near-duplicate Hyundai front photo is kept as an original but is not shown on the site.

## Replace a photo

1. Keep a copy of the original somewhere safe. The supplied originals are also in `source-images/attached-originals/` with their original filenames.
2. Prepare a web-sized JPEG or WebP with the same aspect ratio as the current image when possible. About 1600–2000 pixels wide is enough for a scenic hero; the supplied vehicle images are already 1024 pixels wide and under 210 KB each. Keep the small logo near its original 180 × 180 size.
3. **Same filename:** replace the file in `public/images/` and refresh the browser. **New filename:** add the file in the appropriate folder, then change its one path in `src/lib/media.ts`.
4. On a new checkout, install Bun and run `bun install --frozen-lockfile` once. Then run `bun run dev` and check the result at the address Vite prints. To check a production build, run `bun run build`.

For example, to change the homepage van inset, replace `public/images/fleet/tourist-vans-lineup.jpg`, or change the `fleetLineup` path in `src/lib/media.ts`. That same image also appears in the fleet gallery and About Us inset.

## Change a vehicle gallery

Open `src/lib/site-config.ts` and find the `fleet` array. Each vehicle has a `photos` list. To add a photo, put the file in `public/images/fleet/`, give it a path key in `src/lib/media.ts`, then add `{ src: media.yourKey, alt: b("English description", "中文描述") }` to that vehicle's `photos` list. The first photo is the vehicle's main card image. Keep white and green van photos out of the Hyundai entry.

To add another vehicle, copy an existing object in the `fleet` array and give it a unique `id`, bilingual `name` and `description`, and its own `photos` list. Leave passenger and luggage figures blank until the business confirms them.

## Supplied original file map

| Original in `source-images/attached-originals/` | Website file |
| --- | --- |
| `hsin_travel_logo.jpg` | `branding/hsin-travel-logo.png` (white background made transparent) |
| `486574576_1177182230766108_5675418919727990531_n.jpg` | `fleet/hyundai-front.jpg` |
| `486619065_1180613630422968_3272331108528058616_n.jpg` | Near-duplicate front view; original only |
| `485902488_1177182050766126_2756575290065096170_n.jpg` | `fleet/hyundai-rear.jpg` |
| `485774323_1177182387432759_7158308986000002422_n.jpg` | `fleet/hyundai-beige-passenger-seats.jpg` |
| `486073920_1177182294099435_3671721931912719839_n.jpg` | `fleet/hyundai-seats-armrests.jpg` |
| `486108522_1177182024099462_2571043317716540386_n.jpg` | `fleet/hyundai-front-seats.jpg` |
| `486038926_1177182220766109_1859627417191167116_n.jpg` | `fleet/hyundai-dashboard.jpg` |
| `486685946_1180613637089634_7745573188102941244_n.jpg` | `fleet/tourist-vans-lineup.jpg` |
| `486640050_1180613537089644_3316684152344789342_n.jpg` | `fleet/tourist-van-luggage.jpg` |

The scenic images came from this project's existing `src/assets/` folder. The unused Lovable `.asset.json` files describe remote images; the website now uses local paths instead.
