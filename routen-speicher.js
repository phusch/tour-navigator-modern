/* Huschel App Speicher für Routen Navigator V4.1.3 – zusätzliche Ansicht, eigene Supabase-Sitzung */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const PROJECT_URL = 'https://qijordwpbwwbizfcslrv.supabase.co';
const EXPECTED_UID = '9be7d1bc-4d69-4cb8-bb42-cb2d3c705f75';
const APP_ID = 'tour-navigator';
const KEY_SETTING = 'huschel-routen-navigator-publishable-v1';
const EMAIL_SETTING = 'huschel-routen-navigator-email-v1';
const AUTH_STORAGE_KEY = 'huschel-routen-navigator-auth-session-v1';
const THEME_SETTING = 'huschel-routen-navigator-theme-v1';
const $ = id => document.getElementById(id);
const bridge = window.HuschelRoutenBridge;
let client = null, clientKey = null, authenticated = false, busy = false;
let cloudSha = undefined, cloudRevision = 0, cloudSavedAt = null, cloudExists = false;
let cloudData = null, oldScroll = 0;

function note(text) { $('rnMessage').textContent = text; }
function lamp(text, mode = 'warning') {
  $('rnLamp').className = 'rn-lamp ' + mode;
  $('rnLamp').textContent = (mode === 'ok' ? '🟢 ' : mode === 'error' ? '🔴 ' : '🟡 ') + text;
}
function metadata() {
  const date = cloudSavedAt ? new Date(cloudSavedAt).toLocaleString('de-DE') : '–';
  $('rnCloudMeta').textContent = `Privater GitHub-Speicher · Revision: ${cloudSha === undefined ? 'nicht geprüft' : cloudRevision} · Letzte Speicherung: ${date}`;
}
function authStatus(yes, email = '', message = '') {
  authenticated = yes;
  $('rnAuthFields').hidden = yes;
  $('rnSignedIn').hidden = !yes;
  $('rnAuthBox').classList.toggle('signed-in', yes);
  $('rnAuthStatus').className = 'rn-auth-status' + (yes ? ' ok' : '');
  $('rnAuthStatus').textContent = yes ? '🟢 Angemeldet · Supabase-Zugang aktiv' : (message || '⚪ Nicht angemeldet · für GitHub bitte anmelden');
  $('rnEmailDisplay').textContent = email;
}
function semanticData(snapshot) {
  // savedAt ändert sich bei jedem routeSnapshot()-Aufruf. lastImportKind ist ein UI-Hinweis;
  // nur inhaltliche Routendaten sind für die Speicherampel maßgeblich.
  if (!snapshot || !Array.isArray(snapshot.points)) throw Error('Ungültige Tourdaten.');
  return {
    tourTitle: snapshot.tourTitle,
    points: snapshot.points,
    currentDayIndex: snapshot.currentDayIndex,
    navApp: snapshot.navApp
  };
}
function same(a, b) {
  try { return JSON.stringify(semanticData(a)) === JSON.stringify(semanticData(b)); }
  catch { return false; }
}
function refreshLamp() {
  if (busy) return;
  if (cloudSha === undefined) {
    lamp('GitHub-Speicherstand noch nicht geprüft'); return;
  }
  if (!cloudExists) {
    lamp('Noch keine Route auf GitHub – zuerst speichern'); return;
  }
  if (same(bridge.read(), cloudData)) lamp('Aktuelle Route sicher auf GitHub gespeichert', 'ok');
  else lamp('Aktuelle Route weicht vom GitHub-Speicherstand ab');
}
function makeClient(key) {
  if (client && clientKey === key) return client;
  const old = client;
  const current = createClient(PROJECT_URL, key, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false, storageKey: AUTH_STORAGE_KEY }
  });
  client = current; clientKey = key;
  if (old && old !== current) void old.auth.stopAutoRefresh();
  current.auth.onAuthStateChange(event => {
    if (current !== client) return;
    if (event === 'SIGNED_OUT') {
      authStatus(false);
      if (!busy) note('Du bist abgemeldet. Die Routendaten bleiben unverändert.');
    }
  });
  return current;
}
async function restore() {
  const key = $('rnKey').value.trim();
  if (!key.startsWith('sb_publishable_')) return;
  const current = makeClient(key);
  $('rnAuthStatus').textContent = '🟡 Gespeicherte Anmeldung wird geprüft…';
  try {
    const { data: sessionInfo, error: sessionError } = await current.auth.getSession();
    if (current !== client) return;
    if (sessionError) throw sessionError;
    if (!sessionInfo.session) { authStatus(false); return; }
    const { data, error } = await current.auth.getUser();
    if (current !== client) return;
    if (error || data.user?.id !== EXPECTED_UID) {
      await current.auth.signOut({ scope: 'local' });
      throw error || Error('Dieses Konto ist nicht für den Speicher freigegeben.');
    }
    authStatus(true, data.user.email || $('rnEmail').value.trim());
    note('Anmeldung automatisch wiederhergestellt. Du kannst GitHub laden oder speichern.');
  } catch (e) {
    if (current !== client) return;
    authStatus(false, '', '🔴 Gespeicherte Anmeldung ungültig · bitte erneut anmelden');
    note('Anmeldung konnte nicht wiederhergestellt werden: ' + (e?.message || e));
  }
}
async function execute(action, fn) {
  if (busy) return;
  busy = true;
  document.querySelectorAll('#rnStorageView button').forEach(el => el.disabled = true);
  try { await fn(); }
  catch (e) {
    const reason = String(e?.message || e || 'Unbekannter Fehler');
    if (action === 'Anmeldung') {
      authStatus(false, '', '🔴 Anmeldung fehlgeschlagen · Zugangsdaten prüfen');
      $('rnPass').value = '';
    }
    lamp(`${action} fehlgeschlagen`, 'error');
    note(`${action} fehlgeschlagen: ${reason}\nDeine aktuellen Routendaten wurden nicht automatisch überschrieben.`);
  }
  finally {
    busy = false;
    document.querySelectorAll('#rnStorageView button').forEach(el => el.disabled = false);
    if (action === 'Anmeldung' && authenticated) refreshLamp();
  }
}
function cancelled(action) {
  lamp(`${action} von dir abgebrochen – Routendaten unverändert`);
  note('Du hast den Ladevorgang abgebrochen. Weder die geöffnete Route noch die GitHub-Datei wurde geändert.');
}
async function invoke(payload) {
  if (!authenticated || !client) throw Error('Bitte zuerst bei Supabase anmelden.');
  const { data, error } = await client.functions.invoke('github-app-storage', { body: payload });
  if (error) {
    let reason = error.message || 'Verbindungsproblem';
    if (error.context instanceof Response) {
      reason += ` (HTTP ${error.context.status})`;
      try {
        const details = await error.context.json();
        reason += ': ' + (details.error || JSON.stringify(details));
      } catch {}
    }
    throw Error(reason);
  }
  if (!data?.ok) throw Error(data?.error || 'GitHub-Antwort ungültig.');
  return data;
}
function validateSnapshot(data) {
  if (!data || data.format !== 'TourNavigatorModern-Backup' || !Array.isArray(data.points) ||
      typeof data.tourTitle !== 'string' || !data.points.every(p => p && typeof p === 'object' && !Array.isArray(p))) {
    throw Error('Der gespeicherte Stand ist keine gültige Routen-Navigator-Sicherung. Es wurde nichts übernommen.');
  }
}
function setRemote(result) {
  cloudSha = result.sha;
  cloudRevision = result.revision;
  cloudSavedAt = result.savedAt;
  cloudExists = !!result.exists;
  cloudData = result.exists ? result.data : null;
  metadata();
}
function requireChecked() {
  if (cloudSha === undefined) throw Error('Bitte zuerst „GitHub Laden“ wählen. Dadurch wird der aktuelle Versionsstand geprüft.');
}

