'use strict';

var myQuiz = {
  container: null,
  currentChoices: [],
  currentQuestion: null,
  data: [
    {
      category: 'Grundwissen Deutschland',
      question: 'Wie viele Bundesländer hat Deutschland?',
      solution: '16',
      falses: ['14', '17', '15'],
      explanation: 'Schleswig Holstein, Niedersachsen, Nordrhein-Westfalen, Bayern, Hessen, Hamburg, Bremen, Berlin, Thüringen, Sachsen, Sachsen-Anhalt, Brandenburg, Mecklenburg-Vorpommern, Saarland, Rheinland-Pfalz, Baden- Württemberg.'
    },
    {
      category: 'Grundwissen Deutschland',
      question: 'Welches der folgenden Bundesländer grenzt NICHT an Bayern?',
      solution: 'Sachsen-Anhalt',
      falses: ['Hessen', 'Sachsen'],
      explanation: 'Karte'
    },
    {
      category: 'Grundwissen Deutschland',
      question: 'Welches ist das zweitgrößte Bundesland Deutschlands?',
      solution: 'Niedersachsen',
      falses: ['Baden-Württemberg', 'Nordrhein-Westfalen'],
      explanation: 'Karte'
    },
    {
      category: 'Grundwissen Deutschland',
      question: 'Welches Bundesland hat die meisten Einwohner?',
      solution: 'Nordrhein-Westfalen',
      falses: ['Bayern', 'Niedersachsen'],
      explanation: 'Karte'
    },
    {
      category: 'Grundwissen Deutschland',
      question: 'Wie viele Menschen leben etwa in Deutschland? (Stand Mai 2024)',
      solution: '86.629.401',
      falses: ['83.007.182', '84.629.401', '85.947.291'],
      explanation: 'Karte'
    },
    {
      category: 'Grundwissen Internationale Politik',
      question: 'Wofür steht NATO?',
      solution: 'North Atlantic Treaty Organisation',
      falses: ['Northern Atlantic Trading Organisation', 'North Atlantic Trading Organisation', 'Northern Atlantic Territory Organisation'],
      explanation: ''
    },
    {
      category: 'Grundwissen Internationale Politik',
      question: 'Wie viele Staaten sind Mitglieder in der EU?(Stand Mai 2024)',
      solution: '27',
      falses: ['32', '25', '29'],
      explanation: 'Mitgliedsstaaten'
    },
    {
      category: 'Grundwissen Internationale Politik',
      question: 'Wann war der Brexit?',
      solution: '2020',
      falses: ['2011', '2019', '2021'],
      explanation: ''
    },
    {
      category: 'Grundwissen Internationale Politik',
      question: 'Wer ist stand 2023 im EU-Parlament Kommisions Präsident/-in',
      solution: 'Ursula von der Leyen',
      falses: ['José Manuel Barroso', 'Romano Prodi', 'Jean-Claude Juncker'],
      explanation: ''
    },
    {
      category: 'Grundwissen Internationale Politik',
      question: 'Wo sitzt das EU-Parlament?(ein standort reicht)',
      solution: 'Brüssel oder Luxemburg',
      falses: ['Berlin', 'Weimar'],
      explanation: ''
    },
    {
      category: 'Geographisches in Deutschland',
      question: 'Wie heißt das Zweitgrößte Gebirge in Deutschland?',
      solution: 'Der Schwarzwald',
      falses: ['Der Harz', 'Die Alpen', 'Der Bayrische Wald'],
      explanation: ''
    },
    {
      category: 'Geographisches in Deutschland',
      question: 'Wo liegt der Schwarzwald?',
      solution: 'Im Südwesten Deutschlands, größtenteils Baden-Württemberg',
      falses: ['im Südosten Deutschlands, größtenteils in Bayern', 'Zwischen Baden- Württemberg und Hessen', 'Zwischen Baden- Württemberg und Hessen'],
      explanation: 'Karte'
    },
    {
      category: 'Geographisches in Deutschland',
      question: 'Wie viele Hallingen gehören zu Deutschland?',
      solution: '9',
      falses: ['10', '11'],
      explanation: ''
    },
    {
      category: 'Geographisches in Deutschland',
      question: 'Welches Bundesland hat direkten Zugang zu Nord und Ostsee',
      solution: 'Schleswig Holstein',
      falses: ['Mecklenburg Vorpommern', 'Niedersachsen'],
      explanation: ''
    }
  ],

 
  init: function () {
    var t = this;
    t.container = document.getElementById("quiz");
    if (t.container && t.data.length > 0) {
      t.container.addEventListener("click", function (ev) {
        if (ev.target.classList.contains("startBtn")) {
          t.start();
        } else if (ev.target.tagName === "LABEL" && t.currentQuestion) {
          window.setTimeout(function () {
            t.handleInput();
          }, 50);
          ev.stopPropagation();
          ev.preventDefault();
          return false;
        } else if (ev.target.tagName === "BUTTON" && ev.target.textContent === "Bestätigen") {
          t.handleInput();
          ev.stopPropagation();
          ev.preventDefault();
          return false;
        }
      });
    }
  },

  start: function () {
    var t = this;
    t.questions = t.data.slice(); // Copy data array to questions
    t.shuffleArray(t.questions);
    t.currentChoices = [];
    t.currentQuestion = null;
    t.play();
  },

  play: function () {
    var t = this;
    if (t.questions.length === 0 && t.currentChoices.length > 0) {
      t.showResults();
      return;
    }
    t.currentQuestion = t.questions.shift();
    t.createOptions();
  },

  createOptions: function () {
    var t = this;
    t.emptyContainer();
    var questionElement = document.createElement("h2");
    questionElement.textContent = "(" + t.currentQuestion.category + ") " + t.currentQuestion.question;
    t.container.appendChild(questionElement);

    var ul = document.createElement("ul");
    t.currentQuestion.falses.push(t.currentQuestion.solution);
    t.shuffleArray(t.currentQuestion.falses);

    t.currentQuestion.falses.forEach(function (option, index) {
      var li = document.createElement("li");
      var label = document.createElement("label");
      label.textContent = option;

      var radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "answer";
      radio.value = option;

      label.insertBefore(radio, label.firstChild);
      li.appendChild(label);
      ul.appendChild(li);
    });

    t.container.appendChild(ul);

    var confirmButton = document.createElement("button");
    confirmButton.textContent = "Bestätigen";
    confirmButton.addEventListener("click", function () {
      t.handleInput();
    });

    t.container.appendChild(confirmButton);
  },

  handleInput: function () {
    var t = this;
    var selectedAnswer = t.container.querySelector("input[name='answer']:checked");
    if (selectedAnswer) {
      var answerValue = selectedAnswer.value;
      t.currentChoices.push({ a: answerValue, q: t.currentQuestion });
    }
    t.play(); // Proceed to the next question
  },

  showResults: function () {
    var t = this;
    t.emptyContainer();
    t.intoContainer(t.createElement({
      tag: "p",
      text: "Sie haben alle Fragen beantwortet. Hier ist Ihre Auswertung:"
    }));
    var ol = t.intoContainer(t.createElement({
      id: "result",
      tag: "ol"
    }));
    t.currentChoices.forEach(function (o) {
      var li = ol.appendChild(t.createElement({ tag: "li" }));
      li.appendChild(t.createElement({
        className: "question",
        tag: "p",
        text: "(" + o.q.category + ") " + o.q.question
      }));
      var p = li.appendChild(t.createElement({ tag: "p", text: "Ihre Antwort: " }));
      p.appendChild(t.createElement({ className: "answer", tag: "em", text: o.a }));
      if (o.q.solution !== o.a) {
        var answer = li.appendChild(t.createElement({ tag: "p", text: "Richtige Antwort: " }));
        answer.appendChild(t.createElement({ className: "answer", tag: "em", text: o.q.solution }));
      }
    });
    t.intoContainer(t.createElement({
      tag: "p",
      text: "Möchten Sie es erneut versuchen?"
    }));
  },

  emptyContainer: function () {
    var t = this;
    while (t.container.firstChild) {
      t.container.removeChild(t.container.firstChild);
    }
  },

  createElement: function (o) {
    var el = document.createElement(o.tag || "div");
    if (o.text || o.txt) {
      el.textContent = o.text || o.txt;
    }
    for (var p in o) {
      if (p !== 'tag' && p !== 'text' && p !== 'txt') {
        el[p] = o[p];
      }
    }
    return el;
  },

  intoContainer: function (el, parentType) {
    var t = this,
      parent;
    if (!el) return;
    if (parentType) {
      parent = document.createElement(parentType);
      parent.appendChild(el);
    } else {
      parent = el;
    }
    t.container.appendChild(parent);
    return parent;
  },

  shuffleArray: function (array) {
    // Implement array shuffling logic
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  myQuiz.init();
});