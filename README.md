# 2026 Midterm Dashboard

A compact, dark-mode dashboard for following the 2026 U.S. midterm election results relevant to Vista, California. It should make results easy to scan and eventually be shareable with family and friends.

> **Project status:** The initial dashboard shell and client-side controls are implemented locally. Live results and public deployment are not connected. Verify API access, permitted use, and Vista-area race coverage before connecting results.

## Project summary

The dashboard will show all races and ballot measures on the November 3, 2026 ballot for Vista residents, including applicable federal, state, county, city, school, and special-district contests. The exact local contests can vary by voter address and district. For example, Vista's 2026 municipal election includes the mayor's race and City Council Districts 1 and 4.

Use a full-width, compact layout. Show vote totals, margins, percentages, and reporting progress when available. Mark called races with a green check. Users can favorite races and see those favorites with the same vote bars and result details as the main race lists.

The repository is public. The user wants anyone with the dashboard URL, including visitors outside the home network, to be able to view it. A home server is the preferred host, but the public endpoint and secure routing are not configured. GitHub Pages and GitHub Actions were discussed but not selected as the final host.

## Recorded requirements

### Layout and navigation

- Use dark mode and a full-width, compact layout.
- Organize results into California, U.S. House, U.S. Senate, and Vista-area local sections as appropriate.
- Cover all contests relevant to Vista residents, including federal, state, county, city, school, special-district races, and ballot measures where applicable.
- Include a favorites area. Favorite races should retain the same vote bars and information as races in the regular sections.
- Do not add a search bar, unnecessary labels, or extra controls.

### Race results

Show the following for each race when the data source provides it:

- Vote counts
- Vote percentages
- Margin
- Reporting progress
- A green checkmark when the race is called

### Refresh controls

- Place a manual **Refresh** control near the top of the dashboard.
- Place **Start Auto Update** and **Stop Auto Update** controls near Refresh.
- Automatic updating must be **off by default**, including when the dashboard is reopened.
- When enabled, refresh results every two minutes while the page is open. The planned schedule continues across midnight.
- These controls are requirements only; they are not connected to live results yet.

### Priority API and results sources to check

Check these sources in this order. This is the evaluation priority; the California Secretary of State and San Diego County Registrar are the official election authorities for their respective contests and should be used to verify or fill local-result gaps.