$('rnLogin').addEventListener('click', () => execute('Anmeldung', async () => {
  const key = $('rnKey').value.trim();
  if (!key.startsWith('sb_publishable_')) throw Error('Bitte den Supabase Publishable Key eintragen, keinen Secret Key.');
  const current = makeClient(key);
  const email = $('rnEmail').value.trim();
  const password = $('rnPass').value;
  try {
    const { data, error } = await current.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (data.user?.id !== EXPECTED_UID) {
      await current.auth.signOut();
      throw Error('Dieses Supabase-Konto ist nicht freigegeben.');
    }
    authStatus(true, email);
    try { localStorage.setItem(KEY_SETTING,key); localStorage.setItem(EMAIL_SETTING,email); } catch {}
    note('Supabase-Anmeldung erfolgreich. Du kannst GitHub Laden wählen.');
  } finally { $('rnPass').value = ''; }
}));
$('rnLogout').addEventListener('click', () => execute('Abmeldung', async () => {
  if (client) await client.auth.signOut();
  client = null; clientKey = null;
  authStatus(false); cloudSha = undefined; cloudRevision = 0;
  cloudSavedAt = null; cloudExists = false; cloudData = null;
  metadata(); lamp('Abgemeldet · GitHub-Speicherstand nicht geprüft');
  note('Sitzung beendet. Die aktuelle Route und lokale Speicherstände bleiben unverändert.');
}));
$('rnGithubLoad').addEventListener('click', () => execute('GitHub Laden', async () => {
  const result = await invoke({ action:'load', app: APP_ID });
  if (result.exists) validateSnapshot(result.data);
  setRemote(result);
  if (!result.exists) {
    lamp('Noch keine Route auf GitHub – zuerst speichern');
    note('Für „Routen Navigator“ liegt noch keine private data.json vor. Deine geöffnete Route bleibt bestehen. Wähle „GitHub Speichern“, um sie erstmals abzulegen.');
    return;
  }
  if (same(bridge.read(), result.data)) {
    lamp('Route entspricht bereits dem GitHub-Speicherstand', 'ok');
    note(`Daten identisch. GitHub-Revision ${cloudRevision} wurde geprüft; kein Austausch erforderlich.`);
    return;
  }
  if (!confirm('GitHub Laden ersetzt die aktuell geöffnete Route durch den privaten Speicherstand.\n\nBitte vorher bei Bedarf ein JSON-Backup erstellen.\n\nRoute von GitHub übernehmen?')) {
    cancelled('GitHub Laden'); return;
  }
  bridge.apply(result.data);
  lamp('Route von GitHub geladen', 'ok');
  note(`GitHub-Revision ${cloudRevision} geladen. Der bisherige lokale Browser-Autospeicher enthält jetzt ebenfalls die geladene Route.`);
}));
$('rnGithubSave').addEventListener('click', () => execute('GitHub Speichern', async () => {
  requireChecked();
  const route = bridge.read();
  validateSnapshot(route);
  if (cloudExists && same(route,cloudData)) {
    lamp('Keine neuen Änderungen – GitHub bereits aktuell', 'ok');
    note('Die Route ist bereits identisch mit dem zuletzt geprüften GitHub-Stand. Es wurde keine neue Revision erzeugt.');
    return;
  }
  const result = await invoke({ action:'save', app: APP_ID,
    sha:cloudSha, revision:cloudRevision, data:route });
  setRemote({...result, exists:true, data:route});
  lamp('Route sicher auf GitHub gespeichert', 'ok');
  note(`Erfolgreich als Revision ${cloudRevision} gespeichert. Andere App-Ordner und das öffentliche Routen-Navigator-Repository bleiben unverändert.`);
}));
$('rnLocalSave').addEventListener('click', () => execute('Lokal Speichern', async () => {
  if (!bridge.localSave()) throw Error('Browser lässt lokales Speichern nicht zu.');
  note('Aktuelle Route im bisherigen Tour-Navigator-Browserspeicher gespeichert. GitHub wurde nicht geändert.');
  refreshLamp();
}));
$('rnLocalLoad').addEventListener('click', () => execute('Lokal Laden', async () => {
  const raw = bridge.localRaw();
  if (!raw) throw Error('Es ist noch keine lokale Routensicherung vorhanden.');
  const snapshot = JSON.parse(raw);
  validateSnapshot(snapshot);
  if (same(bridge.read(),snapshot)) {
    note('Lokale Route ist mit der geöffneten Route bereits identisch. Kein Austausch erforderlich.'); return;
  }
  if (!confirm('Die lokale Routensicherung laden?\n\nDie aktuell geöffnete Route wird ersetzt. GitHub bleibt unverändert.')) { cancelled('Lokal Laden'); return; }
  bridge.apply(snapshot,'Lokaler Speicherstand');
  note('Lokale Route übernommen. Ob GitHub denselben Stand enthält, zeigt die Speicherampel.');
  lamp('Lokale Route übernommen – GitHub noch nicht aktualisiert');
}));
$('rnExport').addEventListener('click', () => execute('JSON-Export', async () => {
  bridge.exportJson();
  note('JSON-Sicherung der aktuellen Route zum Download erstellt. GitHub wurde nicht geändert.');
}));
$('rnImport').addEventListener('click', () => $('rnFile').click());
$('rnFile').addEventListener('change', () => execute('JSON-Import', async () => {
  const file = $('rnFile').files?.[0];
  if (!file) return;
  try {
    const json = JSON.parse(await file.text());
    validateSnapshot(json);
    if (!same(bridge.read(),json) && !confirm('JSON-Backup laden?\n\nDie aktuelle Route wird ersetzt und anschließend lokal gespeichert. GitHub bleibt unverändert.')) {
      cancelled('JSON-Import'); return;
    }
    bridge.apply(json,'JSON-Sicherung');
    note('JSON-Sicherung geladen. Die Route wurde lokal übernommen; GitHub blieb unverändert.');
    lamp('JSON-Sicherung geladen – GitHub noch nicht aktualisiert');
  } finally { $('rnFile').value=''; }
}));

