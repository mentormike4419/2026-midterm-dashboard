const RESULTS_URL = window.MIDTERM_CONFIG && window.MIDTERM_CONFIG.resultsUrl
  ? window.MIDTERM_CONFIG.resultsUrl
  : "./data/results.json";
const AUTO_UPDATE_MS = 120000;
const SECTION_IDS = ["california", "house", "senate"];
const STORAGE_KEY = "midterm-dashboard-favorites-v1";

const feedState = document.querySelector("#feedState");
const feedStateText = document.querySelector("#feedStateText");
const feedNotice = document.querySelector("#feedNotice");
const noticeTitle = document.querySelector("#noticeTitle");
const noticeMessage = document.querySelector("#noticeMessage");
const refreshButton = document.querySelector("#refreshButton");
const startAutoButton = document.querySelector("#startAutoButton");
const stopAutoButton = document.querySelector("#stopAutoButton");
const lastUpdated = document.querySelector("#lastUpdated");

let races = [];
let resultStatus = "not_configured";
let sourceName = "AP Elections API (planned)";
let updatedAt = null;
let refreshTimer = null;
let isRefreshing = false;

function readFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return new Set(Array.isArray(stored) ? stored.filter((item) => typeof item === "string") : []);
  } catch {
    return new Set();
  }
}

const favoriteIds = readFavorites();

function saveFavorites() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favoriteIds)));
  } catch {
    // Favorites still work for the current page if browser storage is unavailable.
  }
}

function safeText(value, fallback) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function formatVotes(value) {
  if (value === null || value === undefined || value === "") return "—";
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? new Intl.NumberFormat("en-US").format(number) : "—";
}

function formatPercent(value) {
  if (value === null || value === undefined || value === "") return "—";
  const number = Number(value);
  return Number.isFinite(number) ? number.toFixed(1) + "%" : "—";
}

function clampPercent(value) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.max(0, Math.min(100, number)) : 0;
}

