'use strict';

var match = require('string-match');

module.exports = function(name){
  // TODO: split out RegExps for each type(x264, TV, MP3, Games, etc.)
  var data = {
    episode: match(name, /s\d+e\d+/i), 
    date: match(name, /\d{4}(\.\d{2}){2}/),
    year: match(name, /(?!^)(?!1080|2160)[1,2]\d{3}/),
    resolution: match(name, /\d{3,4}p/i),
    type: match(name, /CAM|\.TS(?!C)|TELESYNC|(DVD|BD)SCR|SCR|DDC|R5[\.\s]LINE|R5|(DVD|HD|BR|BD|WEB)Rip|WEB|DVDR|(HD|PD)TV|((AMZN|HULU|COOK)\.)*WEB-DL|WEBDL|BluRay/i),
    video: match(name, /NTSC|PAL|[xh][\.\s]?264|XVID/i),
    audio: match(name, /AAC2[\.\s]0|AAC|AC3|DTS|DD\S5\.1/i),
    language: match(name, /MULTiSUBS|MULTi|NORDiC|DANiSH|SWEDiSH|NORWEGiAN|GERMAN|iTALiAN|FRENCH|SPANiSH/i),
    edition: match(name, /UNRATED|DC|(Directors|EXTENDED)[\.\s](CUT|EDITION)|EXTENDED|3D|2D|\bNF\b/i),
    tags: name.match(/COMPLETE|LiMiTED|iNTERNAL/i),
    release: match(name, /REAL[\.\s]PROPER|PROPER|REPACK|READNFO|READ[\.\s]NFO|DiRFiX|NFOFiX/i),
    group: match(name, /[A-Za-z0-9]+$/)
  };

  var matches = '';
  for(var key in data){
    var value = data[key];
    if(!value) continue;

    matches += value + '|';
  }

  data.title = name
    .replace(RegExp(matches + '-', 'g'), '')
    .replace(/\./g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
  data.original = name;

  Object.keys(data).forEach(function(key) {
    if(!data[key]){
      delete data[key];
      return;
    }

    if(key === 'edition' || key === 'release'){
      data[key] = data[key]
        .replace(/\./g, ' ')
        .trim();
    }
  });

  return data;
};
