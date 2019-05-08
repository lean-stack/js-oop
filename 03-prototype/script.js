/**
 * Step 01: The Prototype
 *
 * In JavaScript wird beim Property-Lookup (also dem lesenden Zugriff
 * auf eine Objekt-Property) zunächst geprüft, ob das Objekt selbst über
 * diese Property verfügt und falls negativ im Anschluss die Prototypen-Kette
 * durchlaufen und nach der Property gesucht.
 *
 * Schauen wir uns diesen Prototypen bzw. die Prototypen-Kette genauer an:
 */

// Ausgangspunkt: zwei literale Objekte mit den gleichen Methoden

// Problem: Redundanz
// Obwohl die Methoden jeweils augenscheinlich gleich sind, wird dennoch
// für jedes Objekt eine eigene Einzahlungs- und Auszahlungsmethode definiert.

const k1 = {
  nr: 1001,
  stand: 0,
  einzahlen: function (betrag) { this.stand += betrag; },
  auszahlen: function (betrag) { this.stand -= betrag; }
};

const k2 = {
  nr: 1002,
  stand: 0,
  einzahlen: function (betrag) { this.stand += betrag; },
  auszahlen: function (betrag) { this.stand -= betrag; }
};

// Ein erster Ansatz wäre, die Methode außerhalb der Objekte zu definieren
// und jeweils nur auf diese Methode zu verweisen. Das würde immerhin
// doppelte Definition beheben. Dennoch wäre in jedem Objekt für jede Methode
// ein Verweis notwendig

function einzahlen(betrag) { this.stand += betrag; }
function auszahlen(betrag) { this.stand -= betrag; }

const k3 = {
  nr: 1003,
  stand: 0,
  einzahlen: einzahlen,
  auszahlen: auszahlen
};

// Um diese Verweis-Anzahl zu reduzieren, könnte man im nächsten Schritt die
// Methoden in einem Objekt sammeln und nur auf dieses Objekt verweisen.
// Nachteil: der Methoden-Aufruf ist nicht mehr kanonisch.

const methods = {
  einzahlen,        // ES 6 Property
  auszahlen
};

const k4 = {
  nr: 1004,
  stand: 0,
  methods
};

k4.methods.einzahlen(500);

// Lösung: der Prototyp

const k5 = Object.create(methods);
k5.nr = 1005;
k5.stand = 0;
k5.einzahlen(5000);

// Anmerkung: kleiner Nachteil dieser offiziellen ES 5 Variante ist natürlich,
// dass wir die Objekt-Properties nicht mehr literal initialisieren können.

// Deshalb erlaubte/spezifiezierte ES 6 die schon in allen Browsern außer dem IE gängige
// Variante den Protoypen über die Objekt-Property ```__proto__``` anzuspechen. Dabei gilt als
// best practice dies nur bei der Objekt-Initialisierung zu tun. Von jeglicher nachträglicher
// Änderung des Prototypen ist abzusehen.

const k6 = {
  nr: 1006,
  stand: 0,
  __proto__: methods
};

// Natürlich können im Prototype auch normale Properties definiert werden. Deshalb zum Abschluss
// ein komplettes Beispiel.

const kontoPrototyp = {
  blz: 12345678,
  einzahlen: function (betrag) { this.stand += betrag; },
  auszahlen: function (betrag) { this.stand -= betrag; }
}

const k7 = {
  nr: 1007,
  stand: 0,
  __proto__: kontoPrototyp
};

const k8 = Object.create(kontoPrototyp);
k8.nr = 1008;
k8.stand = 0;
k8.blz = 21212121;

const k9 = Object.create(kontoPrototyp, {
  'nr': { value: 1009, enumerable: true },
  'stand': { value: 0, enumerable: true, writable: true }
});

console.log(k7.hasOwnProperty('blz'));
console.log(k8.hasOwnProperty('blz'));

console.log(k7.blz);
kontoPrototyp.blz = 78787878;
console.log(k7.blz);
console.log(k8.blz);

kontoPrototyp.bic = 'MYBANKXX';
console.log(k7.bic);
