const MODULE_DNB_18 = {
    "id": "dnb_18",
    "num": 18,
    "title": "Somme des angles d'un triangle",
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
        "statement": "Quelle est la somme des mesures des angles d'un triangle ?",
        "answer": "[\"180\"]",
        "options": null,
        "footer": "$$[[int]]°$$"
      },
      {
        "n": 2,
        "statement": "Dans un triangle, deux angles mesurent $$${a}°$$ et $$${b}°$$. Combien mesure le troisième ?",
        "answer": "[\"180-a-b\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(40,80)\nb=RD(40,80)"
        },
        "footer": "$$[[formula]]°$$"
      },
      {
        "n": 3,
        "statement": "Dans un triangle, deux angles mesurent $$${a}°$$ et $$${b}°$$. Calcule la mesure du troisième angle.",
        "answer": "[\"180-a-b\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(20,60)\nb=RD(30,70)"
        },
        "footer": "$$[[formula]]°$$"
      },
      {
        "n": 4,
        "statement": "Un triangle rectangle a un angle droit. Un autre angle mesure $$${a}°$$. Combien mesure le troisième ?",
        "answer": "[\"90-a\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(20,70)"
        },
        "footer": "$$[[formula]]°$$"
      },
      {
        "n": 5,
        "statement": "Un triangle isocèle a son angle principal (au sommet) qui mesure $$${a}°$$. Combien mesure chacun des deux angles égaux à la base ?",
        "answer": "[\"(180-a)/2\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(10,80)*2"
        },
        "footer": "$$[[formula]]°$$"
      },
      {
        "n": 6,
        "statement": "Un triangle isocèle a ses deux angles à la base qui mesurent chacun $$${a}°$$. Combien mesure l'angle au sommet ?",
        "answer": "[\"180-2*a\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(40,80)"
        },
        "footer": "$$[[formula]]°$$"
      },
      {
        "n": 7,
        "statement": "Combien mesure chaque angle d'un triangle équilatéral ?",
        "answer": "[\"60\"]",
        "options": null,
        "footer": "$$[[int]]°$$"
      },
      {
        "n": 8,
        "statement": "Ces trois angles peuvent-ils être ceux d'un même triangle : $$${a}°$$, $$${b}°$$ et $$${c}°$$ ?&&Oui&&Non&&",
        "answer": "[\"1\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(40,80)\nb=RD(40,80)\nc=180-a-b",
          "shuffle_answers": true
        },
        "footer": "[[formula_qcm1]]"
      },
      {
        "n": 9,
        "statement": "Lis les deux angles donnés et calcule la mesure de l'angle $$\\widehat{C}$$ (en rouge) :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"340\" height=\"auto\" viewBox=\"0 0 340 280\" style=\"max-width:340px\">\n<polygon points=\"80,230 260,230 ${xC},${yC}\" fill=\"#eef5ff\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<path d=\"M 106,230 A 26,26 0 0,0 ${ax2x},${ax2y}\" fill=\"none\" stroke=\"#2471a3\" stroke-width=\"1.5\"/>\n<path d=\"M ${bx1},${by1} A 26,26 0 0,0 234,230\" fill=\"none\" stroke=\"#27ae60\" stroke-width=\"1.5\"/>\n<path d=\"M ${cx1},${cy1} A 24,24 0 0,0 ${cx2},${cy2}\" fill=\"none\" stroke=\"#c0392b\" stroke-width=\"2\"/>\n<text x=\"${laxx}\" y=\"${layy}\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#2471a3\" text-anchor=\"middle\">${a}°</text>\n<text x=\"${lbxx}\" y=\"${lbyy}\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#27ae60\" text-anchor=\"middle\">${b}°</text>\n<text x=\"62\" y=\"235\" font-family=\"serif\" font-style=\"italic\" font-size=\"16\">A</text>\n<text x=\"266\" y=\"235\" font-family=\"serif\" font-style=\"italic\" font-size=\"16\">B</text>\n<text x=\"${xC}\" y=\"${yC}\" dx=\"-4\" dy=\"-8\" font-family=\"serif\" font-style=\"italic\" font-size=\"16\">C</text>\n</svg>",
        "answer": "[\"c\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(50,70)\nb=RD(50,70)\nc=180-a-b\nra=a*pi/180\nrb=b*pi/180\nrg=c*pi/180\nxA=80\nyA=230\nxB=260\nAB=180\nAC=AB*sin(rb)/sin(rg)\nxC=floor(80+AC*cos(ra)+0.5)\nyC=floor(230-AC*sin(ra)+0.5)\nax2x=floor(80+26*cos(ra)+0.5)\nax2y=floor(230-26*sin(ra)+0.5)\nangBC=atan2(yC-230,xC-260)\nbx1=floor(260+26*cos(angBC)+0.5)\nby1=floor(230+26*sin(angBC)+0.5)\nangCA=atan2(230-yC,80-xC)\nangCB=atan2(230-yC,260-xC)\ncx1=floor(xC+24*cos(angCA)+0.5)\ncy1=floor(yC+24*sin(angCA)+0.5)\ncx2=floor(xC+24*cos(angCB)+0.5)\ncy2=floor(yC+24*sin(angCB)+0.5)\nlaxx=floor(80+46*cos(ra/2)+0.5)\nlayy=floor(230-46*sin(ra/2)+0.5)\nubcx=cos(angBC)\nubcy=sin(angBC)\nsumx=ubcx-1\nsumy=ubcy\nnrm=sqrt(sumx*sumx+sumy*sumy)\nlbxx=floor(260+46*sumx/nrm+0.5)\nlbyy=floor(230+46*sumy/nrm+0.5)"
        },
        "footer": "$$\\widehat{C}=[[formula]]°$$"
      },
      {
        "n": 10,
        "statement": "Un élève affirme qu'un triangle a deux angles mesurant $$${a}°$$ et $$${b}°$$. A-t-il raison ?&&Non, c'est impossible&&Oui, c'est possible&&",
        "answer": "[\"1\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(100,140)\nm=RD(5,30)\nb=180-a+m+10",
          "shuffle_answers": true
        },
        "footer": "[[formula_qcm1]]"
      }
    ]
  };
