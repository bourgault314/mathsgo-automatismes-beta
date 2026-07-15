const MODULE_DNB_02 = {
    "id": "dnb_02",
    "num": 2,
    "title": "Comparer et calculer avec des décimaux",
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
        "statement": "Dire quel est le plus grand nombre parmi les trois nombres suivants :\n\n<div style=\"text-align:center\">$$${a}$$  ;  $$${b}$$  ;  $$${c}$$</div>",
        "answer": "[\"mx\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(10,99)/10\nb=RD(10,99)/10\nc=RD(10,99)/10\nmab=a>b?a:b\nmx=mab>c?mab:c"
        },
        "footer": "[[formula]]"
      },
      {
        "n": 2,
        "statement": "Dire quel est le plus grand nombre parmi les trois nombres suivants :\n\n<div style=\"text-align:center\">$$${a}$$  ;  $$${b}$$  ;  $$${c}$$</div>",
        "answer": "[\"mx\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(-99,-10)/10\nb=RD(-99,-10)/10\nc=RD(-99,-10)/10\nmab=a>b?a:b\nmx=mab>c?mab:c"
        },
        "footer": "$$[[formula]]$$"
      },
      {
        "n": 3,
        "statement": "Range ces trois nombres dans l'ordre croissant :\n\n<div style=\"text-align:center\">$$${a}$$  ;  $$${b}$$  ;  $$${c}$$</div>",
        "answer": "[\"mn\",\"md\",\"mx\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(100,999)/100\nb=RD(100,999)/100\nc=RD(100,999)/100\nmab=a>b?a:b\nmx=mab>c?mab:c\nnab=a<b?a:b\nmn=nab<c?nab:c\nmd=a+b+c-mn-mx"
        },
        "footer": "$$[[formula]]<[[formula]]<[[formula]]$$"
      },
      {
        "n": 4,
        "statement": "Encadre ce nombre entre deux entiers consécutifs :",
        "answer": "[\"e\",\"e+1\"]",
        "options": {
          "formula_code": "setNB(1)\ne=RD(1,9)\nf=RD(1,99)/100\na=e+f"
        },
        "footer": "$$[[formula]]<${a}<[[formula]]$$"
      },
      {
        "n": 5,
        "statement": "Encadre ce nombre négatif entre deux entiers consécutifs :",
        "answer": "[\"0-e-1\",\"0-e\"]",
        "options": {
          "formula_code": "setNB(1)\ne=RD(1,9)\nf=RD(1,99)/100\na=e+f"
        },
        "footer": "$$[[formula]]<-${a}<[[formula]]$$"
      },
      {
        "n": 6,
        "statement": "Calculer :",
        "answer": "[\"a+b\"]",
        "options": {
          "formula_code": "setNB(1)\nd1=RD(1,9)/10\nd2=1-d1\na=RD(10,99)+d1\nb=RD(10,99)+d2"
        },
        "footer": "$$${a}+${b}=[[formula]]$$"
      },
      {
        "n": 7,
        "statement": "Calculer :",
        "answer": "[\"c\"]",
        "options": {
          "formula_code": "setNB(1)\nb=RD(1,99)/10\nc=RD(10,99)/10\na=b+c"
        },
        "footer": "$$${a}-${b}=[[formula]]$$"
      },
      {
        "n": 8,
        "statement": "Calculer :",
        "answer": "[\"a+b\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(1,99)/10\nb=RD(-99,-1)/10"
        },
        "footer": "$$${a}+(${b})=[[formula]]$$"
      },
      {
        "n": 9,
        "statement": "Calculer :",
        "answer": "[\"a*b\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(11,99,[20,30,40,50,60,70,80,90])/10\nb=RD(2,9)"
        },
        "footer": "$$${a}\\times${b}=[[formula]]$$"
      },
      {
        "n": 10,
        "statement": "Calculer :",
        "answer": "[\"a/b\"]",
        "options": {
          "formula_code": "setNB(1)\nb=RD(2,9)\nc=RD(2,9)/10\na=CUT(b*c,4)"
        },
        "footer": "$$${a}\\div${b}=[[formula]]$$"
      }
    ]
  };
