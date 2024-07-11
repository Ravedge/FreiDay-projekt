'use strict';
}
function start
nextButton.classList.add ("hide");
while (answerButtons.firstChild) {
answerButtons.removeChild; (answerButtons.firstChild);
	
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
		category: 'Grundwissen Deutschland',
		question: 'Wie viele Bundesländer hat Deutschland?',
		solution: '16',
		falses: ['14',
			'17',
			'15'],
		explanation: 'Schleswig Holstein, Niedersachsen, Nordrhein-Westfalen, Bayern, Hessen, Hamburg, Bremen, Berlin, Thüringen, Sachsen, Sachsen-Anhalt, Brandenburg, Mecklenburg-Vorpommern, Saarland, Rheinland-Pfalz, Baden- Württemberg.'
	}, {
     		category: 'Grundwissen Deutschland',
		question: 'Welches der folgenden Bundesländer grenzt NICHT an Bayern?',
		solution: 'Sachsen-Anhalt,
		falses: ['Hessen',
			'Sachsen'],
		explanation: 'Karte'
	}, { 
		category: 'Grundwissen Deutschland',
		question: 'Welches ist das zweitgrößte Bundesland Deutschlands?',
		solution: 'Niedersachsen',
		falses: ['Baden-Württemberg',
                'Nordrhein-Westfalen']
		explanation: 'Karte'
	}, {
		category: 'Grundwissen Deutschland',
		question: 'Welches Bundesland hat die meisten Einwohner?',
		solution: 'Nordrhein-Westfalen',
		falses: ['Bayern',
			'Niedersachsen'],
		explanation: 'Karte'
	}, {
		category: 'Grundwissen Deutschland',
		question: 'Wie viele Menschen leben etwa in Deutschland? (Stand Mai 2024)',
		solution: '86.629.401',
		falses: ['83.007.182',
			'84.629.401','85.947.291'],
		explanation: 'Karte'
	}, {
		category: 'Grundwissen Internationale Politik',
		question: 'Wofür steht NATO?',
		solution: 'Nirth Atlantic Treaty Organisation',
		falses: ['Northern Atlantic Trading Organisation',
			'North Atlantic Trading Organisation','Northern Atlantic Territory Organisation'],
		explanation: ''
	}, {
		category: 'Grundwissen Internationale Politik',
		question: 'Wie viele Staaten sind Mitglieder in der EU?(Stand Mai 2024)',
		solution: '27',
		falses: ['32',
			'25','29'],
		explanation: 'Mitgliedsstaaten'
	}, {
		category: 'Grundwissen Internationale Politik',
		question: 'Wann war der Brexit?',
		solution: '2020',
		falses: ['2011',
			'2019','2021'],
		explanation: ''
	}, {
		category: 'Grundwissen Internationale Politik',
		question: 'Wer ist stand 2023 im EU-Parlament Kommisions Präsident/-in',
		solution: 'Ursula von der Leyen',
		falses: ['José Manuel Barroso',
			'Romano Prodi','Jean-Claude Juncker'],
		explanation: ''
	}, {
		category: 'Grundwissen Internationale Politik',
		question: 'Wo sitzt das EU-Parlament?(ein standort reicht)',
		solution: 'Brüssel','Luxemburg',
		falses: ['Berlin',
			'Weimar'],
		explanation: ''
	}, {
		category: 'Geographisches in Deutschland',
		question: 'Wie heißt das Zweitgrößte Gebirge in Deutschland?',
		solution: 'Der Schwarzwald',
		falses: ['Der Harz',
			'Die Alpen','Der Bayrische Wald'],
		explanation: ''
	}, {
		category: 'Geographisches in Deutschland',
		question: 'Wo liegt der Schwarzwald?',
		solution: 'Im Südwesten Deutschlands, größtenteils Baden-Württemberg',
		falses: ['im Südosten Deutschlands, größtenteils in Bayern',
			'Zwischen Baden- Württemberg und Hessen','Zwischen Baden- Württemberg und Hessen'],
		explanation: 'Karte'
	}, {
		category: 'Geographisches in Deutschland',
		question: 'Wie viele Hallingen gehören zu Deutschland?',
		solution: '9',
		falses: ['10',
			'11'],
		explanation: ''
	}, {
		category: 'Geographisches in Deutschland',
		question: 'Welches Bundesland hat direkten Zugang zu Nord und Ostsee',
		solution: 'Schleswig Holstein',
		falses: ['Mecklenburg Vorpommern',
			'Niedersachsen'],
		explanation: ''
	},
	emptyContainer: function () {
		var t = this;
		while (t.container.firstChild) {
			t.container.removeChild(t.container.firstChild);
		}
	},]
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