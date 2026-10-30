# 2026 Midterm Dashboard

A compact, dark-mode dashboard for following the 2026 U.S. midterm election results relevant to Vista, California. It should make results easy to scan and eventually be shareable with family and friends.

> **Project status:** Requirements are recorded; dashboard implementation has not started. AP's public documentation confirms that the Elections API provides race and result data and requires an API key. The account's access, applicable license/terms, and exact Vista-area coverage still need verification.

## Project summary

The dashboard will show all races and ballot measures on the November 3, 2026 ballot for Vista residents, including applicable federal, state, county, city, school, and special-district contests. The exact local contests can vary by voter address and district. For example, Vista's 2026 municipal election includes the mayor's race and City Council Districts 1 and 4.

Use a full-width, compact layout. Show vote totals, margins, percentages, and reporting progress when available. Mark called races with a green check. Users can favorite races and see those favorites with the same vote bars and result details as the main race lists.

The repository is public. For now, run the dashboard on this machine; no external hosting or deployment has been selected. A local server is not automatically reachable by family and friends, so public sharing will require a later hosting decision.

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
| Where should it be hosted? | On this machine for now. External hosting and access for family/friends remain undecided. |
| Should the repository be public or private? | Public, as requested. This does not make a locally hosted dashboard publicly accessible. |
| Is implementation underway? | No. The repository currently records requirements only; begin implementation after the user explicitly says to start. |

## Decisions versus open items

### Decided

- Project name: **2026 Midterm Dashboard**.
- Repository: [`mentormike4419/2026-midterm-dashboard`](https://github.com/mentormike4419/2026-midterm-dashboard), public.
- Scope: all races and ballot measures relevant to Vista, California residents.
- Visual direction: dark mode, full width, compact.
- Features: favorites, vote bars, vote counts, margins, percentages, reporting progress, called-race checkmarks, manual refresh, and opt-in two-minute auto-update.
- Automatic updates start disabled and stay disabled after reopening.
- Host on this machine for now.
- No dashboard build has started.

### To resolve before live-results implementation

- Obtain/confirm AP Elections API access and key; confirm the API agreement, license, fees, and display/sharing terms.
- Use the AP query explorer with authorized access to verify which November 3, 2026 races and reporting units are available for Vista.
- Establish the exact Vista-area contest list from official voter/precinct sources, including school and special districts, and identify an official fallback source for any AP gaps.
- Check AP, DDHQ, California SOS, and San Diego County ROV in the priority order listed above; confirm access and terms for each source.
- Decide whether the local site should be reachable only on this machine or also by other devices on the home network. Public family/friend access would require a later hosting decision.
- If a private AP credential is required, choose and configure the local backend that keeps it out of public source and browser code.

## Implementation boundary

This repository currently captures requirements only. Do not treat the README as evidence that the UI, data integration, refresh behavior, AP account access, API terms, or deployment has been implemented or verified. Begin implementation only after the user says to start.