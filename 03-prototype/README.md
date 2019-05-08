## Stufe 02: Mehr zu literalen Objekten

Neben der literalen Definition sind andere Formen der
Objekterzeugung möglich.

    // Object-Factory
    //
    // Zur Bedeutung des leeren Objektes im Argument komme ich erst
    // im Abschnitt 03 - The Prototype. Schon jetzt: es macht einen fundamentalen
    // Unterschied, ob dort null, das leere Objekt oder etwas anderes steht
    const k1 = Object.create({});

    // Object-Constructor
    //
    // Ein extrem unüblicher weg, ein einfaches Objekt anzulegen.
    // Zur Thematik des Schlüsselwortes new komme ich im Abschnitt 04 - The new-Semantic.
    const k2 = new Object();

Neben der schon im ersten Abschnitt gezeigten Variante der
dynamischen Properties, lassen sich Properties auch über
Property-Definitions hinzufügen.

Das allgemeine Format:

    const propDefinition = {
      value: 1001,      // oder function ... für eine Methode (default: undefined)
      enumerable: true, // Iterable in for-in-loop bzw. sichtbar bei JSON.stringify (default: false),
      writable: true,    // beschreibbar (default: false)
      get: undefined,   // getter-Funktion (default: undefined), nicht kombinierbar mit value
      set: undefined,   // setter-Funktion (default: undefined), nicht kombinierbar mit value
      configurable: false // Änderbarkeit der Definition (default: false) - immer möglich: writable von true nach false
    };

Beispiele:

    Object.defineProperty(k1, 'nr', {
      value: 1001,
      enumerable: true,
      writable: true
    });

    k1.nr = 2000;
    console.log(k1.nr);

    Object.defineProperty(k1, 'nr', {
      writable: false
    });
    k1.nr = 1234;
    console.log(k1.nr);

    Object.defineProperty(k1, '_stand', {
      value: 0,
      writable: true
    });
    Object.defineProperty(k1, 'stand', {
      get() { return this._stand; }
    });
    Object.defineProperty(k1, 'einzahlen', {
      value: function(betrag) { this._stand += betrag; }
    });

    console.log(k1.stand);
    k1.einzahlen(2222);
    console.log(k1.stand);

    // Über die Object-Factory lässt sich das auch in einem Rutsch erledigen
    const k3 = Object.create({}, {
      nr:        { value: 1002, enumerable: true },
      _stand:    { value: 0, writable: true },
      stand:     { get() { return this._stand; }, enumerable: true },
      einzahlen: { value: function(betrag) { this._stand += betrag; } }
    });

    // Achtung: letztes Objekt k3 ist ziemlich "übermodelliert",
    // z.B. klappt eine JSON-Serialiserung/-Deserialiserung nicht wie erwartet.

    // Im Normalfall kann auf diese komplexeren Property-Definitions verzichtet werden.

    // Best practice: literal plain objects.
