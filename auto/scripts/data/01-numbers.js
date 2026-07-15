const RAW_NUMBER_MODULES = [
  MODULE_DNB_01,
  MODULE_DNB_02,
  MODULE_DNB_03,
  MODULE_DNB_04,
  MODULE_DNB_05,
  MODULE_DNB_06,
  MODULE_DNB_07,
  MODULE_DNB_08,
  {
    "id": "dnb_09",
    "num": 9,
    "title": "Double, triple, moitié, prédécesseur, successeur, carré",
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
        "statement": "Complète les six cadres ci-dessous pour le nombre $$n=${n}$$ :",
        "answer": "[\"2*n\",\"3*n\",\"n/2\",\"n-1\",\"n+1\",\"n^2\"]",
        "options": {
          "formula_code": "setNB(1)\nn=RD(2,25)*2"
        },
        "footer": "<ul style=\"text-align:left\"><li>Double : [[formula]]</li><li>Triple : [[formula]]</li><li>Moitié : [[formula]]</li><li>Prédécesseur : [[formula]]</li><li>Successeur : [[formula]]</li><li>Carré : [[formula]]</li></ul>"
      },
      {
        "n": 2,
        "statement": "Calcule le double de ce nombre :",
        "answer": "[\"2*n\"]",
        "options": {
          "formula_code": "setNB(1)\nn=RD(5,50)"
        },
        "footer": "$$\\text{double de }${n}=[[formula]]$$"
      },
      {
        "n": 3,
        "statement": "Calcule le triple de ce nombre :",
        "answer": "[\"3*n\"]",
        "options": {
          "formula_code": "setNB(1)\nn=RD(5,40)"
        },
        "footer": "$$\\text{triple de }${n}=[[formula]]$$"
      },
      {
        "n": 4,
        "statement": "Calcule la moitié de ce nombre :",
        "answer": "[\"n/2\"]",
        "options": {
          "formula_code": "setNB(1)\nn=RD(5,50)*2"
        },
        "footer": "$$\\text{moitié de }${n}=[[formula]]$$"
      },
      {
        "n": 5,
        "statement": "Donne le prédécesseur de ce nombre :",
        "answer": "[\"n-1\"]",
        "options": {
          "formula_code": "setNB(1)\nn=RD(10,100)"
        },
        "footer": "$$\\text{prédécesseur de }${n}=[[formula]]$$"
      },
      {
        "n": 6,
        "statement": "Donne le successeur de ce nombre :",
        "answer": "[\"n+1\"]",
        "options": {
          "formula_code": "setNB(1)\nn=RD(10,100)"
        },
        "footer": "$$\\text{successeur de }${n}=[[formula]]$$"
      },
      {
        "n": 7,
        "statement": "Calcule le carré de ce nombre :",
        "answer": "[\"n*n\"]",
        "options": {
          "formula_code": "setNB(1)\nn=RD(2,12)"
        },
        "footer": "$$\\text{carré de }${n}=[[formula]]$$"
      },
      {
        "n": 8,
        "statement": "Quelle expression représente le double du nombre $$n$$ ?&&$$2n$$&&$$n+2$$&&$$n^2$$&&$$\\dfrac{n}{2}$$&&",
        "answer": "[\"1\"]",
        "options": null,
        "footer": "[[qcm1]]"
      },
      {
        "n": 9,
        "statement": "Le double d'un nombre vaut $$${c}$$. Quel est ce nombre ?",
        "answer": "[\"c/2\"]",
        "options": {
          "formula_code": "setNB(1)\nn=RD(5,50)\nc=2*n"
        },
        "footer": "[[formula]]"
      },
      {
        "n": 10,
        "statement": "<div style=\"text-align:justify\">Marie a $$${n}$$ billes. Paul en a le triple. Combien de billes Paul a-t-il ?</div>",
        "answer": "[\"3*n\"]",
        "options": {
          "formula_code": "setNB(1)\nn=RD(4,30)"
        },
        "footer": "$$[[formula]]\\text{ billes}$$"
      }
    ]
  },
  {
    "id": "dnb_10",
    "num": 10,
    "title": "Simplifier des expressions littérales",
    "level_tags": [
      "4e",
      "3e",
      "DNB"
    ],
    "source": "moteur_mathsgo_reduction_v2",
    "has_svg": true,
    "questions": [
      {
        "n": 1,
        "statement": "Réduis l’expression :",
        "answer": "[]",
        "options": {
          "reduction_kind": "one_no_cancel"
        },
        "footer": ""
      },
      {
        "n": 2,
        "statement": "Réduis l’expression :",
        "answer": "[]",
        "options": {
          "reduction_kind": "one_cancel"
        },
        "footer": ""
      },
      {
        "n": 3,
        "statement": "Réduis l’expression :",
        "answer": "[]",
        "options": {
          "reduction_kind": "multi_no_cancel"
        },
        "footer": ""
      },
      {
        "n": 4,
        "statement": "Réduis l’expression :",
        "answer": "[]",
        "options": {
          "reduction_kind": "multi_cancel"
        },
        "footer": ""
      },
      {
        "n": 5,
        "statement": "Écris l’expression réduite représentée par ces tuiles :",
        "answer": "[]",
        "options": {
          "reduction_kind": "read_tiles"
        },
        "footer": ""
      }
    ]
  },
  {
    "id": "dnb_11",
    "num": 11,
    "title": "Calculer la valeur d'une expression algébrique",
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
        "statement": "<div style=\"text-align:center\">Calcule la valeur de cette<br>expression pour $$x=${v}$$ :</div>",
        "answer": "[\"a*v+b\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(2,6)\nb=RD(-9,9,[0])\nv=RD(-5,6,[0])\nsb=(b<0)?\"({b})\":\"{b}\""
        },
        "footer": "$$${a}x+${sb}=[[formula]]$$"
      },
      {
        "n": 2,
        "statement": "<div style=\"text-align:center\">Calcule la valeur de cette<br>expression pour $$x=${v}$$ :</div>",
        "answer": "[\"a*v*v+b\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(2,5)\nb=RD(1,9)\nv=RD(2,6)"
        },
        "footer": "$$${a}x^2+${b}=[[formula]]$$"
      },
      {
        "n": 3,
        "statement": "<div style=\"text-align:center\">Calcule la valeur de cette<br>expression pour $$x=${v}$$ :</div>",
        "answer": "[\"v*v+b*v+c\"]",
        "options": {
          "formula_code": "setNB(1)\nb=RD(2,5)\nc=RD(1,9)\nv=RD(2,5)"
        },
        "footer": "$$x^2+${b}x+${c}=[[formula]]$$"
      },
      {
        "n": 4,
        "statement": "<div style=\"text-align:center\">Calcule la valeur de cette<br>expression pour $$x=${v}$$ :</div>",
        "answer": "[\"a-b*v\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(10,30)\nb=RD(2,5)\nv=RD(-4,5,[0])"
        },
        "footer": "$$${a}-${b}x=[[formula]]$$"
      },
      {
        "n": 5,
        "statement": "<div style=\"text-align:center\">Calcule la valeur de cette<br>expression pour $$x=${v}$$ :</div>",
        "answer": "[\"a*v*v*v\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(2,4)\nv=RD(2,4)"
        },
        "footer": "$$${a}x^3=[[formula]]$$"
      },
      {
        "n": 6,
        "statement": "<div style=\"text-align:center\">Calcule la valeur de cette<br>expression pour<br> $$x=${vx}$$ et $$y=${vy}$$ :</div>",
        "answer": "[\"a*vx+b*vy\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(2,6)\nb=RD(2,6)\nvx=RD(2,7)\nvy=RD(2,7)"
        },
        "footer": "$$${a}x+${b}y=[[formula]]$$"
      },
      {
        "n": 7,
        "statement": "Calcule cette puissance :",
        "answer": "[\"pow(x,n)\"]",
        "options": {
          "formula_code": "setNB(1)\nidx=RD(4)\nx=[2,2,3,2,5][idx]\nn=[4,5,3,6,3][idx]"
        },
        "footer": "$$${x}^${n}=[[formula]]$$"
      },
      {
        "n": 8,
        "statement": "Calcule la valeur de cette expression pour $$x=${v}$$ :",
        "answer": "[\"(v+a)*(v+a)\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(1,5)\nv=RD(2,6)"
        },
        "footer": "$$(x+${a})^2=[[formula]]$$"
      },
      {
        "n": 9,
        "statement": "Pour $$x=${v}$$, que vaut $$2x^2$$ ?&&$$${r1}$$&&$$${r2}$$&&$$${r3}$$&&",
        "answer": "[\"1\"]",
        "options": {
          "formula_code": "setNB(1)\nv=RD(2,6)\nr1=2*v*v\nr2=(2*v)*(2*v)\nr3=2*v"
        },
        "footer": "[[formula_qcm1]]"
      },
      {
        "n": 10,
        "statement": "<div style=\"text-align:justify\">L'aire d'un carré de côté $$c$$ est donnée par $$c^2$$. Calcule l'aire d'un carré de côté $$${v}$$ cm.</div>",
        "answer": "[\"v*v\"]",
        "options": {
          "formula_code": "setNB(1)\nv=RD(3,15)"
        },
        "footer": "$$[[formula]]\\text{ cm}^2$$"
      }
    ]
  },
  {
    "id": "dnb_12",
    "num": 12,
    "title": "Développer et factoriser une expression simple",
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
        "statement": "Développe cette expression :",
        "answer": "[\"r1;r2\"]",
        "options": {
          "formula_code": "setNB(1)\nk=RD(2,6)\na=RD(2,9)\np=k*a\nr1=\"{k}x+{p}\"\nr2=\"{p}+{k}x\""
        },
        "footer": "$$${k}(x+${a})=[[formula]]$$"
      },
      {
        "n": 2,
        "statement": "Développe cette expression :",
        "answer": "[\"r1;r2\"]",
        "options": {
          "formula_code": "setNB(1)\nk=RD(2,6)\na=RD(2,9)\np=k*a\nr1=\"{k}x-{p}\"\nr2=\"-{p}+{k}x\""
        },
        "footer": "$$${k}(x-${a})=[[formula]]$$"
      },
      {
        "n": 3,
        "statement": "Développe cette expression :",
        "answer": "[\"r1;r2\"]",
        "options": {
          "formula_code": "setNB(1)\nk=RD(2,6)\na=RD(2,9)\np=k*a\nr1=\"{p}+{k}x\"\nr2=\"{k}x+{p}\""
        },
        "footer": "$$${k}(${a}+x)=[[formula]]$$"
      },
      {
        "n": 4,
        "statement": "Développe cette expression :",
        "answer": "[\"r1;r2\"]",
        "options": {
          "formula_code": "setNB(1)\nk=RD(2,5)\nb=RD(2,5)\na=RD(2,8)\nkb=k*b\nka=k*a\nr1=\"{kb}x+{ka}\"\nr2=\"{ka}+{kb}x\""
        },
        "footer": "$$${k}(${b}x+${a})=[[formula]]$$"
      },
      {
        "n": 5,
        "statement": "Quel est le développement de $$${k}(x+${a})$$ ?&&$$${k}x+${p}$$&&$$${k}x+${a}$$&&$$x+${p}$$&&$$${kpa}$$&&",
        "answer": "[\"1\"]",
        "options": {
          "formula_code": "setNB(1)\nk=RD(2,6)\na=RD(2,9)\np=k*a\nkpa=k+a",
          "shuffle_answers": true
        },
        "footer": "[[formula_qcm1]]"
      },
      {
        "n": 6,
        "statement": "Factorise cette expression (facteur commun) :",
        "answer": "[\"r1;r2\"]",
        "options": {
          "formula_code": "setNB(1)\nk=RD(2,6)\nb=RD(2,5)\nc=RD(2,5,[b])\nkb=k*b\nkc=k*c\nr1=\"{k}({b}x+{c})\"\nr2=\"{k}({c}+{b}x)\""
        },
        "footer": "$$${kb}x+${kc}=[[formula]]$$"
      },
      {
        "n": 7,
        "statement": "Factorise cette expression (attention au terme constant) :",
        "answer": "[\"r1;r2\"]",
        "options": {
          "formula_code": "setNB(1)\nk=RD(2,8)\nb=RD(2,6)\nkb=k*b\nr1=\"{k}({b}x+1)\"\nr2=\"{k}(1+{b}x)\""
        },
        "footer": "$$${kb}x+${k}=[[formula]]$$"
      },
      {
        "n": 8,
        "statement": "Factorise par $$x$$ :",
        "answer": "[\"r1;r2\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(2,9)\nr1=\"x(x+{a})\"\nr2=\"x({a}+x)\""
        },
        "footer": "$$x^2+${a}x=[[formula]]$$"
      },
      {
        "n": 9,
        "statement": "Quelle est la factorisation de $$${kb}x+${kc}$$ ?&&$$${k}(${b}x+${c})$$&&$$${k}(${b}x+${kc})$$&&$$${b}(${k}x+${c})$$&&$$${k}x(${b}+${c})$$&&",
        "answer": "[\"1\"]",
        "options": {
          "formula_code": "setNB(1)\nk=RD(2,4)\noff=RD(1,3)\nb=k+off\nc=RD(2,6)\nkb=k*b\nkc=k*c",
          "shuffle_answers": true
        },
        "footer": "[[formula_qcm1]]"
      },
      {
        "n": 10,
        "statement": "<div style=\"text-align:justify\">Un rectangle a pour largeur $$${k}$$ et pour longueur $$x+${a}$$. Exprime son aire développée.</div>",
        "answer": "[\"r1;r2\"]",
        "options": {
          "formula_code": "setNB(1)\nk=RD(2,6)\na=RD(2,9)\np=k*a\nr1=\"{k}x+{p}\"\nr2=\"{p}+{k}x\""
        },
        "footer": "$$\\mathcal{A}=[[formula]]$$"
      }
    ]
  },
  {
    "id": "dnb_13",
    "num": 13,
    "title": "Résoudre des équations ax=c, x+b=c, ax+b=c",
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
        "statement": "Résous cette équation :",
        "answer": "[\"x0\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(2,9)\nx0=RD(2,9)\nc=a*x0"
        },
        "footer": "$$\\begin{aligned}\n${a}x &= ${c} \\\\\nx &= [[formula]]\n\\end{aligned}$$"
      },
      {
        "n": 2,
        "statement": "Résous cette équation :",
        "answer": "[\"x0\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(2,9)\nx0=RD(-9,-2)\nc=a*x0"
        },
        "footer": "$$\\begin{aligned}\n${a}x &= ${c} \\\\\nx &= [[formula]]\n\\end{aligned}$$"
      },
      {
        "n": 3,
        "statement": "Résous cette équation :",
        "answer": "[\"x0\"]",
        "options": {
          "formula_code": "setNB(1)\nb=RD(2,9)\nx0=RD(2,15)\nc=x0+b"
        },
        "footer": "$$\\begin{aligned}\nx+${b} &= ${c} \\\\\nx &= [[formula]]\n\\end{aligned}$$"
      },
      {
        "n": 4,
        "statement": "Résous cette équation :",
        "answer": "[\"x0\"]",
        "options": {
          "formula_code": "setNB(1)\nb=RD(-9,-2)\nx0=RD(-5,9,[0])\nc=x0+b\nsb=\"({b})\""
        },
        "footer": "$$\\begin{aligned}\nx+${sb} &= ${c} \\\\\nx &= [[formula]]\n\\end{aligned}$$"
      },
      {
        "n": 5,
        "statement": "Résous cette équation :",
        "answer": "[\"x0\"]",
        "options": {
          "formula_code": "setNB(1)\nb=RD(2,9)\nx0=RD(-5,9,[0])\nc=x0-b"
        },
        "footer": "$$\\begin{aligned}\nx-${b} &= ${c} \\\\\nx &= [[formula]]\n\\end{aligned}$$"
      },
      {
        "n": 6,
        "statement": "Résous cette équation :",
        "answer": "[\"x0\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(2,6)\nb=RD(2,9)\nx0=RD(2,9)\nc=a*x0+b"
        },
        "footer": "$$\\begin{aligned}\n${a}x+${b} &= ${c} \\\\\nx &= [[formula]]\n\\end{aligned}$$"
      },
      {
        "n": 7,
        "statement": "Résous cette équation :",
        "answer": "[\"x0\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(2,6)\nb=RD(-9,-2)\nx0=RD(2,9)\nc=a*x0+b\nsb=\"({b})\""
        },
        "footer": "$$\\begin{aligned}\n${a}x+${sb} &= ${c} \\\\\nx &= [[formula]]\n\\end{aligned}$$"
      },
      {
        "n": 8,
        "statement": "Quelle est la solution de l'équation $$${a}x=${c}$$ ?&&$$x=${x0}$$&&$$x=${cma}$$&&$$x=${cpa}$$&&$$x=${aoc}$$&&",
        "answer": "[\"1\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(2,6)\nx0=RD(3,9)\nc=a*x0\ncma=c-a\ncpa=c+a\naoc=CUT(a/c,4)",
          "shuffle_answers": true
        },
        "footer": "[[formula_qcm1]]"
      },
      {
        "n": 9,
        "statement": "Pour résoudre $$${a}x+${b}=${c}$$, par quelle opération doit-on commencer ?&&Soustraire $$${b}$$ aux deux membres&&Diviser par $$${a}$$ les deux membres&&Ajouter $$${b}$$ aux deux membres&&",
        "answer": "[\"1\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(2,6)\nb=RD(2,9)\nx0=RD(2,9)\nc=a*x0+b",
          "shuffle_answers": true
        },
        "footer": "[[formula_qcm1]]"
      },
      {
        "n": 10,
        "statement": "<div style=\"text-align:justify\">Un taxi facture $$${b}$$ € de prise en charge, puis $$${a}$$ € par kilomètre. La course a coûté $$${c}$$ €. Combien de kilomètres ont été parcourus ?</div>",
        "answer": "[\"x0\"]",
        "options": {
          "formula_code": "setNB(1)\na=RD(2,4)\nb=RD(3,8)\nx0=RD(3,12)\nc=a*x0+b"
        },
        "footer": "$$[[formula]]\\text{ km}$$"
      }
    ]
  },
  {
    "id": "dnb_14",
    "num": 14,
    "title": "Lecture sur une droite graduée",
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
        "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:500px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"292\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<text x=\"350\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">1</text>\n<circle cx=\"${cx}\" cy=\"60\" r=\"6\" fill=\"#c0392b\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#c0392b\">A</text>\n</svg>",
        "answer": "[\"val\"]",
        "options": {
          "formula_code": "setNB(1)\ni=RD(0,9,[4,5])\nval=i-4\ncx=60+i*58"
        },
        "footer": "$$x_A=[[formula]]$$"
      },
      {
        "n": 2,
        "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:500px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"350\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<text x=\"408\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">1</text>\n<circle cx=\"${cx}\" cy=\"60\" r=\"6\" fill=\"#c0392b\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#c0392b\">A</text>\n</svg>",
        "answer": "[\"val\"]",
        "options": {
          "formula_code": "setNB(1)\ni=RD(0,9,[5,6])\nval=i-5\ncx=60+i*58"
        },
        "footer": "$$x_A=[[formula]]$$"
      },
      {
        "n": 3,
        "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:500px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"234\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">-1</text>\n<text x=\"292\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<circle cx=\"${cx}\" cy=\"60\" r=\"6\" fill=\"#c0392b\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#c0392b\">A</text>\n</svg>",
        "answer": "[\"val\"]",
        "options": {
          "formula_code": "setNB(1)\ni=RD(0,9,[3,4])\nval=i-4\ncx=60+i*58"
        },
        "footer": "$$x_A=[[formula]]$$"
      },
      {
        "n": 4,
        "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:500px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"60\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">-5</text>\n<text x=\"350\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<circle cx=\"${cx}\" cy=\"60\" r=\"6\" fill=\"#c0392b\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#c0392b\">A</text>\n</svg>",
        "answer": "[\"val\"]",
        "options": {
          "formula_code": "setNB(1)\ni=RD(0,9,[5])\nval=i-5\ncx=60+i*58"
        },
        "footer": "$$x_A=[[formula]]$$"
      },
      {
        "n": 5,
        "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:500px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"292\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<text x=\"408\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">1</text>\n<circle cx=\"${cx}\" cy=\"60\" r=\"6\" fill=\"#c0392b\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#c0392b\">A</text>\n</svg>",
        "answer": "[\"val\"]",
        "options": {
          "formula_code": "setNB(1)\ni=RD(0,9,[4,6])\nval=CUT((i-4)*0.5,1)\ncx=60+i*58"
        },
        "footer": "$$x_A=[[formula]]$$"
      },
      {
        "n": 6,
        "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:500px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"118\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">-1</text>\n<text x=\"350\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<circle cx=\"${cx}\" cy=\"60\" r=\"6\" fill=\"#c0392b\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#c0392b\">A</text>\n</svg>",
        "answer": "[\"val\"]",
        "options": {
          "formula_code": "setNB(1)\ni=RD(0,9,[5])\nval=CUT((i-5)*0.25,2)\ncx=60+i*58"
        },
        "footer": "$$x_A=[[formula]]$$"
      },
      {
        "n": 7,
        "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:500px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"60\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">-10</text>\n<text x=\"350\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<circle cx=\"${cx}\" cy=\"60\" r=\"6\" fill=\"#c0392b\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#c0392b\">A</text>\n</svg>",
        "answer": "[\"val\"]",
        "options": {
          "formula_code": "setNB(1)\ni=RD(0,9,[5])\nval=(i-5)*2\ncx=60+i*58"
        },
        "footer": "$$x_A=[[formula]]$$"
      },
      {
        "n": 8,
        "statement": "Lis les abscisses des points A et B :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:500px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"292\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<text x=\"350\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">1</text>\n<circle cx=\"${cxA}\" cy=\"60\" r=\"6\" fill=\"#c0392b\"/>\n<text x=\"${cxA}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#c0392b\">A</text>\n<circle cx=\"${cxB}\" cy=\"60\" r=\"6\" fill=\"#2471a3\"/>\n<text x=\"${cxB}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#2471a3\">B</text>\n</svg>",
        "answer": "[\"va\",\"vb\"]",
        "options": {
          "formula_code": "setNB(1)\nia=RD(0,3)\nib=RD(5,9)\nva=ia-4\nvb=ib-4\ncxA=60+ia*58\ncxB=60+ib*58"
        },
        "footer": "$$x_A=[[formula]] \\qquad x_B=[[formula]]$$"
      },
      {
        "n": 9,
        "statement": "Lis l'abscisse du point A :\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:500px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"234\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">-2</text>\n<text x=\"292\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">-1</text>\n<circle cx=\"${cx}\" cy=\"60\" r=\"6\" fill=\"#c0392b\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#c0392b\">A</text>\n</svg>",
        "answer": "[\"val\"]",
        "options": {
          "formula_code": "setNB(1)\ni=RD(0,4,[3,4])\nval=i-5\ncx=60+i*58"
        },
        "footer": "$$x_A=[[formula]]$$"
      },
      {
        "n": 10,
        "statement": "Quelle est l'abscisse du point C ?\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"680\" height=\"auto\" viewBox=\"0 0 680 120\" style=\"max-width:500px\">\n<line x1=\"40\" y1=\"60\" x2=\"640\" y2=\"60\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<polygon points=\"640,60 630,55 630,65\" fill=\"#222\"/>\n<line x1=\"60\" y1=\"52\" x2=\"60\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"118\" y1=\"52\" x2=\"118\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"176\" y1=\"52\" x2=\"176\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"234\" y1=\"52\" x2=\"234\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"292\" y1=\"52\" x2=\"292\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"350\" y1=\"52\" x2=\"350\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"408\" y1=\"52\" x2=\"408\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"466\" y1=\"52\" x2=\"466\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"524\" y1=\"52\" x2=\"524\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<line x1=\"582\" y1=\"52\" x2=\"582\" y2=\"68\" stroke=\"#222\" stroke-width=\"1.5\"/>\n<text x=\"350\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">0</text>\n<text x=\"408\" y=\"92\" font-family=\"sans-serif\" font-size=\"22\" text-anchor=\"middle\">1</text>\n<circle cx=\"${cx}\" cy=\"60\" r=\"6\" fill=\"#c0392b\"/>\n<text x=\"${cx}\" y=\"36\" font-family=\"serif\" font-style=\"italic\" font-size=\"24\" text-anchor=\"middle\" fill=\"#c0392b\">C</text>\n</svg>&&$$${val}$$&&$$${opp}$$&&$$${d3}$$&&",
        "answer": "[\"1\"]",
        "options": {
          "formula_code": "setNB(1)\ni=RD(0,4)\nval=i-5\ncx=60+i*58\nopp=5-i\nd3=i-6",
          "shuffle_answers": true
        },
        "footer": "[[formula_qcm1]]"
      }
    ]
  }
];
