ROUTEN NAVIGATOR – HUSCHEL APP SPEICHER / RUHIGER LOOK
Version: V4.1.3 TEST
Ausgangsbasis: die vom Nutzer am 25.10.2026 hochgeladene tour-navigator-modern.zip,
interner Versionsstand Tour Navigator Modern V4.1.2 MASTER.

WICHTIG
Dieses ist eine getrennte Testversion. Die funktionierende Original-App NICHT
ungeprüft ersetzen. Nach Testfreigabe kann sie zur neuen MASTER-Version werden.

GEÄNDERTE DATEIEN / WARUM
- index.html: ausschließlich zusätzlicher Speicher-Symbolbutton, separate
  Speicheransicht, Datenbrücke zur vorhandenen Routenlogik und CSS-/JS-Einbindung;
  Datenschutz-Hinweis mit optionaler GitHub-Speicherung präzisiert.
- routen-speicher.js (neu): Supabase Auto-Login, privates GitHub Speichern/Laden
  (SHA/Revisionsschutz), verständliche Speicherampel, Sicherheitsabfragen,
  vorhandene lokale Speicherfunktionen, JSON-Sicherung.
- routen-speicher.css (neu): Darstellung der getrennten Speicherseite und
  Anordnung der Kopfbuttons für iPhone.
- routen-ruhiger-look.css (neu): rein visuelle Reduktion der bisherigen bunten
  Akzente auf Dunkelblau/Grau/Petrol. Umschaltbar auf die Originalfarben.

UNVERÄNDERT
- Eingebettete Standardroute (35 Punkte), GPX-Import, Textlistenimport,
  Kurviger/Waze/Google Maps/Apple Karten, Tourverwaltung, Punktbearbeitung,
  N-Ziele, lokales automatisches Speichern, Tour-Animator-Übergabe,
  ChatGPT-Reiseplanungsexport sowie bestehende IDs und interner Datentyp.
- Keine vorhandenen Routendaten oder Backup-Dateien wurden konvertiert.

GITHUB-ANBINDUNG
Es wird dieselbe erprobte Infrastruktur wie für Chillout Lab verwendet:
Supabase: huschel-speicher-pilot
Project URL: https://qijordwpbwwbizfcslrv.supabase.co
Edge Function: github-app-storage
Privates Repository: phusch/huschel-app-data
Zugeordnete Datei: tour-navigator/data.json

In der mit Chillout Lab V3.8.3.3 funktionierenden Edge Function war
"tour-navigator": "tour-navigator/data.json" BEREITS in der serverseitigen
Zulassungsliste enthalten. Daher ist für diese Testversion KEIN erneutes
Supabase-Deploy vorgesehen. Falls trotzdem "App nicht freigeschaltet"
erscheint, erst die vorhandene Edge Function überprüfen, nicht unkontrolliert
alte Serverdateien deployen.

INSTALLATION AUF GITHUB PAGES
1. Original-Repository vorher sichern und nach Möglichkeit einen separaten
   Testzweig oder Test-Repository nutzen.
2. index.html, routen-speicher.js, routen-speicher.css und
   routen-ruhiger-look.css gemeinsam in dessen Hauptverzeichnis veröffentlichen.
3. Die App über HTTPS / GitHub Pages öffnen, nicht als reine file://-Datei.
4. Auf das Speichern-Symbol oben rechts tippen.
5. Beim ersten Mal Publishable Key des bekannten Supabase-Projekts und
   den freigegebenen App-Auth-Benutzer eingeben. KEIN GITHUB_TOKEN eingeben!
   Danach bleibt die Sitzung auf demselben Gerät erhalten, bis abgemeldet
   wird oder die Sitzung ungültig wird.
6. "GitHub Laden" wählen (prüft die Revision und legt noch keine Daten an).
   Falls noch keine tour-navigator/data.json existiert, steht die eigene
   aktuelle Route unverändert bereit.
7. "GitHub Speichern" legt den ersten Datensatz an. Danach nochmals
   "GitHub Laden" zur Kontrolle wählen.

KONFLIKT- UND DATENSCHUTZHINWEISE
- GitHub Speichern ist erst nach GitHub Laden verfügbar (Version/SHA bekannt).
- Ändert ein anderes Gerät zwischen Laden und Speichern den GitHub-Stand,
  blockiert die GitHub-API das Überschreiben mit der alten SHA.
- Das Laden einer abweichenden Route erfordert eine ausdrückliche Bestätigung.
- Das Laden von Cloud/JSON/Local aktualisiert – wie die bisherige App –
  auch den automatischen lokalen Routenspeicher.
- Bei abweichenden Daten immer vor dem Laden eine JSON-Sicherung erstellen.
- Public Publishable Key wird lokal gespeichert, niemals der geheime
  GitHub-Token. Das Passwort wird nicht dauerhaft gespeichert.

FARBEN
Die neue ruhige Farbvariante ist zunächst aktiviert. Auf der Speicherseite
unter "Darstellung" kann jederzeit auf "Originalfarben" gewechselt werden.
Beide Varianten benutzen exakt dieselbe Routen- und Speicherlogik.

TESTSTAND
- Statische HTML- und JS-Syntax sowie die Element-IDs geprüft.
- Browser-Simulation auf 390-Pixel-iPhone-Breite: 35 Routenpunkte, separate
  Ansicht, Anmeldung und Cloud Lesen/Schreiben mit simuliertem Supabase-Backend,
  Zurück-Navigation sowie Farbumschaltung erfolgreich.
- Echter Supabase-/GitHub-Test beim Nutzer steht noch aus.
