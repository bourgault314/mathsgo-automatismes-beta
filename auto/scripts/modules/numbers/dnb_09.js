const MODULE_DNB_09 = {
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
  };
