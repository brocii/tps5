import json
import os
from xml.sax.saxutils import escape


def load_json(path):
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def item_to_xml(item):
    parts = []
    if 'marca' in item:
        parts.append(f"    <marca>{escape(str(item['marca']))}</marca>")
    if 'modello' in item:
        parts.append(f"    <modello>{escape(str(item['modello']))}</modello>")
    if 'prezzo' in item:
        parts.append(f"    <prezzo>{escape(str(item['prezzo']))}</prezzo>")
    if 'immagine' in item:
        parts.append(f"    <immagine>{escape(str(item['immagine']))}</immagine>")
    if 'descrizione' in item:
        parts.append(f"    <descrizione>{escape(str(item['descrizione']))}</descrizione>")
    return "\n".join(parts)


def build_xml(data, categories):
    lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<catalogo>']
    for cat in categories:
        lines.append(f'  <categoria nome="{escape(cat)}">')
        arr = data.get(cat, [])
        for prod in arr:
            lines.append('  <prodotto>')
            lines.append(item_to_xml(prod))
            lines.append('  </prodotto>')
        lines.append('  </categoria>')
    lines.append('</catalogo>')
    return "\n".join(lines) + "\n"


def main():
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_path = os.path.join(base, 'cappelli.json')
    out_path = os.path.join(base, 'cappelli2.xml')

    data = load_json(json_path)
    categories = ['cappelli invernali', 'cappelli estivi']
    xml = build_xml(data, categories)

    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(xml)

    print(f"Wrote {out_path} with categories: {', '.join(categories)}")


if __name__ == '__main__':
    main()
