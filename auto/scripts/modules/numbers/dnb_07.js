const MODULE_DNB_07 = {
  "id": "dnb_07",
  "num": 7,
  "title": "Carrés des entiers de 1 à 12",
  "level_tags": [
    "4e",
    "3e",
    "DNB"
  ],
  "source": "source_dynamique_07",
  "has_svg": true,
  "questions": [
    {
      "n": 1,
      "statement": "Donne le carré de ${n} :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"180\" height=\"150\" viewBox=\"0 0 180 150\" style=\"display:block;max-width:180px;margin:10px auto\">\n<rect x=\"55\" y=\"18\" width=\"90\" height=\"90\" rx=\"2\" fill=\"#eef6fb\" stroke=\"#315b72\" stroke-width=\"2\"/>\n<path d=\"M55 96h12v12\" fill=\"none\" stroke=\"#315b72\" stroke-width=\"1.5\"/>\n<text x=\"100\" y=\"69\" font-family=\"sans-serif\" font-size=\"20\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#17384d\">A = ?</text>\n<text x=\"100\" y=\"137\" font-family=\"sans-serif\" font-size=\"20\" text-anchor=\"middle\">${n}</text>\n<text x=\"34\" y=\"69\" font-family=\"sans-serif\" font-size=\"20\" text-anchor=\"middle\">${n}</text>\n</svg>",
      "answer": "[\"n*n\"]",
      "options": {
        "formula_code": "setNB(1)\nn=RD(1,12)"
      },
      "footer": "$$${n}^2=[[dots]]$$"
    },
    {
      "n": 2,
      "statement": "Donne le carré de ${n} :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"180\" height=\"150\" viewBox=\"0 0 180 150\" style=\"display:block;max-width:180px;margin:10px auto\">\n<rect x=\"55\" y=\"18\" width=\"90\" height=\"90\" rx=\"2\" fill=\"#eef6fb\" stroke=\"#315b72\" stroke-width=\"2\"/>\n<path d=\"M55 96h12v12\" fill=\"none\" stroke=\"#315b72\" stroke-width=\"1.5\"/>\n<text x=\"100\" y=\"69\" font-family=\"sans-serif\" font-size=\"20\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#17384d\">A = ?</text>\n<text x=\"100\" y=\"137\" font-family=\"sans-serif\" font-size=\"20\" text-anchor=\"middle\">${n}</text>\n<text x=\"34\" y=\"69\" font-family=\"sans-serif\" font-size=\"20\" text-anchor=\"middle\">${n}</text>\n</svg>",
      "answer": "[\"n*n\"]",
      "options": {
        "formula_code": "setNB(1)\nn=RD(1,12)"
      },
      "footer": "$$${n}^2=[[dots]]$$"
    },
    {
      "n": 3,
      "statement": "Quel est le nombre entier positif dont le carré est égal à ce résultat ?\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"180\" height=\"150\" viewBox=\"0 0 180 150\" style=\"display:block;max-width:180px;margin:10px auto\">\n<rect x=\"55\" y=\"18\" width=\"90\" height=\"90\" rx=\"2\" fill=\"#eef6fb\" stroke=\"#315b72\" stroke-width=\"2\"/>\n<path d=\"M55 96h12v12\" fill=\"none\" stroke=\"#315b72\" stroke-width=\"1.5\"/>\n<text x=\"100\" y=\"69\" font-family=\"sans-serif\" font-size=\"20\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#17384d\">A = ${c}</text>\n<text x=\"100\" y=\"137\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">?</text>\n</svg>",
      "answer": "[\"n\"]",
      "options": {
        "formula_code": "setNB(1)\nn=RD(1,12)\nc=n*n"
      },
      "footer": "$$[[dots]]^2=${c}$$"
    },
    {
      "n": 4,
      "statement": "Quel est le nombre entier positif dont le carré est égal à ce résultat ?\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"180\" height=\"150\" viewBox=\"0 0 180 150\" style=\"display:block;max-width:180px;margin:10px auto\">\n<rect x=\"55\" y=\"18\" width=\"90\" height=\"90\" rx=\"2\" fill=\"#eef6fb\" stroke=\"#315b72\" stroke-width=\"2\"/>\n<path d=\"M55 96h12v12\" fill=\"none\" stroke=\"#315b72\" stroke-width=\"1.5\"/>\n<text x=\"100\" y=\"69\" font-family=\"sans-serif\" font-size=\"20\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#17384d\">A = ${c}</text>\n<text x=\"100\" y=\"137\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">?</text>\n</svg>",
      "answer": "[\"n\"]",
      "options": {
        "formula_code": "setNB(1)\nn=RD(1,12)\nc=n*n"
      },
      "footer": "$$[[dots]]^2=${c}$$"
    },
    {
      "n": 5,
      "statement": "Complète l'égalité avec deux nombres entiers :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"180\" height=\"150\" viewBox=\"0 0 180 150\" style=\"display:block;max-width:180px;margin:10px auto\">\n<rect x=\"55\" y=\"18\" width=\"90\" height=\"90\" rx=\"2\" fill=\"#eef6fb\" stroke=\"#315b72\" stroke-width=\"2\"/>\n<path d=\"M55 96h12v12\" fill=\"none\" stroke=\"#315b72\" stroke-width=\"1.5\"/>\n<text x=\"100\" y=\"69\" font-family=\"sans-serif\" font-size=\"20\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#17384d\">A = ${c}</text>\n<text x=\"100\" y=\"137\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">?</text>\n<text x=\"34\" y=\"69\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">?</text>\n</svg>",
      "answer": "[\"n\",\"n\"]",
      "options": {
        "formula_code": "setNB(1)\nn=RD(1,12)\nc=n*n"
      },
      "footer": "$$${c}=[[dots]]\\times[[dots]]$$"
    },
    {
      "n": 6,
      "statement": "Quel est le carré de $$${n}$$ ?\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"180\" height=\"150\" viewBox=\"0 0 180 150\" style=\"display:block;max-width:180px;margin:10px auto\">\n<rect x=\"55\" y=\"18\" width=\"90\" height=\"90\" rx=\"2\" fill=\"#eef6fb\" stroke=\"#315b72\" stroke-width=\"2\"/>\n<path d=\"M55 96h12v12\" fill=\"none\" stroke=\"#315b72\" stroke-width=\"1.5\"/>\n<text x=\"100\" y=\"69\" font-family=\"sans-serif\" font-size=\"20\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#17384d\">A = ?</text>\n<text x=\"100\" y=\"137\" font-family=\"sans-serif\" font-size=\"20\" text-anchor=\"middle\">${n}</text>\n<text x=\"34\" y=\"69\" font-family=\"sans-serif\" font-size=\"20\" text-anchor=\"middle\">${n}</text>\n</svg>&&$$${n*n}$$&&$$${2*n}$$&&$$${n*n+n}$$&&$$${n*n-1}$$&&",
      "answer": "[\"1\"]",
      "options": {
        "formula_code": "setNB(1)\nn=RD(3,12)",
        "shuffle_answers": true
      },
      "footer": "[[formula_qcm1]]"
    },
    {
      "n": 7,
      "statement": "Parmi ces nombres, lesquels sont des carrés parfaits ?&&$$${a}$$&&$$${b}$$&&$$${cc}$$&&$$${e}$$&&",
      "answer": "[\"1\",\"3\"]",
      "options": {
        "formula_code": "setNB(1)\np=RD(3,9)\nq=RD(4,11,[p])\na=p*p\ncc=q*q\nb=p*p+RD(1,5)\ne=q*q-RD(1,5)",
        "shuffle_answers": true
      },
      "footer": "[[formula_qcm]]"
    },
    {
      "n": 8,
      "statement": "Quel encadrement de $$${n}^2$$ est correct ?\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"180\" height=\"150\" viewBox=\"0 0 180 150\" style=\"display:block;max-width:180px;margin:10px auto\">\n<rect x=\"55\" y=\"18\" width=\"90\" height=\"90\" rx=\"2\" fill=\"#eef6fb\" stroke=\"#315b72\" stroke-width=\"2\"/>\n<path d=\"M55 96h12v12\" fill=\"none\" stroke=\"#315b72\" stroke-width=\"1.5\"/>\n<text x=\"100\" y=\"69\" font-family=\"sans-serif\" font-size=\"19\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#17384d\">A = ${n}²</text>\n<text x=\"100\" y=\"137\" font-family=\"sans-serif\" font-size=\"20\" text-anchor=\"middle\">${n}</text>\n<text x=\"34\" y=\"69\" font-family=\"sans-serif\" font-size=\"20\" text-anchor=\"middle\">${n}</text>\n</svg>&&$$${low}\\leq ${n}^2<${high}$$&&$$${nlow}\\leq ${n}^2<${nhigh}$$&&$$${low2}\\leq ${n}^2<${low}$$&&",
      "answer": "[\"1\"]",
      "options": {
        "formula_code": "setNB(1)\nn=RD(5,12)\nc=n*n\nlow=floor(c/10)*10\nhigh=low+10\nlow2=low-10\nnlow=high\nnhigh=high+10",
        "shuffle_answers": true
      },
      "footer": "[[formula_qcm1]]"
    },
    {
      "n": 9,
      "statement": "Calcule :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"290\" height=\"145\" viewBox=\"0 0 290 145\" style=\"display:block;max-width:290px;margin:10px auto\">\n<rect x=\"35\" y=\"18\" width=\"80\" height=\"80\" rx=\"2\" fill=\"#eef6fb\" stroke=\"#315b72\" stroke-width=\"2\"/>\n<path d=\"M35 86h12v12\" fill=\"none\" stroke=\"#315b72\" stroke-width=\"1.5\"/>\n<text x=\"75\" y=\"64\" font-family=\"sans-serif\" font-size=\"18\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#17384d\">A = ${n}²</text>\n<text x=\"75\" y=\"126\" font-family=\"sans-serif\" font-size=\"19\" text-anchor=\"middle\">${n}</text>\n<text x=\"20\" y=\"64\" font-family=\"sans-serif\" font-size=\"19\" text-anchor=\"middle\">${n}</text>\n<g display=\"${dispTerm}\"><text x=\"180\" y=\"66\" font-family=\"sans-serif\" font-size=\"25\" font-weight=\"600\" text-anchor=\"middle\">${op}${k}</text></g>\n<g display=\"${dispSecond}\">\n<text x=\"145\" y=\"66\" font-family=\"sans-serif\" font-size=\"25\" text-anchor=\"middle\">+</text>\n<rect x=\"175\" y=\"18\" width=\"80\" height=\"80\" rx=\"2\" fill=\"#eef6fb\" stroke=\"#315b72\" stroke-width=\"2\"/>\n<path d=\"M175 86h12v12\" fill=\"none\" stroke=\"#315b72\" stroke-width=\"1.5\"/>\n<text x=\"215\" y=\"64\" font-family=\"sans-serif\" font-size=\"18\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#17384d\">A = ${n}²</text>\n<text x=\"215\" y=\"126\" font-family=\"sans-serif\" font-size=\"19\" text-anchor=\"middle\">${n}</text>\n</g>\n</svg>",
      "answer": "[\"r\"]",
      "options": {
        "formula_code": "setNB(1)\nn=RD(2,12)\nmode=RD(0,2)\nkmax=(n*n-1<9)?n*n-1:9\nk=RD(1,kmax)\nr=(mode===0)?n*n+k:(mode===1)?n*n-k:2*n*n\nexpr=(mode===0)?\"{n}^2+{k}\":(mode===1)?\"{n}^2-{k}\":\"2\\\\times {n}^2\"\nop=(mode===0)?\"+\":\"−\"\ndispTerm=(mode===2)?\"none\":\"inline\"\ndispSecond=(mode===2)?\"inline\":\"none\""
      },
      "footer": "$$${expr}=[[dots]]$$"
    },
    {
      "n": 10,
      "statement": "Combien vaut $$${n}^2$$ ?\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"180\" height=\"150\" viewBox=\"0 0 180 150\" style=\"display:block;max-width:180px;margin:10px auto\">\n<rect x=\"55\" y=\"18\" width=\"90\" height=\"90\" rx=\"2\" fill=\"#eef6fb\" stroke=\"#315b72\" stroke-width=\"2\"/>\n<path d=\"M55 96h12v12\" fill=\"none\" stroke=\"#315b72\" stroke-width=\"1.5\"/>\n<text x=\"100\" y=\"69\" font-family=\"sans-serif\" font-size=\"19\" font-weight=\"600\" text-anchor=\"middle\" fill=\"#17384d\">A = ${n}²</text>\n<text x=\"100\" y=\"137\" font-family=\"sans-serif\" font-size=\"20\" text-anchor=\"middle\">${n}</text>\n<text x=\"34\" y=\"69\" font-family=\"sans-serif\" font-size=\"20\" text-anchor=\"middle\">${n}</text>\n</svg>&&$$${n*n}$$&&$$${n*n+10}$$&&$$${n*n-10}$$&&$$${2*n}$$&&",
      "answer": "[\"1\"]",
      "options": {
        "formula_code": "setNB(1)\nn=RD(5,12)",
        "shuffle_answers": true
      },
      "footer": "[[formula_qcm1]]"
    }
  ]
};
