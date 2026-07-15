const MODULE_DNB_05 = {
    "id": "dnb_05",
    "num": 5,
    "title": "Un même nombre sous de multiples formes",
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
        "statement": "Écris ce nombre décimal sous la forme d'une fraction de dénominateur 10 :",
        "answer": "[\"e*10+f\",\"10\"]",
        "options": {
          "formula_code": "setNB(1)\ne=RD(1,9)\nf=RD(1,9)\ndec=e+f/10"
        },
        "footer": "$$${dec}=[[formula_frac]]$$"
      },
      {
        "n": 2,
        "statement": "Écris ce nombre décimal sous la forme d'une fraction irréductible :",
        "answer": "[\"p\",\"q\"]",
        "options": {
          "formula_code": "setNB(1)\nidx=RD(4)\np=[6,3,5,7,9][idx]\nq=[5,2,4,5,5][idx]\ndec=CUT(p/q,4)"
        },
        "footer": "$$${dec}=\\dfrac{[[formula]]}{[[formula]]}$$"
      },
      {
        "n": 3,
        "statement": "Écris ce nombre décimal sous la forme d'un pourcentage :",
        "answer": "[\"c\"]",
        "options": {
          "formula_code": "setNB(1)\nc=RD(105,295)\ndec=c/100"
        },
        "footer": "$$${dec}=[[formula]]\\%$$"
      },
      {
        "n": 4,
        "statement": "Écris ce pourcentage sous la forme d'un nombre décimal :",
        "answer": "[\"p/100\"]",
        "options": {
          "formula_code": "setNB(1)\np=RD(5,250)"
        },
        "footer": "$$${p}\\%=[[formula]]$$"
      },
      {
        "n": 5,
        "statement": "Écris cette fraction sous la forme d'un nombre décimal :",
        "answer": "[\"a/b\"]",
        "options": {
          "formula_code": "setNB(1)\nidx=RD(4)\na=[3,7,9,1,3][idx]\nb=[4,5,5,2,2][idx]"
        },
        "footer": "$$\\dfrac{${a}}{${b}}=[[formula]]$$"
      },
      {
        "n": 6,
        "statement": "Écris cette fraction sous la forme d'un pourcentage :",
        "answer": "[\"a*100/b\"]",
        "options": {
          "formula_code": "setNB(1)\nidx=RD(4)\na=[3,1,2,4,7][idx]\nb=[4,2,5,5,10][idx]"
        },
        "footer": "$$\\dfrac{${a}}{${b}}=[[formula]]\\%$$"
      },
      {
        "n": 7,
        "statement": "Écris ce pourcentage sous la forme d'une fraction de dénominateur 100 :",
        "answer": "[\"p\",\"100\"]",
        "options": {
          "formula_code": "setNB(1)\np=RD(5,95)"
        },
        "footer": "$$${p}\\%=[[formula_frac]]$$"
      },
      {
        "n": 8,
        "statement": "Complète pour obtenir une fraction de dénominateur 100 :",
        "answer": "[\"a*100/b\",\"100\"]",
        "options": {
          "formula_code": "setNB(1)\nidx=RD(4)\na=[3,1,2,4,7][idx]\nb=[5,4,5,25,20][idx]"
        },
        "footer": "$$\\dfrac{${a}}{${b}}=[[formula_frac]]$$"
      },
      {
        "n": 9,
        "statement": "Écris cette fraction décimale sous sa forme irréductible :",
        "answer": "[\"p\",\"q\"]",
        "options": {
          "formula_code": "setNB(1)\nidx=RD(4)\np=[6,3,12,25,15][idx]\nq=[5,2,5,4,2][idx]\nk=[2,5,5,5,10][idx]\nnum=p*k\nden=q*k"
        },
        "footer": "$$\\dfrac{${num}}{${den}}=\\dfrac{[[formula]]}{[[formula]]}$$"
      },
      {
        "n": 10,
        "statement": "Parmi ces écritures, lesquelles sont égales à $$${dec}$$ ?&&$$\\dfrac{${e*10+f}}{10}$$&&$$${e*10+f}\\%$$&&$$${dec*100}\\%$$&&$$\\dfrac{${dec*100}}{100}$$&&",
        "answer": "[\"1\",\"3\",\"4\"]",
        "options": {
          "formula_code": "setNB(1)\ne=RD(1,8)\nf=RD(1,9)\ndec=e+f/10"
        },
        "footer": "[[formula_qcm]]"
      }
    ]
  };
