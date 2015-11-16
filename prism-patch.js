'use strict';

Prism.highlight = function (text, grammar, language) {
  text = text.split('\n');

  var tokens = Prism.tokenize(text, grammar);
  return Prism.Token.stringify(Prism.util.encode(tokens), language);
};

Prism.tokenize = function(text, grammar, language) {
  var Token = Prism.Token,
    rest = grammar.rest;

  if (rest) {
    for (var token in rest) {
      grammar[token] = rest[token];
    }
    delete grammar.rest;
  }

  var newText = [],
    pattern,
    lineMatches,
    patternIndexes,
    matchesMap,
    match,
    lineTmp,
    line;

  for (var i = -1, len = text.length; ++i < len; ) {
    line = text[i];
    lineTmp = line;
    lineMatches = [];

    for (token in grammar) {
      if(!grammar.hasOwnProperty(token) || !grammar[token]) {
        continue;
      }

      pattern = grammar[token];
      match = pattern.exec(lineTmp);

      if (match) {
        match = match[0];
        var wrapped = new Token(token, match);
        lineMatches.push(wrapped);
        lineTmp = lineTmp.replace(match, '');
      }
    }

    if (lineMatches.length) {
        var j, k, from, to, pI,
          lmEl;
        patternIndexes = {};
        matchesMap = {};

        for (j = -1, k = lineMatches.length; ++j < k; ) {
          lmEl = lineMatches[j].content;
          from = line.indexOf(lmEl);
          to = from + lmEl.length;
          patternIndexes[from] = to;
          matchesMap[from] = lineMatches[j];
        }

        from = 0;
        to = 0;

        for (j = -1, k = line.length; ++j < k; ) {
          pI = patternIndexes[j];

          if (j === 0 && pI) {
            from = pI;
            to = from;
            newText.push(matchesMap[j]);
            j = pI;
          } else if (pI) {
            to = j;

            if (from !== to) {
                newText.push(line.substring(from, to));
            }
            newText.push(matchesMap[j]);

            from = pI;
            j = pI;
            to = pI;
          }
        }
        if (to < line.length) {
          newText.push(line.substring(to, line.length));
        }
    } else {
      newText.push(line);
    }

    newText.push('\n');
  }

  return newText;
};