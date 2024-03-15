'use strict';
	// start quiz with a start button
functionname(start){
	start: function (start) {
		var t = this;
		// fill list of remaining quiz questions
		t.questions = [];
		t.data.forEach(function (o) {
			t.questions.push(o);
		});
		t.shuffleArray(t.questions);
		t.currentChoices = [];
		t.currentQuestion = null;
		// install start button
		t.intoContainer(t.createElement({
			className: "startBtn",
			tag: "button",
			text: "Starte 1.Klasse Allgemeinwissen"
		}), "p");
	}
};
	myQuiz.init();
var myQuiz = {
	container: null,
	// helper function
	createElement: function (o) {
		var el, p;
		if (o && (o.tag || o.tagName)) {
			el = document.createElement(o.tag || o.tagName);
			if (o.text || o.txt) {
				var text = (o.text || o.txt)
				el.innerHTML = text;
			}
			for (p in o) {
				if (!p.match(/^t(e)?xt|tag(name)?$/i)) {
					el[p] = o[p];
				}
			}
		}
		return el;
	},
	// user interface for a quiz question
	createOptions: function () {
		var t = this,
			options = [],
			ul = document.createElement("ul");
		t.emptyContainer();
		t.intoContainer(t.createElement({
			tag: "h2",
			text: "(" + t.currentQuestion.category + ") " + t.currentQuestion.question
		}));
		t.intoContainer(ul);
		// create options
		options.push(t.currentQuestion.solution);
		t.currentQuestion.falses.forEach(function (s) {
			options.push(s);
		});
		t.shuffleArray(options);
		options.forEach(function (s, i) {
			var li = document.createElement("li"),
				label = t.createElement({
					htmlFor: "a" + t.questions.length + "_" + i,
					tag: "label",
					text: s
				}),
				radio = t.createElement({
					id: "a" + t.questions.length + "_" + i,
					name: "answer",
					tag: "input",
					type: "radio",
					tabindex: "0",
					value: s
				});
			ul.appendChild(li);
			li.appendChild(radio);
			li.appendChild(label);
		});
		// Hinweis für Tastatur-User
		t.intoContainer(t.createElement({
			tag: "button",
			text: "Bestätigen",
			type: "submit"
		}));
	},
	currentChoices: [],
	currentQuestion: null,
	// data could be filled from an external source (JSON)
	data: [{
		category: 'Addition',
		question: '3+4=',
		solution: '7',
		falses: ['8',
			'5',
			'9'],
		explanation: 'Wenn man vier Finger vor die Augen hält und drei dazu nimmt und sie dann zählt, hat man sieben finger oben.'
	}, {
     		category: 'Deutsch Wortarten',
		question: 'Was hiervon ist ein Verb (Tu-Wort)',
		solution: 'gehen,
		falses: ['oben',
			'Dach',
			'Die'],
		explanation: 'Verben (Tu wörter) sind wörter die eine Handlung beschreiben, wie zum beispiel gehen'
	}, { 
		category: 'Zahlenreihe',
		question: 'Verfollständige: 1,3,...,7,9',
		solution: '5',
		falses: ['4',
                '6',
                 '8']
		explanation: '1,3,7 und 9 sind ungerade Zahlen, und fünf ist die ungerade zahl die zwischen 3 und 7 steht.'
	}, {
		category: 'Subtraktion',
		question: '13-6=',
		solution: '7',
		falses: ['10',
			'19',
			'3'],
		explanation: 'Bis 10 werden schon 3 abgezogen wodurch man dann noch 3 von 10 abziehen muss.'
	}, {
		category: '',
		question: 'Was ist erlaubt?', //Frage 5 - sind die Antworten bei wechselnder Reihenfolge noch sinnvoll?
		solution: 'beides',
		falses: [
			'&lt;ins datetime="2015-06-01">&lt;p>paragraph 1&lt;/p>&lt;p>paragraph 2&lt;/p>&lt;/ins>',
			'&lt;a href="http://example.net">&lt;p>paragraph 1&lt;/p>&lt;p>paragraph 2&lt;/p>&lt;/a>',
			'nichts davon'],
		explanation: 'Die starre Festlegung, dass inline-Elemente keine Block-Elemente enthalten dürfen, gibt es nicht mehr.'
	}, {
		category: 'HTML',
		question: 'Wie oft darf das main-Element in einem HTML-Dokument vorkommen?',
		solution: 'da sind sich W3C und WHATWG noch nicht ganz einig',
		falses: ['beliebig oft', 'maximal einmal',
			'gar nicht, solch ein Element gibt es nicht'],
		explanation: ''
	}, {
		category: 'HTML',
		question: 'HTML5 führte zur Auszeichnung der Dokument&shy;struktur neue Elemente ein: article und section. Welche Schachtelung ist erlaubt?',
		solution: 'sowohl article in section als auch section in article',
		falses: ['article in section', 'section in article', 'keins davon'],
		explanation: ''
	}, {
		category: 'HTML',
		question: 'Mit welcher Priorität werden die Angaben (sofern vorhanden) laut Standard zur Bestimmung der Zeichen&shy;codierung eines HTML-Dokuments verwendet?',
		solution: '1. BOM 2. HTTP-Header 3. meta-charset',
		falses: ['1. HTTP-Header 2. meta-charset',
			'1. HTTP-Header 2. meta-charset 3. BOM',
			'1. HTTP-Header 2. BOM 3. meta-charset'],
		explanation: '' //Genau das. IE macht’s falsch. Weiß gar nicht, ob das im Edge korrigiert ist.
	}, {
		category: 'HTML',
		question: 'Wie erreicht man, dass ein Browser je nach Fenstergröße unterschiedliche Bilddateien lädt?',
		solution: 'Mit srcset-Attribut bzw. picture-Element.',
		falses: ['Das geht nur bei Hintergrundbildern per Media-Queries in CSS.',
			'Mit srcset-Attribut. picture-Element ist nicht spec-Konform.',
			'Mit picture-Element. srcset-Attribut ist nicht spec-Konform.'],
		explanation: ''
	}, {
		category: 'CSS',
		question: 'Welcher Selektor selektiert ein Element mit id="1"?',
		solution: '#\\31', //doppelte backslashes sind Markierung in JS/JSON
		falses: ['#1', '#\\1', 'keiner, denn id="1" ist nicht erlaubt'],
		explanation: 'Mit HTML5 sind auch Zahlen als Anfangsbuchstaben erlaubt. In CSS sind am Anfang eines Bezeichners nicht alle Zeichen zulässig, sodass man dort nicht erlaubte Zeichen escapen muss.'
	}, {
		category: 'CSS',
		question: 'Welche Browser unterstützen die Eigenschaft text-align-last noch nicht?',
		solution: 'Safari',
		falses: ['Firefox und Internet Explorer', 'Firefox und Chrome',
			'alle aktuellen WebKit/Blink (Chrome, Safari, Opera etc.)'],
		explanation: ''
	}, {
		category: 'CSS',
		question: 'Welcher Browser unterstützt noch keine automatische Silbentrennung per CSS?',
		solution: 'Chrome und Opera',
		falses: ['Firefox', 'Chrome', 'Safari'],
		explanation: 'Chrome hat die Eigenschaft hyphens nur in Version 55 für Mac implementiert.'
	}, {
		category: 'CSS',
		question: 'Welche Deklaration ist falsch?',
		solution: 'width: calc(50%-20px)',
		falses: ['fill: #c0ffee', 'font: bold 1.2em/1.5 serif',
			'text-align: start'],
		explanation: 'Bei calc müssen die Rechenzeichen + und -, nicht aber * und / , durch Leerzeichen von den Operatoren getrennt werden.'
	}, {
		category: 'CSS',
		question: 'Gegenwärtige Browser&shy;unterstützung außen vor, was ergibt laut Spezifikation keinen dunkelblauen Hintergrund?',
		solution: 'background-color: linear-gradient(#006, #008)',
		falses: ['background-color: darkblue', 'background-color: #006f',
			'background-color: hsl(240deg, 100%, 30%)'],
		explanation: 'Laut CSS Color Module Level 4 ist die Angabe des Hue-Winkels(!) auch mit deg erlaubt. <br> Die vierstelligen Angaben werden in RGBA umgewandelt, ergeben daseelbe wie #000066ff und rgba(0, 0, 102, 1).<br> Damit ist "background-color: linear-gradient(#006, #008)" falsch, es muss "background" oder besser "background-image" heißen.'
	}, {
		category: 'CSS',
		question: 'Die Angabe der Zeichencodierung einer CSS-Datei ist …?',
		solution: '… nicht erforderlich, wenn HTML-Datei und CSS-Datei dieselbe Zeichencodierung verwenden',
		falses: ["… gemacht mit @charset 'UTF-8'; am Anfang der CSS-Datei",
			'… erledigt mit <link rel="stylesheet" href="standard.css" charset="UTF-8"> im HTML',
			'… hinfällig, da im CSS-Code nur ASCII-Zeichen auftreten können'],
		explanation: ''
	}, {
		category: 'CSS',
		question: 'Unterstützung durch die verwendete Schriftart vorausgesetzt, lässt sich per CSS vieles erreichen. Aber was nicht?',
		solution: 'Dass gerade Anführungszeichen (\' und ") als smart quotes (“”/‘’) dargestellt werden.',
		falses: [
			'Dass die 0 wahlweise ohne Strich durch oder zur besseren Unterscheidung vom O mit Strich durch dargestellt wird.',
			'Dass bei Doppelvokalen/Doppelkonsonanten die gleichen Buchstaben mit unterschiedlichen Glyphen dargestellt werden, bspw. um eine zerkratzte Schrift echter aussehen zu lassen',
			'Dass bestimmte Buchstabenkombinationen durch ein Icon ersetzt werden, bspw. MENÜ durch ≡.'
			],
		explanation: 'Nullen kann man mit dem OpenType-Feature gestalteten: http://www.preusstype.com/techdata/otf_zero.php'
	}, {
		question: 'Wie nennt man den Ansatz, Grund&shy;funktionalität auch für nicht so gute Geräte bereitzustellen und für fähigere Geräte bessere Funktionen anzubieten?',
		solution: 'progressive enhancement',
		falses: ['responsive web design', 'mobile first', 'graceful degradation'],
		category: 'Grundbegriffe'
	}, {
		question: 'Welches ist das erste Zitat in der Zitatesammlung',
		solution: 'Man verdient an: <br> ● man hat was, was andere gerne hätten <br> ● man kann was, was andere nicht können <br> ● mn darf was, was andere nicht dürfen<br> Das hat mir in Momenten der Orientierungslosigkeit eigentlich immer geholfen, am nächsten Tag wieder Geld zu verdienen. <br> (Tom)',
		falses: [
			'Das geht nicht mit HTML zu lösen. Nur mit Geld. (Sven Rautenberg)',
			'dafür haben wir eine recht ansehnliche "münzsammlung" namens selfhtml (wahsaga)',
			'aber bevor du nach längerem Lesen #F00 siehst und dich deshalb #000 ärgern könntest, weil du dem Autor vielleicht sowieso nicht so ganz #0F0 bist, solltest du lieber mal einen Tag #00F machen.<br>Vielleicht gibt es auch noch andere triftige #0F0-de dafür.(Der Martin)'
			],
		category: 'self'
	}, {
		category: 'self',
		question: 'Von wem stammen die meisten Zitate?',
		solution: 'Cheatah',
		falses: ['Gunnar Bittersmann', 'at', 'ChrisB'],
		explanation: 'Cheatah führt mit 275 Zitaten die Liste an, es folgen ChrisB mit 112, Gunnar Bittersmann mit 83, at mit 76 und Der Martin mit 75 Zitaten'
	}, {
		question: 'Wann startete das Wiki?',
		solution: '14. März 2010 ',
		falses: ['20. April 2015', '20.11.2006 ', '04.06.1995'],
		category: 'self'
	}, {
		question: 'Wie viele Inhaltsseiten gibt es derzeit im Wiki?',
		solution: '2.651',
		falses: ['> als 5.000', '1651', '2051'],
		category: 'self'
	}, {
		category: 'SVG',
		question: 'Wie kann man in SVG einen Kreis zeichnen?',
		solution: 'mit den Elementen: circle, ellipse, path und rect',
		falses: ['mit den Elementen circle oder ellipse',
			'mit den Elementen circle, ellipse und path',
			'nur mit dem circle-Element'],
		explanation: 'einen Kreis erreichen Sie natürlich mit einem circle-Element, aber auch wenn bei einer ellipse rx und ry gleich sind, mit einem Pfad mit einem Kreisbogen und mit einem rect, dessen rx und ry-Radius die Hälfte der Breite und Höhe beträgt.'
	}, {
		category: 'SVG',
		question: 'In SVG 2 wird XLink zugunsten von normalen href-Attributen deprecated. In welchen Browsern funktioniert dies (Stand Dezember 2016) noch nicht?',
		solution: 'Firefox und Safari',
		falses: ['IE 9-11', 'alle Microsoft-Browser', 'IE 9-11, Edge und Safari'],
		explanation: 'Wider Erwarten hat selbst IE 9 dies implementiert. Firefox 51 wird im Januar 2017 nachziehen, sodass dann nur Safari und ältere Browser noch zwingend XLink:href benötigen.'
	}, {
		category: 'SVG',
		question: 'Mehrzeiliger Text ist in SVG möglich, wenn Sie …',
		solution: 'mehrere tspan-Elemente einfügen',
		falses: ['eine width-Angabe vornehmen', 'den Text mit <br> formatieren',
			'das line-Attribut verwenden'],
		explanation: 'In SVG 2 ist es geplant mit einem width-Angabe mehrzeiligen Text zu ermöglichen, bis dahin muss man mehrere tspan-Elemente verwenden.'
	}, {
		category: 'SVG',
		question: 'Wie können Sie in SVG Präsentations&shy;eigenschaften animieren?',
		solution: 'CSS-Animationen',
		falses: ['Animationen mit SMIL', 'nur mit JavaScript',
			'nur durch Verwendung einer externen Library wie GSAP oder D3.js'],
		explanation: 'CSS-Animationen in SVG funktionieren in allen modernen Browsern, aber noch nicht im IE<11.'
	}, {
		category: 'SVG',
		question: 'Mit dem stroke-Attribut können Sie die Randlinien von Text und anderen grafische Objekten gestalten. Nicht möglich sind jedoch: …',
		solution: 'variable Randstärken',
		falses: ['Strichelungen in Morse-Code', 'mehrfarbige Muster',
			'radiale Verläufe'],
		explanation: 'Umrandungen sind gegenüber CSS3 eine der Stärken von SVG, die in ein CSS Modul fills und strokes übernommen werden sollen. Allerdings sind variable Strichstärken für natürlichere Formen (noch) nicht möglich.'
	}, {
		category: 'SVG',
		question: 'Wie können Sie in SVG die Größe einer Grafik mit CSS animieren?',
		solution: 'durch die Animation der (gleichfarbigen) Randstärke',
		falses: ['durch die Verschiebung der x- und y-Koordinaten',
			'durch transform: scale(x,y)',
			'durch die Animation des width- und height-Attributs'],
		explanation: 'In SVG 2 werden Größenangaben wie x,y, width und height zu animierbaren Präsentations&shy;eigenschaften. Die CSS-Animation von Transformationen wäre ein guter Weg, ist im Edge jedoch noch nicht möglich. So bleibt nur die Animation der Ranstärke. '
	}, {
		category: 'SVG',
		question: 'Das viewBox-Attribut ermöglicht es, …',
		solution: '… einen pixelorientierten Ausschnitt mit fester Pixelbreite in einem  "neuen" Koordinaten&shy;system an eine beliebige verfügbare Breite anpassen',
		falses: ['… Grundformen passend zu skalieren',
			'rechteckige Grundformen sichtbar zu machen',
			'… mit CSS-Animation Kamerafahrten über eine Landkarte und ein Zoom ins das Ziel ermöglichen'
			],
		explanation: 'Mit dem viewbox-Attrbut können Sie SVG-Grafiken in einem "neuen" Koordinatensystem passend skalieren. Da es keine Präsentations&shy;eigenschaft ist, kann es aber nicht mit CSS animiert werden.'
	}],
	emptyContainer: function () {
		var t = this;
		while (t.container.firstChild) {
			t.container.removeChild(t.container.firstChild);
		}
	},
	handleInput: function () {
		var t = this, // t points to myQuiz
			// create real array so we can use forEach
			inputs = Array.from(t.container.getElementsByTagName("input")),
			selectedSolution = "";
		// determine selection
		inputs.forEach(function (o) {
			if (o.checked) {
				selectedSolution = o.value;
			}
		});
		// process selected answer
		if (selectedSolution && t.currentQuestion) {
			t.currentChoices.push({
				a: selectedSolution,
				q: t.currentQuestion
			});
			t.play();
		}
		// accept start button
		if (!t.currentQuestion) {
			t.play();
		}
	},
	init: function () {
		var t = this;
		// here goes any code for loading data from an external source
		t.container = document.getElementById("quiz");
		if (t.data.length && t.container) {
			// use anonymous functions so in handleInput
			// "this" can point to myQuiz
			t.container.addEventListener("submit", function (ev) {
				t.handleInput();
				ev.stopPropagation();
				ev.preventDefault();
				return false;
			});
			t.container.addEventListener("mouseup", function (ev) {
				// we want to only support clicks on start buttons...
				var go = ev.target.tagName.match(/^button$/i);
				// ... and labels for radio buttons when in a game
				if (ev.target.tagName.match(/^label$/i) && t.currentQuestion) {
					go = true;
				}
				if (go) {
					window.setTimeout(function () {
						t.handleInput();
					}, 50);
					ev.stopPropagation();
					ev.preventDefault();
					return false;
				}
			});
			t.start();
		}
	},
	intoContainer: function (el, parentType) {
		var t = this,
			parent;
		if (!el) {
			return;
		}
		if (parentType) {
			parent = document.createElement(parentType);
			parent.appendChild(el);
		} else {
			parent = el;
		}
		t.container.appendChild(parent);
		return parent;
	},
	// ask next question or end quiz if none are left
	play: function () {
		var t = this,
			ol;
		// game over?
		if (!t.questions.length) {
			t.showResults();
			// offer restart
			window.setTimeout(function () {
				t.start();
			}, 50);
			return;
		}
		t.currentQuestion = t.questions.shift();
		t.createOptions();
	},
	// list with remaining quiz question objects
	questions: [],
	// list original questions and given answers and elaborate on solutions
	showResults: function () {
		var cat, ol, s, scores = {},
			t = this,
			tab, thead, tbody, tr;
		t.emptyContainer();
		// show message
		t.intoContainer(t.createElement({
			tag: "p",
			text: "Sie haben alle Fragen in 1.Klasse Allgemeinwissen beantwortet. Hier die Auswertung Ihrer Antworten:"
		}));
		// list questions and given answers
		ol = t.intoContainer(t.createElement({
			id: "result",
			tag: "ol"
		}));
		t.currentChoices.forEach(function (o) {
			var p, li = ol.appendChild(t.createElement({
				tag: "li"
			}));
			// list original question
			li.appendChild(t.createElement({
				className: "question",
				tag: "p",
				text: "(" + o.q.category + ") " + o.q.question
			}));
			// list given answer
			p = li.appendChild(t.createElement({
				tag: "p",
				text: "Ihre Antwort: "
			}));
			p.appendChild(t.createElement({
				className: (o.q.solution == o.a ? "correct" : "wrong"),
				tag: "em",
				text: o.a
			}));
			// wrong answer?
			if (o.q.solution != o.a) {
				p = li.appendChild(t.createElement({
					tag: "p",
					text: "Die richtige Antwort wäre gewesen: "
				}));
				p.appendChild(t.createElement({
					tag: "em",
					text: o.q.solution
				}));
			}
			// elaborate on solution?
			if (o.q.explanation) {
				p = li.appendChild(t.createElement({
					tag: "p",
					text: "Erläuterung: "
				}));
				p.appendChild(t.createElement({
					tag: "em",
					text: o.q.explanation
				}));
			}
		});
		// display a kind of percentual score over the categories
		cat = [];
		t.currentChoices.forEach(function (o) {
			if (!cat.includes(o.q.category)) {
				cat.push(o.q.category);
			}
		});
		cat.sort();
		cat.forEach(function (c) {
			var correct = 0,
				num = 0;
			t.currentChoices.forEach(function (o) {
				if (o.q.category == c) {
					num++;
					if (o.q.solution == o.a) {
						correct++;
					}
				}
			});
			scores[c] = Math.floor(100 * correct / num) + "%";
		});
		tab = t.intoContainer(t.createElement({
			id: "scores",
			tag: "table"
		}));
		tab.appendChild(t.createElement({
			tag: "caption",
			text: "Übersicht nach Kategorien"
		}))
		thead = tab.appendChild(t.createElement({
			tag: "thead"
		}))
		tr = thead.appendChild(t.createElement({
			tag: "tr"
		}))
		for (s in scores) {
			tr.appendChild(t.createElement({
				tag: "th",
				text: s
			}));
		}
		tbody = tab.appendChild(t.createElement({
			tag: "tbody"
		}))
		tr = tbody.appendChild(t.createElement({
			tag: "tr"
		}))
		for (s in scores) {
			tr.appendChild(t.createElement({
				tag: "td",
				text: scores[s]
			}));
		}
		// show message
		t.intoContainer(t.createElement({
			tag: "p",
			text: "Möchten Sie es erneut versuchen?"
		}));
	},
	// helper function: shuffle array (adapted from http://javascript.jstruebig.de/javascript/69)
	shuffleArray: function (a) {
		var i = a.length;
		while (i >= 2) {
			var zi = Math.floor(Math.random() * i);
			var t = a[zi];
			a[zi] = a[--i];
			a[i] = t;
		}
		// no return argument since the array has been
		// handed over as a reference and not a copy!
	},
	// start quiz with a start button
	start: function (start) {
		var t = this;
		// fill list of remaining quiz questions
		t.questions = [];
		t.data.forEach(function (o) {
			t.questions.push(o);
		});
		t.shuffleArray(t.questions);
		t.currentChoices = [];
		t.currentQuestion = null;
		// install start button
		t.intoContainer(t.createElement({
			className: "startBtn",
			tag: "button",
			text: "Starte 1.Klasse Allgemeinwissen erneut"
		}), "p");
	}
};
document.addEventListener("DOMContentLoaded", function () {
	myQuiz.init();
});