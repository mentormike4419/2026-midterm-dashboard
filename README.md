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

### Data sources and security

- AP Elections API remains the preferred primary results source, pending account access and license/terms confirmation.
- AP's public documentation describes real-time national, state, and local election results and says API requests require an API key. The query explorer requires a key to inspect available event data, so exact coverage of the 2026 Vista-area contests has not yet been verified. See [AP Elections API](https://developer.ap.org/ap-elections-api/) and [Elections Request documentation](https://developer.ap.org/ap-elections-api/docs/Elections_Request.htm).
- Public AP website terms do not establish the license for using API election data in this dashboard. Confirm the applicable API agreement and permitted display/sharing before live use.
- If AP access uses a private key, do not expose it in browser code or commit it to this public repository. Use a small backend on this machine to retrieve protected data.
- Identify an official fallback source for any Vista-area races AP does not cover. The City of Vista lists the 2026 municipal contests as Mayor and City Council Districts 1 and 4; exact voter contests depend on district. See [Vista election information](https://www.vista.gov/city-hall/city-clerk/election-information).
- Supplemental sources and their priority order have not been specified.

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
- Name any supplemental data sources and their priority order.
- Decide whether the local site should be reachable only on this machine or also by other devices on the home network. Public family/friend access would require a later hosting decision.
- If a private AP credential is required, choose and configure the local backend that keeps it out of public source and browser code.

## Implementation boundary

This repository currently captures requirements only. Do not treat the README as evidence that the UI, data integration, refresh behavior, AP account access, API terms, or deployment has been implemented or verified. Begin implementation only after the user says to start.
