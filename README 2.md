Hier ist ein vollständiges, schön strukturiertes `README.md` für dein GitHub-Repository. Es beschreibt die Tour-Navigator-App, den Aufbau, Nutzung auf iPhone/Safari, GitHub Pages und die Grenzen von Bear/CarPlay. Deine HTML-Datei ist als Single-File-App aufgebaut und rendert die Tourpunkte per JavaScript aus der eingebetteten Standardroute. 

# 🏍️ Tour Navigator – Route des Grandes Alpes

Eine kleine, mobile **Single-File-Web-App** zur Verwaltung und schnellen Navigation von Motorradtouren auf dem iPhone.

Die App wurde ursprünglich für die **Route des Grandes Alpes** gebaut und enthält eine fest gespeicherte Standardroute mit Tageszielen, Shaping Points und zusätzlichen Zwischenzielen. Sie kann aber auch eigene GPX-Dateien, Textlisten und manuell eingegebene Wegpunkte verarbeiten.

---

## ✨ Funktionen

* 🏁 **Standardroute „Route des Grandes Alpes“ fest eingebaut**
* 📍 Tagesziele **N1–N8** optisch hervorgehoben
* 🧭 Shaping Points und Zwischenziele in Tour-Reihenfolge dargestellt
* 🗺️ Navigation per Zielbutton in:

  * Kurviger
  * Waze
  * Google Maps
  * Apple Karten
* 📂 GPX-Import direkt im Browser
* 📝 Textlisten-Import: eine Zeile = ein Tourpunkt
* ➕ Manuelle Wegpunkteingabe per Adresse oder Koordinaten
* 🔁 Rückkehr zur Standardroute per Button
* 📱 Optimiert für iPhone/Safari
* 🏠 Als Web-App auf dem iPhone-Home-Bildschirm nutzbar
* 🧩 Keine Serverlogik, keine Datenbank, kein Tracking

---

## 📸 Konzept

Der Tour Navigator ist als **mobiles Cockpit für Etappenziele** gedacht.

Statt während der Tour mühsam Ziele in verschiedene Navigationsapps einzugeben, zeigt die App alle relevanten Punkte als große, antippbare Buttons an. Je nach gewählter Navigations-App wird der aktuell ausgewählte Punkt geöffnet.

Die App ersetzt keine vollwertige Motorrad-Navigationssoftware wie Kurviger, sondern ergänzt sie:

> **Kurviger für die komplette kurvige Route – Tour Navigator für schnelle Tagesziele, Zwischenstopps und spontane Änderungen.**

---

## 🚀 Online nutzen über GitHub Pages

### 1. Repository erstellen

Auf GitHub ein neues Repository erstellen, z. B.:

```text
tour-navigator
```

Empfehlung:

```text
Public
```

---

### 2. HTML-Datei hochladen

Die App besteht aus einer einzigen HTML-Datei.

Die Datei sollte im Repository am besten so heißen:

```text
index.html
```

Wenn deine Datei noch anders heißt, z. B.:

```text
tour_navigator.html
```

dann bitte vor dem Hochladen in `index.html` umbenennen.

---

### 3. GitHub Pages aktivieren

Im Repository:

```text
Settings → Pages
```

Dann einstellen:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

Speichern.

Nach kurzer Zeit ist die App erreichbar unter:

```text
https://DEIN-GITHUB-NAME.github.io/tour-navigator/
```

---

## 📱 Auf dem iPhone als App öffnen

1. Den GitHub-Pages-Link in **Safari** öffnen.
2. Unten auf **Teilen** tippen.
3. **Zum Home-Bildschirm** auswählen.
4. Namen vergeben, z. B.:

```text
Tour Navigator
```

5. Fertig.

Danach erscheint die App wie ein eigenes Icon auf dem iPhone.

---

## 🧭 Bedienung

### Navigations-App auswählen

Oben in der App kann ausgewählt werden:

```text
Kurviger
Waze
Google Maps
Apple Karten
```

Danach bei einem Tourpunkt auf:

```text
Navigieren
```

tippen.

Die gewählte App öffnet sich mit dem entsprechenden Ziel.

---

## 🏁 Tagesziele N1–N8

Die Tagesziele der Route werden besonders hervorgehoben.

Beispiele:

```text
N1 Hôtel Le Christania
N2 L'Outa
N3 Hotel Vauban Briançon
N4 Hostellerie de Rimplas
N5 Annot Hotel
N6 Hotel Christiana
N7 Radiana la Léchère
N8 Agora Swiss Night
```

Diese Punkte sind als zentrale Tagesziele gedacht.

---

## 📍 Shaping Points und Zwischenziele

