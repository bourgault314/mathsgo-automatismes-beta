const MODULE_DNB_13 = {
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
  };
