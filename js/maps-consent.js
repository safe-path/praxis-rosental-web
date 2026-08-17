/* Zwei-Klick-Loesung fuer Google Maps.
 *
 * Ohne Zustimmung steht im Platzhalter nur lokales Markup — es geht kein
 * Request an Google, weder Kartenkacheln noch Fonts oder Cookies.
 * Erst ein Klick auf "Karte laden" setzt das iframe ein.
 *
 * Die Entscheidung wird auf Wunsch in localStorage gemerkt. Faellt der
 * Speicher aus (Privatmodus, blockierte Storage-API), funktioniert die
 * Komponente unveraendert — sie fragt dann bei jedem Aufruf erneut.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'zar:maps-consent';

  function readConsent() {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === 'granted';
    } catch (err) {
      return false;
    }
  }

  function storeConsent() {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'granted');
    } catch (err) {
      /* Speicher nicht verfuegbar — Zustimmung gilt dann nur fuer diesen Aufruf. */
    }
  }

  function loadMap(placeholder, focusFrame) {
    var src = placeholder.getAttribute('data-maps-src');
    if (!src) return;

    var frame = document.createElement('iframe');
    frame.src = src;
    frame.className = 'maps-consent__frame';
    frame.setAttribute('title', 'Google-Maps-Karte mit dem Standort der Zahnarztpraxis am Rosental');
    frame.setAttribute('loading', 'lazy');
    frame.setAttribute('allowfullscreen', '');
    frame.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');

    placeholder.replaceWith(frame);

    /* Nach einem echten Klick den Fokus mitnehmen, damit die Tastaturbedienung
       nicht an den Anfang des Dokuments zurueckspringt. */
    if (focusFrame) {
      frame.setAttribute('tabindex', '-1');
      frame.focus({ preventScroll: true });
    }
  }

  function init() {
    var placeholders = document.querySelectorAll('[data-maps-placeholder]');
    if (!placeholders.length) return;

    Array.prototype.forEach.call(placeholders, function (placeholder) {
      if (readConsent()) {
        loadMap(placeholder, false);
        return;
      }

      var once = placeholder.querySelector('[data-maps-accept]');
      var always = placeholder.querySelector('[data-maps-remember]');

      if (once) {
        once.addEventListener('click', function () {
          loadMap(placeholder, true);
        });
      }

      if (always) {
        always.addEventListener('click', function () {
          storeConsent();
          loadMap(placeholder, true);
        });
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
