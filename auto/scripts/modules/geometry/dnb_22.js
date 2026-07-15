const MODULE_DNB_22 = {
    "id": "dnb_22",
    "num": 22,
    "title": "Aires triangle rectangle disque",
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
        "statement": "Calcule l'aire de ce rectangle.<br><div style=\"text-align:center\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"300\" height=\"auto\" viewBox=\"0 0 300 170\"><rect x=\"55\" y=\"45\" width=\"190\" height=\"80\" fill=\"#eaf3ff\" stroke=\"#1f5f99\" stroke-width=\"2\"/><text x=\"150\" y=\"143\" font-family=\"serif\" font-size=\"18\" text-anchor=\"middle\">${L} cm</text><text x=\"38\" y=\"90\" font-family=\"serif\" font-size=\"18\" text-anchor=\"middle\">${l} cm</text></svg></div>",
        "answer": "[\"L*l\"]",
        "options": {
          "formula_code": "L=RD(5,14)\nl=RD(2,9)\n"
        },
        "footer": "Aire = [[formula]] cm²"
      },
      {
        "n": 2,
        "statement": "Un rectangle mesure ${L} m de longueur et ${l} m de largeur. Calcule son aire.",
        "answer": "[\"L*l\"]",
        "options": {
          "formula_code": "L=RD(8,25)\nl=RD(3,12)\n"
        },
        "footer": "Aire = [[formula]] m²"
      },
      {
        "n": 3,
        "statement": "Calcule l'aire de ce triangle.<br><div style=\"text-align:center\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"310\" height=\"auto\" viewBox=\"0 0 310 205\"><polygon points=\"55,155 255,155 185,45\" fill=\"#fff4e6\" stroke=\"#b35c00\" stroke-width=\"2\"/><line x1=\"185\" y1=\"45\" x2=\"185\" y2=\"155\" stroke=\"#b35c00\" stroke-width=\"2\" stroke-dasharray=\"6,4\"/><polyline points=\"185,142 198,142 198,155\" fill=\"none\" stroke=\"#b35c00\" stroke-width=\"2\"/><text x=\"155\" y=\"178\" font-family=\"serif\" font-size=\"18\" text-anchor=\"middle\">base ${b} cm</text><text x=\"202\" y=\"105\" font-family=\"serif\" font-size=\"18\">hauteur ${h} cm</text></svg></div>",
        "answer": "[\"CUT(b*h/2,2)\"]",
        "options": {
          "formula_code": "b=RD(6,18)\nh=RD(4,14)\n"
        },
        "footer": "Aire = [[formula]] cm²"
      },
      {
        "n": 4,
        "statement": "Ce triangle est rectangle. Calcule son aire.<br><div style=\"text-align:center\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"300\" height=\"auto\" viewBox=\"0 0 300 190\"><polygon points=\"70,145 70,45 240,145\" fill=\"#f0fff0\" stroke=\"#247524\" stroke-width=\"2\"/><polyline points=\"70,128 87,128 87,145\" fill=\"none\" stroke=\"#247524\" stroke-width=\"2\"/><text x=\"48\" y=\"100\" font-family=\"serif\" font-size=\"18\" text-anchor=\"middle\">${a} cm</text><text x=\"155\" y=\"168\" font-family=\"serif\" font-size=\"18\" text-anchor=\"middle\">${b} cm</text></svg></div>",
        "answer": "[\"CUT(a*b/2,2)\"]",
        "options": {
          "formula_code": "a=RD(3,12)\nb=RD(4,16)\n"
        },
        "footer": "Aire = [[formula]] cm²"
      },
      {
        "n": 5,
        "statement": "Calcule l'aire du disque. On prendra $$\\pi\\approx 3,14$$.<br><div style=\"text-align:center\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"260\" height=\"auto\" viewBox=\"0 0 260 190\"><circle cx=\"130\" cy=\"95\" r=\"70\" fill=\"#f2edff\" stroke=\"#6040a0\" stroke-width=\"2\"/><line x1=\"130\" y1=\"95\" x2=\"200\" y2=\"95\" stroke=\"#6040a0\" stroke-width=\"2\"/><circle cx=\"130\" cy=\"95\" r=\"3\" fill=\"#6040a0\"/><text x=\"165\" y=\"85\" font-family=\"serif\" font-size=\"18\" text-anchor=\"middle\">${r} cm</text></svg></div>",
        "answer": "[\"CUT(3.14*r*r,2)\"]",
        "options": {
          "formula_code": "r=RD(2,10)\n"
        },
        "footer": "Aire = [[formula]] cm²"
      },
      {
        "n": 6,
        "statement": "La façade ci-dessous est formée d'un rectangle et d'un triangle. Calcule son aire totale.<br><div style=\"text-align:center\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"330\" height=\"auto\" viewBox=\"0 0 330 245\"><rect x=\"80\" y=\"105\" width=\"170\" height=\"95\" fill=\"#eaf3ff\" stroke=\"#1f5f99\" stroke-width=\"2\"/><polygon points=\"80,105 165,45 250,105\" fill=\"#fff4e6\" stroke=\"#b35c00\" stroke-width=\"2\"/><line x1=\"165\" y1=\"45\" x2=\"165\" y2=\"105\" stroke=\"#b35c00\" stroke-width=\"2\" stroke-dasharray=\"6,4\"/><text x=\"165\" y=\"224\" font-family=\"serif\" font-size=\"17\" text-anchor=\"middle\">largeur ${L} m</text><text x=\"62\" y=\"155\" font-family=\"serif\" font-size=\"17\" text-anchor=\"middle\">${H} m</text><text x=\"188\" y=\"78\" font-family=\"serif\" font-size=\"17\">toit ${h} m</text></svg></div>",
        "answer": "[\"L*H+L*h/2\"]",
        "options": {
          "formula_code": "L=RD(6,14)\nH=RD(3,8)\nh=RD(2,6)\n"
        },
        "footer": "Aire totale = [[formula]] m²"
      },
      {
        "n": 7,
        "statement": "Un triangle a pour base ${b} cm et pour hauteur correspondante ${h} cm. Calcule son aire.",
        "answer": "[\"CUT(b*h/2,2)\"]",
        "options": {
          "formula_code": "b=RD(10,30)\nh=RD(5,20)\n"
        },
        "footer": "Aire = [[formula]] cm²"
      },
      {
        "n": 8,
        "statement": "Calcule l'aire du disque de diamètre ${d} cm. On prendra $$\\pi\\approx 3,14$$.",
        "answer": "[\"CUT(3.14*d*d/4,2)\"]",
        "options": {
          "formula_code": "d=RD(2,12)*2\n"
        },
        "footer": "Aire = [[formula]] cm²"
      },
      {
        "n": 9,
        "statement": "Calcule l'aire de ce rectangle.<br><div style=\"text-align:center\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"320\" height=\"auto\" viewBox=\"0 0 320 175\"><rect x=\"45\" y=\"50\" width=\"230\" height=\"70\" fill=\"#fff9db\" stroke=\"#927000\" stroke-width=\"2\"/><text x=\"160\" y=\"143\" font-family=\"serif\" font-size=\"18\" text-anchor=\"middle\">${L} dm</text><text x=\"30\" y=\"92\" font-family=\"serif\" font-size=\"18\" text-anchor=\"middle\">${l} dm</text></svg></div>",
        "answer": "[\"L*l\"]",
        "options": {
          "formula_code": "L=RD(12,30)\nl=RD(4,11)\n"
        },
        "footer": "Aire = [[formula]] dm²"
      },
      {
        "n": 10,
        "statement": "Un disque a un rayon de ${r} m. Calcule son aire. On prendra $$\\pi\\approx 3,14$$.",
        "answer": "[\"CUT(3.14*r*r,2)\"]",
        "options": {
          "formula_code": "r=RD(3,15)\n"
        },
        "footer": "Aire = [[formula]] m²"
      }
    ]
  };