function setTheme(theme) {
  const isQuiet = theme !== 'original';
  $('rnQuietTheme').disabled = !isQuiet;
  $('rnQuiet').setAttribute('aria-pressed', String(isQuiet));
  $('rnOriginal').setAttribute('aria-pressed', String(!isQuiet));
  try { localStorage.setItem(THEME_SETTING, isQuiet ? 'quiet' : 'original'); } catch {}
}
$('rnQuiet').addEventListener('click', () => setTheme('quiet'));
$('rnOriginal').addEventListener('click', () => setTheme('original'));

$('rnOpenStorage').addEventListener('click', () => {
  oldScroll = window.scrollY;
  $('rnStorageView').hidden = false;
  document.body.classList.add('rn-storage-open');
  metadata();refreshLamp();
  window.scrollTo(0,0);
});
$('rnStorageBack').addEventListener('click', () => {
  document.body.classList.remove('rn-storage-open');
  $('rnStorageView').hidden = true;
  window.scrollTo(0,oldScroll);
});
window.addEventListener('huschel:routen-geaendert', () => {
  // Die App speichert Änderungen weiterhin automatisch lokal. Nur die GitHub-Ampel wird aktualisiert.
  if (!$('rnStorageView').hidden) refreshLamp();
});

try {
  $('rnKey').value = localStorage.getItem(KEY_SETTING) || '';
  $('rnEmail').value = localStorage.getItem(EMAIL_SETTING) || $('rnEmail').value;
  setTheme(localStorage.getItem(THEME_SETTING) || 'quiet');
} catch { setTheme('quiet'); }
metadata();
void restore();
