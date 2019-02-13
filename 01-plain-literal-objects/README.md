## Stufe 01: Plain Objects

> Objekte in JavaScript sind im Prinzip Key-Value Maps.
> Der Key-Typ ist string, der Value-Typ beliebig.

Dabei gilt:
 - Eine Property ist ein Key-Value Paar; der Key enthälten den Property-Namen
 - Eine Methode ist eine Property, deren Value eine Funktion ist.
 
Bei den Methoden evaluiert this auf die Objekt-Instanz

    // Objekte können einfach literal angelegt werden
    // Bemerkung: aus dieser literalen Notation wurde das JSON-Format abgeleitet

    const k1 = {
      nr: 1001,
      stand: 0,
      einzahlen: function (betrag) { this.stand += betrag; },
      auszahlen: function (betrag) { this.stand -= betrag; }
    };

    // Mit EcmaScript 5.1 wurde eine elegantere Methoden-Definition eingeführt

    const k2 = {
      nr: 1002,
      stand: 0,
      einzahlen(betrag) { this.stand += betrag; },
      auszahlen(betrag) { this.stand -= betrag; }
    };

    // Auf Grund des Key-Typs ist auch folgendes möglich:

    const spezial = {
      'nr': 1003,
      'konto stand': 0,
      ' ': function (betrag) { this.stand += betrag; },
      '0': 0,
      '': function (betrag) { this.stand -= betrag; }
    };

    // Schreibender und lesender Zugriff auf die Properties/Methoden erfolgt
    // über den Punkt-Oberator oder eine Key-Indexierung

    console.log(k1.nr);
    console.log(k2['nr']);
    k1.einzahlen(2000);
    k1['einzahlen'](3000);

    // Properties und Methoden können jederzeit dynamisch hinzugefügt bzw. gelöscht werden.

    spezial.einzahlen = spezial[' '];
    delete spezial[' '];
