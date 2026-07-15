const MODULE_DNB_14 = {
  "id": "dnb_14",
  "num": 14,
  "title": "Lire une abscisse sur une droite graduée",
  "level_tags": [
    "4e",
    "3e",
    "DNB"
  ],
  "source": "import_dnb_zip",
  "has_svg": true,
  "questions": [
    {
      "n": 1,
      "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:700px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"292\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<text x=\"350\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">1</text>\n<line x1=\"${cx}\" y1=\"47\" x2=\"${cx}\" y2=\"73\" stroke=\"#2563a6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2563a6\">A</text>\n</svg>",
      "answer": "[\"val\"]",
      "options": {
        "formula_code": "setNB(1)\ni=RD(0,9,[4,5])\nval=i-4\ncx=60+i*58",
        "numberline_family": "standard"
      },
      "footer": "$$𝑥_A\\,=\\,[[formula]]$$"
    },
    {
      "n": 2,
      "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:700px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"350\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<text x=\"408\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">1</text>\n<line x1=\"${cx}\" y1=\"47\" x2=\"${cx}\" y2=\"73\" stroke=\"#2563a6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2563a6\">A</text>\n</svg>",
      "answer": "[\"val\"]",
      "options": {
        "formula_code": "setNB(1)\ni=RD(0,9,[5,6])\nval=i-5\ncx=60+i*58",
        "numberline_family": "standard"
      },
      "footer": "$$𝑥_A\\,=\\,[[formula]]$$"
    },
    {
      "n": 3,
      "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:700px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"234\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">-1</text>\n<text x=\"292\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<line x1=\"${cx}\" y1=\"47\" x2=\"${cx}\" y2=\"73\" stroke=\"#2563a6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2563a6\">A</text>\n</svg>",
      "answer": "[\"val\"]",
      "options": {
        "formula_code": "setNB(1)\ni=RD(0,9,[3,4])\nval=i-4\ncx=60+i*58",
        "numberline_family": "standard"
      },
      "footer": "$$𝑥_A\\,=\\,[[formula]]$$"
    },
    {
      "n": 4,
      "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:700px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"60\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">-5</text>\n<text x=\"350\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<line x1=\"${cx}\" y1=\"47\" x2=\"${cx}\" y2=\"73\" stroke=\"#2563a6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2563a6\">A</text>\n</svg>",
      "answer": "[\"val\"]",
      "options": {
        "formula_code": "setNB(1)\ni=RD(0,9,[0,5])\nval=i-5\ncx=60+i*58",
        "numberline_family": "signed"
      },
      "footer": "$$𝑥_A\\,=\\,[[formula]]$$"
    },
    {
      "n": 5,
      "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:700px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"292\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<text x=\"408\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">1</text>\n<line x1=\"${cx}\" y1=\"47\" x2=\"${cx}\" y2=\"73\" stroke=\"#2563a6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2563a6\">A</text>\n</svg>",
      "answer": "[\"val\"]",
      "options": {
        "formula_code": "setNB(1)\ni=RD(0,9,[4,6])\nval=CUT((i-4)*0.5,1)\ncx=60+i*58",
        "numberline_family": "fractional"
      },
      "footer": "$$𝑥_A\\,=\\,[[formula]]$$"
    },
    {
      "n": 6,
      "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:700px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"118\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">-1</text>\n<text x=\"350\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<line x1=\"${cx}\" y1=\"47\" x2=\"${cx}\" y2=\"73\" stroke=\"#2563a6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2563a6\">A</text>\n</svg>",
      "answer": "[\"val\"]",
      "options": {
        "formula_code": "setNB(1)\ni=RD(0,9,[1,5])\nval=CUT((i-5)*0.25,2)\ncx=60+i*58",
        "numberline_family": "fractional"
      },
      "footer": "$$𝑥_A\\,=\\,[[formula]]$$"
    },
    {
      "n": 7,
      "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:700px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"60\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">-10</text>\n<text x=\"350\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<line x1=\"${cx}\" y1=\"47\" x2=\"${cx}\" y2=\"73\" stroke=\"#2563a6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2563a6\">A</text>\n</svg>",
      "answer": "[\"val\"]",
      "options": {
        "formula_code": "setNB(1)\ni=RD(0,9,[0,5])\nval=(i-5)*2\ncx=60+i*58",
        "numberline_family": "signed"
      },
      "footer": "$$𝑥_A\\,=\\,[[formula]]$$"
    },
    {
      "n": 8,
      "statement": "Lis les abscisses des points A et B :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:700px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"292\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<text x=\"350\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">1</text>\n<line x1=\"${cxA}\" y1=\"47\" x2=\"${cxA}\" y2=\"73\" stroke=\"#2563a6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cxA}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2563a6\">A</text>\n<line x1=\"${cxB}\" y1=\"47\" x2=\"${cxB}\" y2=\"73\" stroke=\"#7c3aed\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cxB}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#7c3aed\">B</text>\n</svg>",
      "answer": "[\"va\",\"vb\"]",
      "options": {
        "formula_code": "setNB(1)\nia=RD(0,3)\nib=RD(5,9,[5])\nva=ia-4\nvb=ib-4\ncxA=60+ia*58\ncxB=60+ib*58",
        "numberline_family": "standard"
      },
      "footer": "$$𝑥_A\\,=\\,[[formula]] \\qquad 𝑥_B\\,=\\,[[formula]]$$"
    },
    {
      "n": 9,
      "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:700px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"234\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">-2</text>\n<text x=\"292\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">-1</text>\n<line x1=\"${cx}\" y1=\"47\" x2=\"${cx}\" y2=\"73\" stroke=\"#2563a6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2563a6\">A</text>\n</svg>",
      "answer": "[\"val\"]",
      "options": {
        "formula_code": "setNB(1)\ni=RD(0,4,[3,4])\nval=i-5\ncx=60+i*58",
        "numberline_family": "signed"
      },
      "footer": "$$𝑥_A\\,=\\,[[formula]]$$"
    },
    {
      "n": 10,
      "statement": "Quelle est l'abscisse du point C ?\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:700px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"350\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<text x=\"408\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">1</text>\n<line x1=\"${cx}\" y1=\"47\" x2=\"${cx}\" y2=\"73\" stroke=\"#2563a6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2563a6\">C</text>\n</svg>&&$$${val}$$&&$$${opp}$$&&$$${d3}$$&&",
      "answer": "[\"1\"]",
      "options": {
        "formula_code": "setNB(1)\ni=RD(0,4)\nval=i-5\ncx=60+i*58\nopp=5-i\nd3=i-6",
        "shuffle_answers": true,
        "numberline_family": "standard"
      },
      "footer": "[[formula_qcm1]]"
    },
    {
      "n": 11,
      "statement": "Quelle est l'abscisse du point C ?\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:700px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"${zeroX}\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<text x=\"${oneX}\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">1</text>\n<line x1=\"${cx}\" y1=\"47\" x2=\"${cx}\" y2=\"73\" stroke=\"#2563a6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2563a6\">C</text>\n</svg>&&$$${val}$$&&$$${raw}$$&&$$${inverse}$$&&$$${opposite}$$&&",
      "answer": "[\"1\"]",
      "options": {
        "formula_code": "setNB(1)\nz=RD(2,5)\ni=RD(0,9,[z,z+2])\nk=i-z\nval=CUT(k*0.5,1)\nraw=k\ninverse=k*2\nopposite=0-val\nzeroX=60+z*58\noneX=60+(z+2)*58\ncx=60+i*58",
        "shuffle_answers": true,
        "numberline_family": "fractional"
      },
      "footer": "[[formula_qcm1]]"
    },
    {
      "n": 12,
      "statement": "Quelle est l'abscisse du point C ?\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:700px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"${zeroX}\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<text x=\"${oneX}\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">1</text>\n<line x1=\"${cx}\" y1=\"47\" x2=\"${cx}\" y2=\"73\" stroke=\"#2563a6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2563a6\">C</text>\n</svg>&&$$${val}$$&&$$${raw}$$&&$$${inverse}$$&&$$${opposite}$$&&",
      "answer": "[\"1\"]",
      "options": {
        "formula_code": "setNB(1)\nz=RD(1,5)\ni=RD(0,9,[z,z+4])\nk=i-z\nval=CUT(k*0.25,2)\nraw=k\ninverse=k*4\nopposite=0-val\nzeroX=60+z*58\noneX=60+(z+4)*58\ncx=60+i*58",
        "shuffle_answers": true,
        "numberline_family": "fractional"
      },
      "footer": "[[formula_qcm1]]"
    },
    {
      "n": 13,
      "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:700px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"${refX1}\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">${refV1}</text>\n<text x=\"${refX2}\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">${refV2}</text>\n<line x1=\"${cx}\" y1=\"47\" x2=\"${cx}\" y2=\"73\" stroke=\"#2563a6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2563a6\">A</text>\n</svg>",
      "answer": "[\"val\"]",
      "options": {
        "formula_code": "setNB(1)\nstep=RD(1,2)\ngap=RD(2,4)\nrefI1=RD(1,8-gap)\nrefI2=refI1+gap\ndir=RD(0,1)===0?-1:1\nzeroI=dir===1?refI1:refI2\nrefV1=(refI1-zeroI)*step\nrefV2=(refI2-zeroI)*step\ni=RD(0,9,[refI1,refI2])\nval=(i-zeroI)*step\nrefX1=60+refI1*58\nrefX2=60+refI2*58\ncx=60+i*58",
        "numberline_family": "scaled"
      },
      "footer": "$$𝑥_A\\,=\\,[[formula]]$$"
    },
    {
      "n": 14,
      "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:700px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"${refX1}\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">${refV1}</text>\n<text x=\"${refX2}\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">${refV2}</text>\n<line x1=\"${cx}\" y1=\"47\" x2=\"${cx}\" y2=\"73\" stroke=\"#2563a6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2563a6\">A</text>\n</svg>",
      "answer": "[\"val\"]",
      "options": {
        "formula_code": "setNB(1)\nstep=5\ngap=RD(2,4)\nrefI1=RD(1,8-gap)\nrefI2=refI1+gap\nrefV1=RD(-4,2)*step\nrefV2=refV1+gap*step\ni=RD(0,9,[refI1,refI2])\nval=refV1+(i-refI1)*step\nrefX1=60+refI1*58\nrefX2=60+refI2*58\ncx=60+i*58",
        "numberline_family": "scaled"
      },
      "footer": "$$𝑥_A\\,=\\,[[formula]]$$"
    },
    {
      "n": 15,
      "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:700px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"${refX1}\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">${refV1}</text>\n<text x=\"${refX2}\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">${refV2}</text>\n<line x1=\"${cx}\" y1=\"47\" x2=\"${cx}\" y2=\"73\" stroke=\"#2563a6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2563a6\">A</text>\n</svg>",
      "answer": "[\"val\"]",
      "options": {
        "formula_code": "setNB(1)\nsteps=[10,20,25,50]\nstep=steps[RD(0,3)]\ngap=RD(2,4)\nrefI1=RD(1,8-gap)\nrefI2=refI1+gap\nrefV1=RD(-3,1)*step\nrefV2=refV1+gap*step\ni=RD(0,9,[refI1,refI2])\nval=refV1+(i-refI1)*step\nrefX1=60+refI1*58\nrefX2=60+refI2*58\ncx=60+i*58",
        "numberline_family": "scaled"
      },
      "footer": "$$𝑥_A\\,=\\,[[formula]]$$"
    },
    {
      "n": 16,
      "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:700px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"${refX1}\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">${refV1}</text>\n<text x=\"${refX2}\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">${refV2}</text>\n<line x1=\"${cx}\" y1=\"47\" x2=\"${cx}\" y2=\"73\" stroke=\"#2563a6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2563a6\">A</text>\n</svg>",
      "answer": "[\"val\"]",
      "options": {
        "formula_code": "setNB(1)\nsteps=[0.1,0.2]\nstep=steps[RD(0,1)]\ngap=RD(2,5)\nrefI1=RD(1,8-gap)\nrefI2=refI1+gap\nrefV1=CUT(RD(-4,1)*step,2)\nrefV2=CUT(refV1+gap*step,2)\ni=RD(0,9,[refI1,refI2])\nval=CUT(refV1+(i-refI1)*step,2)\nrefX1=60+refI1*58\nrefX2=60+refI2*58\ncx=60+i*58",
        "numberline_family": "fractional"
      },
      "footer": "$$𝑥_A\\,=\\,[[formula]]$$"
    },
    {
      "n": 17,
      "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:700px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"${refX1}\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">${refV1}</text>\n<text x=\"${refX2}\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">${refV2}</text>\n<line x1=\"${cx}\" y1=\"47\" x2=\"${cx}\" y2=\"73\" stroke=\"#2563a6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2563a6\">A</text>\n</svg>",
      "answer": "[\"val\"]",
      "options": {
        "formula_code": "setNB(1)\nsteps=[1,2,5,10]\nstep=steps[RD(0,3)]\ngap=RD(2,4)\nrefI1=RD(1,8-gap)\nrefI2=refI1+gap\ndo{refV1=RD(-5,3)*step\nrefV2=refV1+gap*step}while(refV1===0||refV2===0)\ni=RD(0,9,[refI1,refI2])\nval=refV1+(i-refI1)*step\nrefX1=60+refI1*58\nrefX2=60+refI2*58\ncx=60+i*58",
        "numberline_family": "scaled"
      },
      "footer": "$$𝑥_A\\,=\\,[[formula]]$$"
    },
    {
      "n": 18,
      "statement": "Quelle est l'abscisse du point C ?\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:700px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"${refX1}\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">${refV1}</text>\n<text x=\"${refX2}\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">${refV2}</text>\n<line x1=\"${cx}\" y1=\"47\" x2=\"${cx}\" y2=\"73\" stroke=\"#2563a6\" stroke-width=\"5\" stroke-linecap=\"round\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2563a6\">C</text>\n</svg>&&$$${val}$$&&$$${raw}$$&&$$${offByOne}$$&&$$${opposite}$$&&",
      "answer": "[\"1\"]",
      "options": {
        "formula_code": "setNB(1)\nsteps=[0.1,0.2,0.5,2,5,10,20,25]\ndo{step=steps[RD(0,7)]\ngap=RD(2,5)\nrefI1=RD(1,8-gap)\nrefI2=refI1+gap\nrefV1=CUT(RD(-4,2)*step,2)\nrefV2=CUT(refV1+gap*step,2)\ni=RD(0,9,[refI1,refI2])\nval=CUT(refV1+(i-refI1)*step,2)\nraw=CUT(refV1+(i-refI1),2)\noffByOne=CUT(refV1+((i-refI1)+(i>refI1?1:-1))*step,2)\nopposite=0-val}while(val===0||raw===val||offByOne===val||opposite===val||raw===offByOne||raw===opposite||offByOne===opposite)\nrefX1=60+refI1*58\nrefX2=60+refI2*58\ncx=60+i*58",
        "shuffle_answers": true,
        "numberline_family": "scaled"
      },
      "footer": "[[formula_qcm1]]"
    }
  ]
};