function partyClass(party) {
  const value = String(party || "").toLowerCase();
  if (value === "r" || value.includes("republican") || value === "gop") return "party-republican";
  if (value === "i" || value.includes("independent")) return "party-independent";
  if (value === "d" || value.includes("democrat")) return "party-democrat";
  return "party-other";
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createCandidate(candidate, race, index) {
  const row = makeElement("div", "candidate-row " + partyClass(candidate.party));
  const top = makeElement("div", "candidate-topline");
  const identity = makeElement("div", "candidate-name");
  identity.append(makeElement("strong", "", safeText(candidate.name, "Candidate")));
  if (candidate.party) identity.append(makeElement("span", "candidate-party", String(candidate.party)));

  const result = makeElement("div", "candidate-result");
  result.append(makeElement("span", "candidate-votes", formatVotes(candidate.votes)));
  result.append(makeElement("span", "candidate-percent", formatPercent(candidate.percent)));
  if (race.winnerName && race.winnerName === candidate.name) {
    result.append(makeElement("span", "winner-tag", "Winner"));
  } else if (race.called && index === 0) {
    result.append(makeElement("span", "winner-tag", "Called"));
  }
  top.append(identity, result);

  const track = makeElement("div", "candidate-bar");
  track.setAttribute("role", "img");
  track.setAttribute("aria-label", safeText(candidate.name, "Candidate") + ": " + formatPercent(candidate.percent));
  const fill = makeElement("span", "candidate-bar-fill");
  fill.style.width = clampPercent(candidate.percent) + "%";
  track.append(fill);
  row.append(top, track);
  return row;
}

function createRaceCard(race) {
  const card = makeElement("article", "race-card");
  const head = makeElement("div", "race-card-head");
  const titleWrap = makeElement("div", "race-card-title-wrap");
  titleWrap.append(makeElement("p", "race-location", safeText(race.location, safeText(race.sectionLabel, "Race"))));
  titleWrap.append(makeElement("h3", "race-title", safeText(race.title, safeText(race.office, "Election race"))));
  if (race.subtitle) titleWrap.append(makeElement("p", "race-subtitle", race.subtitle));

  const isFavorite = favoriteIds.has(race.id);
  const favorite = makeElement("button", "favorite-toggle", isFavorite ? "★" : "☆");
  favorite.type = "button";
  favorite.setAttribute("data-favorite-id", race.id);
  favorite.setAttribute("aria-pressed", String(isFavorite));
  favorite.setAttribute("aria-label", (isFavorite ? "Remove " : "Add ") + safeText(race.title, "race") + (isFavorite ? " from favorites" : " to favorites"));
  head.append(titleWrap, favorite);
  card.append(head);

  if (race.called) card.append(makeElement("span", "race-call", "✓  Race called"));

  const summary = makeElement("div", "race-summary");
  const reporting = makeElement("div", "");
  reporting.append(makeElement("span", "meta-label", "Reporting "));
  reporting.append(makeElement("span", "reporting-value", formatPercent(race.reportingPercent)));
  summary.append(reporting);
  if (race.marginText) summary.append(makeElement("span", "race-margin", race.marginText));
  card.append(summary);

  const candidates = Array.isArray(race.candidates) ? race.candidates.filter((candidate) => candidate && typeof candidate === "object").slice() : [];
  candidates.sort((a, b) => Number(b.votes || 0) - Number(a.votes || 0));
  if (candidates.length) {
    const list = makeElement("div", "candidate-list");
    candidates.forEach((candidate, index) => list.append(createCandidate(candidate || {}, race, index)));
    card.append(list);
  } else {
    card.append(makeElement("p", "card-empty", "Candidate results have not been reported."));
  }
  return card;
}

function renderResults() {
  const favorites = races.filter((race) => favoriteIds.has(race.id));
  const favoritesGrid = document.querySelector("#favoritesGrid");
  const favoritesEmpty = document.querySelector("#favoritesEmpty");
  favoritesGrid.replaceChildren();
  favorites.forEach((race) => favoritesGrid.append(createRaceCard(race)));
  favoritesEmpty.classList.toggle("is-hidden", favorites.length > 0);

  for (const section of SECTION_IDS) {
    const grid = document.querySelector("#" + section + "Grid");
    const empty = document.querySelector("#" + section + "Empty");
    const items = races.filter((race) => race.section === section);
    grid.replaceChildren();
    items.forEach((race) => grid.append(createRaceCard(race)));
    empty.classList.toggle("is-hidden", items.length > 0);
  }
  setNotice();
}

function setFeedIndicator(kind, text) {
  feedState.classList.toggle("is-live", kind === "live");
  feedState.classList.toggle("is-error", kind === "error");
  feedStateText.textContent = text;
}

function setNotice() {
  feedNotice.classList.remove("is-error", "is-live");
  if (resultStatus === "not_configured") {
    setFeedIndicator("idle", "Feed not connected");
    noticeTitle.textContent = "Results feed not connected";
    noticeMessage.textContent = "The dashboard is ready for a secure results service. AP access and coverage still need to be confirmed.";
    lastUpdated.textContent = "Waiting for results feed";
    return;
  }
  if (resultStatus === "error") {
    feedNotice.classList.add("is-error");
    setFeedIndicator("error", "Feed unavailable");
    noticeTitle.textContent = "Results could not be refreshed";
    noticeMessage.textContent = "Check the configured results service. Any previously loaded results remain displayed.";
    return;
  }
  if (races.length === 0) {
    setFeedIndicator("idle", "No results reported");
    noticeTitle.textContent = "No race results received";
    noticeMessage.textContent = "The results service is connected, but it has not returned any races yet.";
  } else {
    feedNotice.classList.add("is-live");
    setFeedIndicator("live", "Results available");
    noticeTitle.textContent = "Results updated";
    noticeMessage.textContent = sourceName + (updatedAt ? " · Updated " + formatUpdatedAt(updatedAt) : "");
  }
  lastUpdated.textContent = updatedAt ? "Updated " + formatUpdatedAt(updatedAt) : "Waiting for first update";
}

function formatUpdatedAt(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "time unavailable";
  return new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit", month: "short", day: "numeric" }).format(date);
}

async function refreshResults() {
  if (isRefreshing) return;
  isRefreshing = true;
  refreshButton.disabled = true;
  refreshButton.classList.add("is-loading");
  try {
    const response = await fetch(RESULTS_URL, { cache: "no-store" });
    if (!response.ok) throw new Error("Results request failed with status " + response.status);
    const payload = await response.json();
    if (!payload || !Array.isArray(payload.races)) throw new Error("The results feed did not contain a races list.");
    resultStatus = payload.status === "not_configured" ? "not_configured" : "ready";
    sourceName = safeText(payload.source, "Results feed");
    updatedAt = payload.updatedAt || null;
    races = payload.races.filter((race) =>
      race &&
      typeof race.id === "string" &&
      SECTION_IDS.includes(race.section)
    );
    renderResults();
  } catch (error) {
    resultStatus = "error";
    setNotice();
    console.warn("Results feed refresh failed:", error);
  } finally {
    isRefreshing = false;
    refreshButton.disabled = false;
    refreshButton.classList.remove("is-loading");
  }
}

function startAutoUpdate() {
  if (refreshTimer) return;
  refreshTimer = window.setInterval(refreshResults, AUTO_UPDATE_MS);
  startAutoButton.disabled = true;
  stopAutoButton.disabled = false;
  refreshResults();
}

function stopAutoUpdate() {
  if (refreshTimer) window.clearInterval(refreshTimer);
  refreshTimer = null;
  startAutoButton.disabled = false;
  stopAutoButton.disabled = true;
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const button = target.closest("[data-favorite-id]");
  if (!button) return;
  const id = button.getAttribute("data-favorite-id");
  if (!id) return;
  if (favoriteIds.has(id)) favoriteIds.delete(id);
  else favoriteIds.add(id);
  saveFavorites();
  renderResults();
});

refreshButton.addEventListener("click", refreshResults);
startAutoButton.addEventListener("click", startAutoUpdate);
stopAutoButton.addEventListener("click", stopAutoUpdate);

renderResults();
refreshResults();