1. **Associated Press (AP) Elections API** — Preferred primary aggregator for live results. AP says API requests and the Query Explorer require an API key. To request access, email [elections_api_info@ap.org](mailto:elections_api_info@ap.org) or contact [AP Customer Support](https://customerzone.ap.org/). Ask about 2026 Vista-area coverage, key issuance, pricing, license, and permission to display results on a public dashboard. Each request uses the `x-api-key` header. Keep the key private and out of this public repository. See [AP Elections API](https://developer.ap.org/ap-elections-api/) and [Getting Started](https://developer.ap.org/ap-elections-api/docs/Getting_Started.htm).
2. **Decision Desk HQ (DDHQ)** — Check its results API for race and local coverage, access, licensing, and pricing. DDHQ says it offers election results through API or embed and directs prospective users to contact them for details. See [DDHQ products](https://ddhq.io/products) and [DDHQ FAQ](https://ddhq.io/faq).
3. **California Secretary of State (SOS)** — Check the official statewide results site and Election Night data feed. The SOS guide documents a JSON API and file formats for media clients; access details are provided after signup. Confirm the 2026 access process and the races/reporting fields supplied. See [California Election Results](https://electionresults.sos.ca.gov/) and the [SOS Election Night Data-Feed Guide](https://cms.cdn.sos.ca.gov/media/1-media-guide-v16.pdf).
4. **San Diego County Registrar of Voters (SDVote)** — Check the official live results page and downloadable reports for county, city, school, and special-district contests affecting Vista. Confirm whether a supported machine-readable feed or API is available and its update cadence. See [Current Election](https://www.sdvote.com/content/rov/en/elections/current_election.html) and [Past Election Information](https://www.sdvote.com/content/rov/en/past-election-info.html).

### Data security

- Do not put an AP or DDHQ secret in browser code or commit it to this public repository. Use a small backend on this machine to retrieve protected data.
- Identify an official fallback source for any Vista-area races AP or DDHQ does not cover. Vista's 2026 municipal contests include Mayor and City Council Districts 1 and 4; a voter's exact contests depend on district. See [Vista election information](https://www.vista.gov/city-hall/city-clerk/election-information).
- The exact API agreements, pricing, license, and display/sharing terms for AP and DDHQ still need to be confirmed before live use.
## Questions and outcomes

This section records decisions and open questions carried forward from the design discussion.

| Question or request | Outcome recorded |
| --- | --- |
| What should the dashboard include? | Dark, compact results for the 2026 midterms, with favorites, vote bars, vote counts, margins, percentages, reporting progress, called-race indicators, manual refresh, and opt-in two-minute auto-update. |
| Which local races should be covered? | All races and measures relevant to Vista, CA residents, with local district-level differences accounted for. |
| Should AP access be checked? | Yes. Public documentation was checked: an API key is required, but account access, API license/terms, and exact Vista race coverage remain unverified. |
| Where should it be hosted? | The home server is the preferred host, and the user wants anyone with the dashboard URL to access it, including outside the home network. Public routing and HTTPS are still pending. GitHub Pages/Actions were options, not final decisions. |
| Should the repository be public or private? | Public, as requested. This does not make a locally hosted dashboard publicly accessible. |
| Is implementation underway? | The user explicitly asked to begin building; the initial dashboard shell and client-side interactions are implemented locally. Live results and public deployment are not connected. |

## Decisions versus open items

### Decided

- Project name: **2026 Midterm Dashboard**.
- Repository: [`mentormike4419/2026-midterm-dashboard`](https://github.com/mentormike4419/2026-midterm-dashboard), public.
- Scope: all races and ballot measures relevant to Vista, California residents.
- Visual direction: dark mode, full width, compact.
- Features: favorites, vote bars, vote counts, margins, percentages, reporting progress, called-race checkmarks, manual refresh, and opt-in two-minute auto-update.
- Automatic updates start disabled and stay disabled after reopening.
- The user wants public access through a URL and prefers the home server as the host; the endpoint is not configured.
- The initial dashboard UI has been built locally; live results and public deployment remain unimplemented.

### To resolve before live-results implementation

- Obtain/confirm AP Elections API access and key; confirm the API agreement, license, fees, and display/sharing terms.
- Use the AP query explorer with authorized access to verify which November 3, 2026 races and reporting units are available for Vista.
- Establish the exact Vista-area contest list from official voter/precinct sources, including school and special districts, and identify an official fallback source for any AP gaps.
- Check AP, DDHQ, California SOS, and San Diego County ROV in the priority order listed above; confirm access and terms for each source.
- Configure a public URL and HTTPS for the dashboard; the user has already chosen access for anyone with the link, including outside the home network. Keep administrative access and file shares private.
- If a private AP credential is required, choose and configure the local backend that keeps it out of public source and browser code.

## Current implementation

The local clone contains a responsive dark-mode dashboard shell with California, U.S. House, and U.S. Senate sections, race cards, vote bars, browser-saved favorites, called-race styling, manual refresh, and opt-in two-minute auto-update. Auto-update is off at page load and is not persisted. Vista-specific local contests and ballot measures still need to be added to the presentation and normalized feed.

No election results are fabricated. `data/results.json` marks the feed as not configured and contains no races. The public `config.js` points to that file by default; it can point to a same-origin backend that returns normalized results. No AP request or credential is included in browser code.

A live-results adapter still needs to map verified AP, DDHQ, California SOS, or San Diego County data into the dashboard format. The current feed sections cover `california`, `house`, and `senate`; add a `local` section for Vista-area contests before displaying them.

### Run locally

From the repository root, run `npm start`, then open http://127.0.0.1:4173. The small Node server has no package dependencies and serves only the dashboard files. It binds to `127.0.0.1` by default; `HOST` and `PORT` can be set for a home-server deployment. Network exposure and HTTPS are not configured by the app.

### Validation status

The local preview server previously returned HTTP 200 and the expected page title. Browser content inspection was declined by the browser safety gate, so visual appearance was not reviewed. Automated tests were not run. API access, terms/licensing, Vista race coverage, the results adapter, and public hosting remain unverified or undecided. Do not treat this as a live election-results service.

## Handoff for the next chat agent

Review this README and the election-dashboard design discussion before continuing. Ignore unrelated server hardware and FAMS details. Preserve the settled dashboard choices: dark, full-width, compact layout; California, House, Senate, and Vista-area coverage; favorites; vote bars; counts, margins, percentages, reporting progress, called-race checkmarks; manual refresh; and opt-in two-minute auto-update that starts off and resets to off after reopening. Do not add a search bar or unnecessary controls.

Before connecting live results or finalizing deployment, get or verify these answers:

1. **AP access and permitted use:** Confirm account/API access, key issuance, pricing, licensing, and permission to display and share results publicly. Use AP's authorized query explorer to check Vista-area coverage.
2. **Exact Vista contests:** Establish the November 3, 2026 federal, state, county, city, school, special-district races, and ballot measures relevant to Vista residents from official voter/precinct sources. District-specific contests can vary; ask the user only for the location detail needed to resolve that list.
3. **Source checks:** Follow the priority order above—AP, DDHQ, California SOS, then San Diego County ROV—and verify access, terms, coverage, and reporting cadence for each. Use official sources to verify or fill local gaps. Do not ask the user to restate the source list or order.
4. **Public deployment:** The user has already requested access for anyone with the URL and prefers the home server. Configure the public route and HTTPS when that host is available; keep server administration and file shares private. GitHub Pages/Actions were discussed but not selected.
5. **Credential protection:** If a provider requires a private key, use a backend or serverless service. Never place the key in browser code, the public repository, or chat.

Continue from the existing UI rather than treating the repository as requirements-only. Keep the empty-feed behavior until a permitted, verified results source is connected; do not fabricate results.
