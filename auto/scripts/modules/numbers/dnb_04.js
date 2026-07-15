const MODULE_DNB_04 = {
    "id": "dnb_04",
    "num": 4,
    "title": "Fraction d'un nombre et pourcentages repères",
    "level_tags": [
      "4e",
      "3e",
      "DNB"
    ],
    "source": "import_dnb_zip",
    "has_svg": false,
    "questions": [
      {
        "n": 1,
        "statement": "Calcule (le résultat est un nombre entier) :",
        "answer": "[\"n/q\"]",
        "options": {
          "formula_code": "setNB(1)\nidx=RD(3)\nq=[2,3,4,5][idx]\nmot=[\"la moitié\",\"le tiers\",\"le quart\",\"le cinquième\"][idx]\nm=RD(2,9)\nn=q*m"
        },
        "footer": "$$\\text{${mot}}\\text{ de }${n}=[[formula]]$$"
      },
      {
        "n": 2,
        "statement": "Calcule (le résultat est un nombre entier) :",
        "answer": "[\"p*n/q\"]",
        "options": {
          "formula_code": "setNB(1)\nidx=RD(2)\np=[2,3,2][idx]\nq=[3,4,5][idx]\nmot=[\"les deux tiers\",\"les trois quarts\",\"les deux cinquièmes\"][idx]\nm=RD(2,9)\nn=q*m"
        },
        "footer": "$$\\text{${mot}}\\text{ de }${n}=[[formula]]$$"
      },
      {
        "n": 3,
        "statement": "Calcule (le résultat est un nombre entier) :",
        "answer": "[\"p*n/q\"]",
        "options": {
          "formula_code": "setNB(1)\nidx=RD(3)\np=[1,3,5,1][idx]\nq=[6,5,6,8][idx]\nmot=[\"le sixième\",\"les trois cinquièmes\",\"les cinq sixièmes\",\"le huitième\"][idx]\nm=RD(2,8)\nn=q*m"
        },
        "footer": "$$\\text{${mot}}\\text{ de }${n}=[[formula]]$$"
      },
      {
        "n": 4,
        "statement": "Calcule :",
        "answer": "[\"c\"]",
        "options": {
          "formula_code": "setNB(1)\nc=RD(10,200)"
        },
        "footer": "$$100\\%\\text{ de }${c}=[[formula]]$$"
      },
      {
        "n": 5,
        "statement": "Calcule :",
        "answer": "[\"c/2\"]",
        "options": {
          "formula_code": "setNB(1)\nc=RD(5,100)*2"
        },
        "footer": "$$50\\%\\text{ de }${c}=[[formula]]$$"
      },
      {
        "n": 6,
        "statement": "Calcule :",
        "answer": "[\"c/4\"]",
        "options": {
          "formula_code": "setNB(1)\nc=RD(3,50)*4"
        },
        "footer": "$$25\\%\\text{ de }${c}=[[formula]]$$"
      },
      {
        "n": 7,
        "statement": "Calcule :",
        "answer": "[\"c/10\"]",
        "options": {
          "formula_code": "setNB(1)\nc=RD(2,40)*10"
        },
        "footer": "$$10\\%\\text{ de }${c}=[[formula]]$$"
      },
      {
        "n": 8,
        "statement": "Calcule :",
        "answer": "[\"c/100\"]",
        "options": {
          "formula_code": "setNB(1)\nc=RD(2,40)*100"
        },
        "footer": "$$1\\%\\text{ de }${c}=[[formula]]$$"
      },
      {
        "n": 9,
        "statement": "Calcule ce pourcentage :",
        "answer": "[\"a*c/100\"]",
        "options": {
          "formula_code": "setNB(1)\nidx=RD(4)\na=[100,50,25,10,1][idx]\nmul=[1,2,4,10,100][idx]\nc=RD(2,30)*mul"
        },
        "footer": "$$${a}\\%\\text{ de }${c}=[[formula]]$$"
      },
      {
        "n": 10,
        "statement": "<div style=\"text-align:justify\">Dans un collège de $$${c}$$ élèves, $$${a}\\%$$ sont externes. Combien d'élèves sont externes ?</div>",
        "answer": "[\"a*c/100\"]",
        "options": {
          "formula_code": "setNB(1)\nidx=RD(3)\na=[50,25,10,1][idx]\nmul=[2,4,10,100][idx]\nc=RD(2,12)*mul"
        },
        "footer": "$$[[formula]]\\text{ élèves}$$"
      }
    ]
  };
