# 2026 Midterm Dashboard

A compact, dark-mode dashboard for following 2026 U.S. midterm election results, with California, U.S. House, and U.S. Senate coverage. The goal is to make live results easy to scan and to share the finished dashboard with family and friends.

> **Project status:** Requirements and design are recorded. Dashboard implementation has not started. AP API access, licensing, and race coverage still need to be verified.

## Project summary

The dashboard will present election results in a full-width, compact layout. It will show vote totals, margins, percentages, and how much of each race has reported. Called races will be marked with a green check. Users will be able to favorite races and see those favorites with the same vote bars and result details used in the main race lists.

The repository is public, as requested. A public repository can be viewed by anyone on the internet; sharing a future dashboard link with family and friends does not restrict the site to those people. Hosting and audience controls for the dashboard itself have not yet been selected.

## Recorded requirements

### Layout and navigation

- Use dark mode.
- Use a full-width, compact dashboard layout.
- Organize results into California, U.S. House, and U.S. Senate sections.
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
- The design conversation described these controls as design-only; they are not connected to live results yet.

### Data sources and security

- Use the AP Elections API as the primary results source, subject to confirming access, terms/licensing, and coverage.
- The conversation refers to additional user-prioritized sources, but their names and exact priority order were not present in the retrieved conversation record. Confirm those before implementation; do not infer them.
- If AP access uses a private key, do not expose it in browser code or commit it to this public repository. Use a small backend or serverless function to retrieve protected data.
- Confirm AP coverage for the local races the user wants to follow.

## Questions and outcomes

This section records the questions and answers visible in the conversation history retrieved for this project. The earlier individual design-answer turns were not available; the consolidated design decisions above preserve the requirements that were present in the retrieved summary.

| Question or request | Outcome recorded |
| --- | --- |
| “Is that it? Any more questions?” | The design was considered settled. No more design questions were needed at that point. Remaining work was implementation, including checking AP access, licensing, and local-race coverage. |
| Add auto-update and stop-auto-update buttons near Refresh, with auto-updating off | Accepted. Add manual Refresh and Start/Stop Auto Update controls near the top. Auto-update defaults off, refreshes every two minutes while enabled and the page is open, and returns to off when the dashboard is reopened. |
| Does this need to be a Work chat? | ChatGPT Work was recommended for implementation. The design discussion could remain in the current chat, and implementation was to wait until the user explicitly said to begin. |
| Can the dashboard be pushed to a repository and run from there? | Yes. The proposed approach was to store source, configuration, and documentation in GitHub; consider GitHub Pages for hosting; use GitHub Actions for automated deployment; and connect AP results after access is verified. If the AP key is private, use a backend/serverless function so it is not exposed to browsers. Hosting was not finalized. |
| Is there already a repository, or should one be created? | A new repository was requested. The user later created it manually: [`mentormike4419/2026-midterm-dashboard`](https://github.com/mentormike4419/2026-midterm-dashboard). |
| Should the project be public or private? | The user chose public and said the goal is to share the dashboard link with family and friends. The repository is public. This does not by itself publish a working dashboard or decide who can access a future hosted site. |

## Decisions versus open items

### Decided

- Project name: **2026 Midterm Dashboard**.
- Repository: [`mentormike4419/2026-midterm-dashboard`](https://github.com/mentormike4419/2026-midterm-dashboard), public.
- Results scope: California, U.S. House, and U.S. Senate.
- Visual direction: dark mode, full width, compact.
- Features: favorites, vote bars, vote counts, margins, percentages, reporting progress, called-race checkmarks, manual refresh, and opt-in two-minute auto-update.
- Automatic updates start disabled and stay disabled after reopening the dashboard.
- No dashboard build has started; wait for the user to say when to begin.

### To resolve before live-results implementation

- Verify AP Elections API access, permitted use, licensing/terms, and data coverage.
- Confirm the exact supplemental sources and their priority order; these names were not present in the retrieved conversation history.
- Confirm which local races should be included and whether AP covers them.
- Choose hosting after checking AP access. GitHub Pages and GitHub Actions were discussed as options, not final decisions.
- If a private AP credential is required, choose and configure a backend/serverless approach that keeps it out of public source and browser code.

## Implementation boundary

This repository currently captures requirements only. Do not treat the README as evidence that the UI, data integration, refresh behavior, API access, or deployment has been implemented or verified. Begin implementation only after the user says to start.