Neben den Tageszielen enthält die Route weitere Punkte:

* Shaping Points
* Zwischenziele
* Start/Zielpunkte
* zusätzliche GPX-Punkte

Diese werden optisch etwas kleiner oder nachgeordnet dargestellt.

Sie helfen dabei, die Tourstruktur zu erhalten, ohne die Tagesziele zu überladen.

---

## 📂 GPX-Dateien importieren

Die App kann GPX-Dateien direkt im Browser einlesen.

Unterstützt werden:

* Routepunkte
* Wegpunkte
* Trackpunkte

Bei sehr vielen Trackpunkten wird die Anzeige automatisch reduziert, damit nicht hunderte Einzelpunkte als Buttons erscheinen.

### Hinweis

Ein reiner GPX-Track enthält oft keine Ortsnamen. Dann erscheinen Punkte eventuell nur als:

```text
Trackpunkt 1
Trackpunkt 2
Trackpunkt 3
```

Die Navigation funktioniert trotzdem über die Koordinaten.

---

## 📝 Textliste importieren

Zusätzlich kann eine einfache Textliste eingefügt werden.

Format:

```text
Eine Zeile = ein Routenpunkt
```

Beispiel:

```text
Aichwald
Stuttgart, Deutschland
Althütte
Kleinheppach
```

Danach auf:

```text
Textliste importieren
```

tippen.

Aus jeder Zeile wird automatisch ein Tourbutton erstellt.

---

## 🧭 Textliste mit Koordinaten

Koordinaten können ebenfalls eingegeben werden.

Format:

```text
Breite, Länge, Name
```

Beispiel:

```text
48.78123, 9.38765, Eigener Aussichtspunkt
45.41720, 6.98270, Col de l’Iseran
```

Alternativ:

```text
Name|Breite|Länge
```

Beispiel:

```text
Col de l’Iseran|45.41720|6.98270
```

---

## ➕ Einzelnen Wegpunkt hinzufügen

Im Bereich der manuellen Wegpunkteingabe kann ein einzelner Punkt ergänzt werden.

Möglich sind:

```text
Name oder Adresse
```

Beispiel:

```text
Stuttgart, Deutschland
```

Oder mit Koordinaten:

```text
Name: Aussichtspunkt
Breite: 45.41720
Länge: 6.98270
```

Danach kann der Punkt entweder:

```text
Wegpunkt anhängen
```

oder

```text
Nach gewähltem N-Ziel
```

eingefügt werden.

---

## 🔁 Standardroute wiederherstellen

Wenn eine GPX-Datei oder Textliste importiert wurde, kann jederzeit zur eingebauten Standardroute zurückgekehrt werden.

Dazu den Button verwenden:

```text
Standardroute laden
```

Die Route des Grandes Alpes ist fest im HTML-Code gespeichert und bleibt erhalten.

---

## 🗺️ Kartenbutton

Jeder Tourpunkt hat zwei Hauptaktionen:

```text
Navigieren
Karte
```

### Navigieren

Öffnet den Punkt in der oben ausgewählten Navigations-App.

### Karte

Öffnet den Punkt in Google Maps als Kartenansicht/Suche.

---

## 🧠 Technischer Aufbau

Die App ist bewusst als **Single-File-HTML-App** gebaut.

Das bedeutet:

```text
index.html
```

enthält:

* HTML-Struktur
* CSS-Design
* JavaScript-Logik
* Standardroute
* App-Links
* GPX-Parser
* Textlisten-Parser

Es gibt keine externen Abhängigkeiten.

---

## 🧱 Aufbau der Datei

### 1. HTML

Die HTML-Struktur enthält:

* Kopfbereich mit Logo und Titel
* Auswahlfeld für die Navigations-App
* GPX-Dateiauswahl
* Textlistenfeld
* manuelle Wegpunkteingabe
* Infobereich
* dynamisch erzeugte Tourpunktliste
* feste Buttons für vorheriges/nächstes Tagesziel

---

### 2. CSS

Das Design ist für mobile Nutzung optimiert.

Merkmale:

* dunkles Motorrad-/Touren-Design
* goldene Akzente
* große Buttons
* sticky Header
* Tagesziele als große Karten
* Shaping Points kleiner/nachgeordnet
* iPhone Safe-Area-Unterstützung
* responsive Layout für kleine Bildschirme

---

### 3. JavaScript

Die JavaScript-Logik übernimmt:

* Anzeige der Standardroute
* Rendern der Tourbuttons
* Erkennen von Tageszielen N1–N8
* GPX-Import
* Textlisten-Import
* manuelle Wegpunkte
* Umschalten zwischen Navi-Apps
* Erzeugen der App-Links
* Scrollen zum nächsten/vorherigen Tagesziel

