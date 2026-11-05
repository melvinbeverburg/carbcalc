# Carb Calculator

Rechner für Kohlenhydrate und Wasser pro Einheit, mit frei zusammenstellbarem Fuel Stack. Für Laufen, Rad und Schwimmen. Eine einzige Datei (`index.html`), ohne Build, ohne externe Anfragen.

## Funktionen

- **Zwei Personen mit eigenem Farbdesign.** Melvin startet in Blau, Annemarie in Pink. Wer oben ausgewählt ist, bestimmt das Design. In den Einstellungen lässt sich eine Farbe fest vorgeben.
- **Körperdaten und weitere Personen** in den Einstellungen. Fehlt das Gewicht, schätzt der Rechner es mit einem Durchschnitts-BMI und markiert das als geschätzt.
- **Schnellwahl für Distanzen.** Laufen: 10 km, Halbmarathon, Marathon. Rad: 50, 80, 100, 150, 180, 200 km. Schwimmen: 750 m, 1,5 km, 1,9 km, 3,8 km. Freie Eingabe geht immer.
- **Fuel Stack** aus Gels, Mix, Getränken und Essen. Eigenes Fuel mit Carbs, Flüssigkeit und Fruktose-Anteil lässt sich hinzufügen.
- **Auswertung des Stacks:** Ziel in Gramm, Carbs pro Stunde, Fruktose-Anteil, Flüssigkeit im Stack, Wasser dazu und Takt für Gels und Essen.
- **Zeitplan:** Ein Zeitstrahl mit Läufer, Radfahrer oder Schwimmer zeigt, wann welche Portion drankommt, und endet an der Zielflagge. Dazu gibt es dieselben Zeiten als Liste. Die erste Portion kommt spätestens nach 20 Minuten, die letzte mindestens 10 Minuten vor dem Ziel. Flaschen werden laufend getrunken und bekommen keinen Marker.
- Ausgelegt für das Handy, mit Tab-Leiste unten und Sheets für Eingaben.

## Auf GitHub veröffentlichen

1. Neues Repository anlegen und `index.html` plus `README.md` hochladen.
2. Im Repository: **Settings → Pages → Build and deployment**. Quelle **Deploy from a branch**, Branch `main`, Ordner `/ (root)`.
3. Nach ein bis zwei Minuten ist die Seite unter `https://<benutzername>.github.io/<repository>/` erreichbar.
4. Auf dem Handy im Browser öffnen und über das Teilen-Menü **Zum Home-Bildschirm** wählen.

Die Seite lädt keine Schriften und keine Skripte von fremden Servern. Es werden keine Daten übertragen.

## Daten und Speicherung

Personen, Stacks, eigenes Fuel und Einstellungen liegen im `localStorage` des Browsers. Jedes Gerät hat seine eigenen Daten. Unter Einstellungen gibt es **Alles zurücksetzen**.

Die Startwerte stehen im Objekt `DEFAULT` in `index.html`. Dort lassen sich Namen, Größe, Gewicht, Alter und Farbe der beiden Personen ändern. Nutzer, die die Seite schon geöffnet haben, behalten ihre gespeicherten Werte. Für neue Startwerte einmal zurücksetzen oder den Schlüssel `KEY` hochzählen.

## So wird gerechnet

Alle Werte sind Richtwerte aus gängigen Sporternährungs-Empfehlungen, keine individuelle Beratung.

**Dauer und Energie**
- Laufen: Dauer aus Distanz und Pace, Verbrauch etwa 1,05 kcal pro kg und km.
- Rad: Leistung aus Luft- und Rollwiderstand bei flachem Gelände und Hoods-Position (CdA 0,40), 24 % Wirkungsgrad. Berge und Windschatten sind nicht berücksichtigt.
- Schwimmen: Verbrauch über MET-Werte, abhängig vom Tempo.

**Carbs pro Stunde**
- Unter 45 Minuten: nicht nötig.
- Danach steigt das Ziel mit der Dauer, grob von 15 g/h bei 45 Minuten über 30 g/h bei 1 Stunde und 60 g/h bei 2 Stunden bis 90 g/h ab etwa 6 Stunden.
- Begrenzt durch das gewählte Darm-Limit (60, 90 oder 120 g/h) und durch 15 % des stündlichen Verbrauchs in kcal-Gramm, damit der Stack nicht mehr Energie liefert als sinnvoll.
- Beim Laufen mit 10 % Abschlag, weil der Magen dort empfindlicher ist.
- Über 60 g/h prüft die Seite den Fruktose-Anteil. Die Werte pro Lebensmittel sind grobe Schätzungen.

**Wasser pro Stunde**
- Schweißrate aus Körperoberfläche (Mosteller), Intensität und Temperatur, bei Frauen mit 15 % Abschlag. Getrunken werden etwa 70 % davon, begrenzt auf 350 bis 900 ml/h (Schwimmen 150 bis 500 ml/h).

**Fehlendes Gewicht**
- Schätzung über BMI 22 (männlich), 21 (weiblich) oder 21,5 (keine Angabe) aus der Körpergröße. Das Alter wird gespeichert, geht aktuell aber nicht in die Berechnung ein.

Die Nährwerte der eingebauten Lebensmittel sind gerundet. Bei Produkten zählt die Packung.

## Technik

Eine HTML-Datei mit eingebettetem CSS und JavaScript, keine Abhängigkeiten. Läuft in aktuellen Versionen von Safari, Chrome, Firefox und Edge.
