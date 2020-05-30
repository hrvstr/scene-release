'use strict';

var match = require('string-match');

module.exports = function(name){
  // TODO: split out RegExps for each type(x264, TV, MP3, Games, etc.)
  var data = {
    episode: match(name, /(s\d{2,}e\d{2,})|(e\d{2,})|(s\d{2,})/i), // plz simplify regex
    date: match(name, /\d{4}(\.\d{2}){2}/),
    year: match(name, /(?!^)(?!1080|2160)[1,2]\d{3}/),
    resolution: match(name, /\d{3,4}p/i),
    format: match(name, /HDR10Plus/i),
    type: match(name, /(?<=\.)(CAM|TS(?!C)|TELESYNC|(DVD|BD)SCR|SCR|DDC|R5[\.\s]LINE|R5|U*HDR*|(DVD|HD(TV)*|BR|BD|WEB)Rip|DVDR|(HD|PD)TV|WEB-DL|WEBDL|WEB|BluRay)(?=\.)/i),
    source: match(name, /(?<=\.)(NETFLIX|AMZN|HULU|COOK|PBS|HMAX|iP|DL)(?=\.)/),
    video: match(name, /(?<=\.)(NTSC|PAL|[xh][\.\s]?26(4|5)|XVID|HEVC|REMUX(\.AVC)?)(?=\.)?/i),
    audio: match(name, /(?<=\.)(DUBBED|AAC2[\.\s]0|AAC|AC3D*|DTS(-HD)?|(DD|MA)\S?(5|2)\.(1|0))/i),
    language: match(name, /(?<=\.)(MULTiSUBS|MULTi|NORDiC|DANiSH|SWEDiSH|NORWEGiAN|GERMAN|iTALiAN|FRENCH|SPANiSH)(?=\.)/i),
    edition: match(name, /(?<=\.)(UN(RATED|CUT)|DC|(Directors|EXTENDED)[\.\s](CUT|EDITION)|EXTENDED|REMASTERED|3D|2D|\bNF\b)(?=\.)/i),
    tags: match(name, /COMPLETE|LiMiTED|iNTERNAL|DOKU|DOCU|REAL/i),
    release: match(name, /REAL[\.\s]PROPER|PROPER|REPACK|READNFO|READ[\.\s]NFO|DiRFiX|NFOFiX|RERiP/i),
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