---

## 🔗 Navigationslinks

Die App erzeugt je nach Zieltyp unterschiedliche Links.

### Waze

Bei Koordinaten:

```text
https://waze.com/ul?ll=BREITE,LÄNGE&navigate=yes
```

Bei Textzielen:

```text
https://waze.com/ul?q=ZIELNAME&navigate=yes
```

---

### Google Maps

```text
https://www.google.com/maps/dir/?api=1&destination=ZIEL&travelmode=driving
```

---

### Apple Karten

```text
http://maps.apple.com/?daddr=ZIEL&dirflg=d
```

---

### Kurviger

Bei Koordinaten:

```text
https://kurviger.de/de?point=BREITE,LÄNGE&name=NAME
```

Bei Textzielen:

```text
https://kurviger.de/de?query=ZIELNAME
```

---

## ⚠️ Grenzen der App

### Keine echte CarPlay-App

Die HTML-App kann nicht direkt als eigene App in Apple CarPlay erscheinen.

CarPlay zeigt nur offiziell unterstützte native Apps.

Was möglich ist:

* App auf dem iPhone öffnen
* Ziel antippen
* Google Maps/Waze/Apple Karten startet
* Navigation erscheint dann in CarPlay

Was nicht möglich ist:

* eigene HTML-App direkt auf dem CarPlay-Display bedienen
* Tour Navigator als CarPlay-App anzeigen

---

### Bear ist kein vollwertiger Browser

Wenn die HTML-Datei in Bear importiert wird, wird die Standardroute möglicherweise nicht angezeigt.

Grund:

Die Tourpunkte werden per JavaScript dynamisch erzeugt. Bear zeigt HTML-Dateien oft nur als Text, Vorschau oder eingeschränkte Darstellung und führt JavaScript nicht zuverlässig aus.

Daher besser:

```text
GitHub Pages → Safari → Zum Home-Bildschirm
```

---

### Waze kann keine komplette GPX-Tour importieren

Waze navigiert immer zu einzelnen Zielen.

Die App kann Waze daher nur punktweise öffnen.

Für vollständige Motorrad-Routen bleibt Kurviger besser geeignet.

---

## ✅ Empfohlener Workflow

### Für geplante Motorradtouren

```text
1. Tour in Kurviger planen
2. GPX exportieren
3. GPX im Tour Navigator importieren
4. Tagesziele oder Zwischenziele als Buttons nutzen
5. Navigation je nach Bedarf in Kurviger/Waze/Google/Apple starten
```

---

### Für spontane Änderungen unterwegs

```text
1. Neuen Ort in der App eingeben
2. Wegpunkt anhängen
3. Navigations-App auswählen
4. Navigieren antippen
```

---

## 📁 Dateistruktur

Minimaler Aufbau:

```text
tour-navigator/
└── index.html
```

Optional:

```text
tour-navigator/
├── index.html
├── README.md
└── screenshots/
    ├── startseite.png
    └── tourpunkte.png
```

---

## 🛡️ Datenschutz

Die App arbeitet lokal im Browser.

* keine Anmeldung
* keine Datenbank
* kein Tracking
* keine Serververarbeitung
* GPX-Dateien werden lokal im Browser gelesen
* Textlisten bleiben lokal im Browser

Beim Öffnen einer Navigations-App werden Zielname oder Koordinaten an die jeweilige App übergeben.

---

## 🧪 Getestete Nutzung

Empfohlene Nutzung:

```text
iPhone → Safari → GitHub Pages → Zum Home-Bildschirm
```

Funktioniert mit:

* Safari iOS
* Google Maps
* Waze
* Apple Karten
* Kurviger-Weblinks

---

## 🏍️ Ziel

Der Tour Navigator soll während einer Motorradtour möglichst wenig ablenken:

* große Buttons
* klare Tagesziele
* schnelle Navigation
* einfache Ergänzung von Wegpunkten
* keine komplexe Bedienung unterwegs

Er ist kein Ersatz für Kurviger, sondern ein persönliches Tour-Cockpit für Etappen, Hotels, Pässe, Stopps und spontane Ziele.

---

## 📄 Lizenz

Private Nutzung frei.

Für öffentliche Weitergabe bitte eigene Verantwortung für Kartenlinks, GPX-Daten und Zieladressen beachten.

---

## Autor

Erstellt als persönlicher Motorrad-Tour-Navigator für die Route des Grandes Alpes.

Du kannst den Inhalt einfach als Datei **`README.md`** in dein GitHub-Repository kopieren.
