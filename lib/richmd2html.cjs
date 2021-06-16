const regularExpressionsMD = new Map();
regularExpressionsMD.set('h1', /[^#]#\s(.*)/gm); // HEADING 1
regularExpressionsMD.set('h2', /[^#]##\s(.*)/gm); // HEADING 2
regularExpressionsMD.set('h3', /[^#]###\s(.*)/gm); // HEADING 3
regularExpressionsMD.set('h4', /[^#]####\s(.*)/gm); // HEADING 4
regularExpressionsMD.set('h5', /[^#]#####\s(.*)/gm); // HEADING 5
regularExpressionsMD.set('h6', /######\s(.*)/gm); // HEADING 6
regularExpressionsMD.set('i', /[^*]\*([^\*].*?)\*/gm);  // CURSIVA
regularExpressionsMD.set('strong', /[^*]\*\*([^\*].*?)\*\*/gm); // NEGRITA
regularExpressionsMD.set('strong-i', /[^*]\*\*\*(.*?)\*\*\*/gm); // NEGRITA-CURSIVA
regularExpressionsMD.set('u', /[^·]··(.*?)··/gmi); // SUBRAYADO

const regularExpressionsRich = new Map();
regularExpressionsRich.set('color', /\|([\(\)\w#\.,\s]*)\|(.*)/gm);
regularExpressionsRich.set('background', /\|_([\/\w\.\-:_\?&#]*)_\|(.*)/gm);


exports.parseRMD = function parseRMD(text) {
  let newText = text;
  const parRegExpMD = [...regularExpressionsMD.entries()];
  parRegExpMD.forEach((parRegExp) => {
    const key = parRegExp[0];
    const regexp = parRegExp[1];
    const result = [...text.matchAll(regexp)];
    if (result.length) {
      result.forEach((coincidence)=> {
        const resultColor = regularExpressionsRich.get('color').exec(coincidence[1]);
        newText = replaceMD(newText, key, coincidence, resultColor);
        const resultIMG = regularExpressionsRich.get('background').exec(coincidence[1]);
        newText = replaceIMG(newText, coincidence, resultIMG, resultColor);
      });
    }
  });
  return newText;
}

function replaceIMG(newText, coincidence, resultIMG = null, resultColor = null) {
  const texto = (resultColor) ? resultColor[2] : coincidence[1];
  if (resultIMG) {
    newText = newText.replace(texto, `<span style="background-image:url('${resultIMG[1]}'); background-position:50% 100%;">${resultIMG[2]}</span>`);
  }
  return newText;
}

function replaceMD(text, key, coincidence, resultColor = null) {
  let color = '';  
  let newText;
  if (resultColor) {
    color = ` color="${resultColor[1]}"`;
    texto = resultColor[2];
  } else {
    texto = coincidence[1];
  }
  if (key === 'strong-i') {
    newText = text.replace(coincidence[0], `<strong${color}"><i>${texto}</i></strong>`);
  } else { 
    newText = text.replace(coincidence[0], `<${key}${color}>${texto}</${key}>`);
  }
  return newText;
}