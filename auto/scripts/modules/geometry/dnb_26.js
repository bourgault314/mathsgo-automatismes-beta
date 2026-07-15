const MODULE_DNB_26 = {
    "id": "dnb_26",
    "num": 26,
    "title": "Cosinus triangle rectangle",
    "level_tags": [
      "3e",
      "DNB"
    ],
    "source": "import_dnb_zip",
    "has_svg": true,
    "questions": [
      {
        "n": 1,
        "statement": "Dans quel type de triangle peut-on utiliser directement la ligne trigonométrique cosinus ?&&dans n'importe quel triangle&&dans un triangle rectangle&&dans un triangle isocèle uniquement&&dans un triangle équilatéral uniquement&&",
        "answer": "[\"2\"]",
        "options": {
          "shuffle_answers": true
        },
        "footer": "[[qcm1]]"
      },
      {
        "n": 2,
        "statement": "Dans le triangle ABC rectangle en B, quelle égalité correspond à $$\\cos(\\widehat{A})$$ ?<br><div style=\"text-align:center\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"310\" height=\"auto\" viewBox=\"0 0 310 190\"><polygon points=\"70,140 240,140 70,55\" fill=\"#eef8ff\" stroke=\"#1f5f8b\" stroke-width=\"2\"/><polyline points=\"70,125 85,125 85,140\" fill=\"none\" stroke=\"#1f5f8b\" stroke-width=\"2\"/><path d=\"M 70,90 A 35,35 0 0 0 101,71\" fill=\"none\" stroke=\"#1f5f8b\" stroke-width=\"2\"/><text x=\"55\" y=\"154\" font-family=\"serif\" font-style=\"italic\" font-size=\"17\">B</text><text x=\"246\" y=\"154\" font-family=\"serif\" font-style=\"italic\" font-size=\"17\">C</text><text x=\"55\" y=\"50\" font-family=\"serif\" font-style=\"italic\" font-size=\"17\">A</text></svg></div>&&$$\\cos(\\widehat{A})=\\dfrac{AB}{AC}$$&&$$\\cos(\\widehat{A})=\\dfrac{BC}{AC}$$&&$$\\cos(\\widehat{A})=\\dfrac{AB}{BC}$$&&$$\\cos(\\widehat{A})=\\dfrac{AC}{AB}$$&&",
        "answer": "[\"1\"]",
        "options": {
          "shuffle_answers": true
        },
        "footer": "[[qcm1]]"
      },
      {
        "n": 3,
        "statement": "Dans un triangle rectangle, le côté adjacent à l'angle étudié mesure ${adj} cm et l'hypoténuse mesure ${hyp} cm. Calcule le cosinus de cet angle. Arrondis au centième.",
        "answer": "[\"CUT(adj/hyp,2)\"]",
        "options": {
          "formula_code": "setNB(4)\nhyp=RD(6,15)\nadj=RD(2,hyp-1)"
        },
        "footer": "$$\\cos(\\widehat{A})=[[formula]]$$"
      },
      {
        "n": 4,
        "statement": "Dans le triangle MNP rectangle en P, quelle égalité correspond à $$\\cos(\\widehat{M})$$ ?<br><div style=\"text-align:center\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"310\" height=\"auto\" viewBox=\"0 0 310 190\"><polygon points=\"70,140 245,140 245,55\" fill=\"#f3fff0\" stroke=\"#246b24\" stroke-width=\"2\"/><polyline points=\"230,140 230,125 245,125\" fill=\"none\" stroke=\"#246b24\" stroke-width=\"2\"/><path d=\"M 105,140 A 35,35 0 0 0 101,125\" fill=\"none\" stroke=\"#246b24\" stroke-width=\"2\"/><text x=\"55\" y=\"154\" font-family=\"serif\" font-style=\"italic\" font-size=\"17\">M</text><text x=\"252\" y=\"154\" font-family=\"serif\" font-style=\"italic\" font-size=\"17\">P</text><text x=\"252\" y=\"55\" font-family=\"serif\" font-style=\"italic\" font-size=\"17\">N</text></svg></div>&&$$\\cos(\\widehat{M})=\\dfrac{MP}{MN}$$&&$$\\cos(\\widehat{M})=\\dfrac{NP}{MN}$$&&$$\\cos(\\widehat{M})=\\dfrac{MP}{NP}$$&&$$\\cos(\\widehat{M})=\\dfrac{MN}{MP}$$&&",
        "answer": "[\"1\"]",
        "options": {
          "shuffle_answers": true
        },
        "footer": "[[qcm1]]"
      },
      {
        "n": 5,
        "statement": "Dans le triangle ABC rectangle en B, on connaît $$AC=12\\text{ cm}$$ et $$\\widehat{A}=40°$$.<br><div style=\"text-align:center\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"310\" height=\"auto\" viewBox=\"0 0 310 190\"><polygon points=\"70,150 200,150 200,41\" fill=\"#fff7e8\" stroke=\"#b36b00\" stroke-width=\"2\"/><polyline points=\"185,150 185,135 200,135\" fill=\"none\" stroke=\"#b36b00\" stroke-width=\"2\"/><path d=\"M 105,150 A 35,35 0 0,0 97,128\" fill=\"none\" stroke=\"#b36b00\" stroke-width=\"2\"/><text x=\"55\" y=\"164\" font-family=\"serif\" font-style=\"italic\" font-size=\"17\">A</text><text x=\"207\" y=\"164\" font-family=\"serif\" font-style=\"italic\" font-size=\"17\">B</text><text x=\"207\" y=\"43\" font-family=\"serif\" font-style=\"italic\" font-size=\"17\">C</text></svg></div>Calcule $$AB$$. Arrondis au dixième.",
        "answer": "[\"9,2\"]",
        "options": null,
        "footer": "$$AB=[[dec]]\\text{ cm}$$"
      },
      {
        "n": 6,
        "statement": "Dans le triangle ABC rectangle en B, on connaît $$AB=8\\text{ cm}$$ et $$\\widehat{A}=35°$$.<br><div style=\"text-align:center\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"310\" height=\"auto\" viewBox=\"0 0 310 190\"><polygon points=\"70,150 209,150 209,52\" fill=\"#fff7e8\" stroke=\"#b36b00\" stroke-width=\"2\"/><polyline points=\"194,150 194,135 209,135\" fill=\"none\" stroke=\"#b36b00\" stroke-width=\"2\"/><path d=\"M 105,150 A 35,35 0 0,0 99,130\" fill=\"none\" stroke=\"#b36b00\" stroke-width=\"2\"/><text x=\"55\" y=\"164\" font-family=\"serif\" font-style=\"italic\" font-size=\"17\">A</text><text x=\"216\" y=\"164\" font-family=\"serif\" font-style=\"italic\" font-size=\"17\">B</text><text x=\"216\" y=\"54\" font-family=\"serif\" font-style=\"italic\" font-size=\"17\">C</text></svg></div>Calcule $$AC$$. Arrondis au dixième.",
        "answer": "[\"9,8\"]",
        "options": null,
        "footer": "$$AC=[[dec]]\\text{ cm}$$"
      },
      {
        "n": 7,
        "statement": "Dans un triangle ABC rectangle en B, l'hypoténuse est :&&le côté AB&&le côté AC&&le côté BC&&le plus petit côté&&",
        "answer": "[\"2\"]",
        "options": {
          "shuffle_answers": true
        },
        "footer": "[[qcm1]]"
      },
      {
        "n": 8,
        "statement": "Un élève veut calculer un côté adjacent avec le cosinus. L'hypoténuse mesure $$10\\text{ cm}$$ et il obtient $$12\\text{ cm}$$ pour le côté adjacent. Que peut-on dire ?&&Le résultat est impossible : un côté adjacent ne peut pas être plus long que l'hypoténuse.&&Le résultat est possible dans un triangle rectangle.&&Il faut seulement changer l'unité.&&Le cosinus donne toujours un résultat supérieur à l'hypoténuse.&&",
        "answer": "[\"1\"]",
        "options": {
          "shuffle_answers": true
        },
        "footer": "[[qcm1]]"
      },
      {
        "n": 9,
        "statement": "Dans un triangle, on connaît deux côtés et un angle, mais on ne sait pas si le triangle est rectangle. Peut-on appliquer directement la formule du cosinus vue au collège ?&&Oui, toujours.&&Non, il faut d'abord savoir que le triangle est rectangle.&&Oui, si le triangle est assez grand.&&Oui, si les longueurs sont entières.&&",
        "answer": "[\"2\"]",
        "options": {
          "shuffle_answers": true
        },
        "footer": "[[qcm1]]"
      },
      {
        "n": 10,
        "statement": "Dans le triangle ABC rectangle en B, quelles égalités sont correctes ?&&$$\\cos(\\widehat{A})=\\dfrac{AB}{AC}$$&&$$\\cos(\\widehat{C})=\\dfrac{BC}{AC}$$&&$$\\cos(\\widehat{A})=\\dfrac{BC}{AC}$$&&$$\\cos(\\widehat{C})=\\dfrac{AB}{AC}$$&&",
        "answer": "[\"1\",\"2\"]",
        "options": {
          "shuffle_answers": true
        },
        "footer": "[[qcm]]"
      }
    ]
  };
