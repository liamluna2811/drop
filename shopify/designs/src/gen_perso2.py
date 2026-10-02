"""Devants personnalisables, style libre (sans le logo ni le médaillon du dos).
Partie fixe = image ; NOM et NUMÉRO = calques texte Printful (exemples dans les `-exemple`)."""
import os, sys, math
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'v3', 'src'))
from gen2 import INK, CREAM, LIME, SUN, F, P

W, H = 1000, 1333
FONTS = f'''<style>
@font-face{{font-family:AB;src:url({F}ArchivoBlack-Regular.ttf)}}
@font-face{{font-family:PA;src:url({F}Pacifico-Regular.ttf)}}
@font-face{{font-family:CH;src:url({F}Chango-Regular.ttf)}}
@font-face{{font-family:FR;src:url({F}Fraunces-Italic.ttf)}}
.ab{{font-family:AB}} .pa{{font-family:PA}} .ch{{font-family:CH}} .fr{{font-family:FR;font-variation-settings:'wght' 800,'SOFT' 100,'opsz' 144}}
</style>'''
def svg(body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}"><defs>{FONTS}</defs>{body}</svg>'
def T(x, y, s, cls, txt, fill, anchor='middle', extra=''):
    return f'<text class="{cls}" x="{x}" y="{y}" font-size="{s}" fill="{fill}" text-anchor="{anchor}" {extra}>{txt}</text>'
def knock(shape, text, fill, mid):
    """Bandeau plein dont le texte est évidé : il prend la couleur du t-shirt."""
    return (f'<mask id="{mid}"><rect width="{W}" height="{H}" fill="#fff"/><g fill="#000">{text}</g></mask>'
            f'<g mask="url(#{mid})">{shape.replace("FILL", fill)}</g>')
def ball(x, y, r, ink):
    return (f'<circle cx="{x}" cy="{y}" r="{r}" fill="{LIME}" stroke="{ink}" stroke-width="{r*.12:.1f}"/>'
            f'<path d="M{P(x-r*.62,y-r*.78)} Q{P(x-r*.1,y)} {P(x-r*.62,y+r*.78)}" fill="none" stroke="{ink}" stroke-width="{r*.1:.1f}" stroke-linecap="round"/>'
            f'<path d="M{P(x+r*.62,y-r*.78)} Q{P(x+r*.1,y)} {P(x+r*.62,y+r*.78)}" fill="none" stroke="{ink}" stroke-width="{r*.1:.1f}" stroke-linecap="round"/>')

# ---------- Maillot · A : tableau de score ----------
def score(ink, bg, nom, num):
    x0, y0, w, h = 70, 90, 860, 470
    f = f'<rect x="{x0}" y="{y0}" width="{w}" height="{h}" rx="26" fill="none" stroke="{ink}" stroke-width="10"/>'
    f += knock(f'<path d="M{x0},{y0+26} a26,26 0 0 1 26,-26 h{w-52} a26,26 0 0 1 26,26 v84 h-{w}Z" fill="FILL"/>',
               T(500, y0+75, 46, 'ab', 'COURT CENTRAL', '#000', extra='letter-spacing="14"'), ink, 'ks')
    cols = [(x0, 150, 'N°'), (x0+150, 410, 'JOUEUR'), (x0+560, 150, 'SET 1'), (x0+710, 150, 'SET 2')]
    for cx, cw, lab in cols:
        f += T(cx+cw/2, y0+160, 26, 'ab', lab, ink, extra='letter-spacing="6"')
        if cx > x0: f += f'<line x1="{cx}" y1="{y0+110}" x2="{cx}" y2="{y0+h}" stroke="{ink}" stroke-width="5"/>'
    for ry in (y0+185, y0+330):
        f += f'<line x1="{x0}" y1="{ry}" x2="{x0+w}" y2="{ry}" stroke="{ink}" stroke-width="5"/>'
    # ligne 2 : fixe, pour l'humour
    f += T(x0+150+205, y0+425, 52, 'ab', 'LES AUTRES', ink)
    for cx, v in ((x0+635, '2'), (x0+785, '1')):
        f += T(cx, y0+432, 92, 'ch', v, ink)
        f += T(cx, y0+290, 104, 'ch', '6', ink)
    f += ball(x0+w-60, y0+56, 24, ink)
    f += T(500, y0+h+75, 30, 'ab', 'BANDEJA CLUB · PADEL', ink, extra='letter-spacing="16"')
    t = T(x0+75, y0+284, 72, 'ch', num, ink) + T(x0+150+205, y0+283, 58, 'ab', nom, ink)
    return f, t

# ---------- Maillot · B : le terrain ----------
def terrain(ink, bg, nom, num):
    x0, y0, w, h = 80, 110, 840, 420   # 20 × 10 m
    f = f'<rect x="{x0}" y="{y0}" width="{w}" height="{h}" fill="none" stroke="{ink}" stroke-width="12"/>'
    sv = w/2*6.95/10
    for sx in (x0+w/2-sv, x0+w/2+sv):
        f += f'<line x1="{sx}" y1="{y0}" x2="{sx}" y2="{y0+h}" stroke="{ink}" stroke-width="6"/>'
    f += f'<line x1="{x0+w/2}" y1="{y0+h/2}" x2="{x0+w/2+sv}" y2="{y0+h/2}" stroke="{ink}" stroke-width="6"/>'
    f += f'<line x1="{x0+w/2}" y1="{y0-30}" x2="{x0+w/2}" y2="{y0+h+30}" stroke="{ink}" stroke-width="14" stroke-dasharray="4 14" stroke-linecap="round"/>'
    # trajectoire de la balle : bandeja qui passe le filet
    f += f'<path d="M{x0+w/2-150},{y0+60} Q{x0+w/2+60},{y0-170} {x0+w/2+190},{y0+h-120}" fill="none" stroke="{SUN}" stroke-width="8" stroke-dasharray="2 18" stroke-linecap="round"/>'
    f += ball(x0+w/2+190, y0+h-120, 30, ink)
    f += T(500, y0+h+95, 34, 'ab', 'TERRAIN', ink, extra='letter-spacing="16"')
    f += f'<line x1="170" y1="{y0+h+83}" x2="290" y2="{y0+h+83}" stroke="{ink}" stroke-width="5"/><line x1="710" y1="{y0+h+83}" x2="830" y2="{y0+h+83}" stroke="{ink}" stroke-width="5"/>'
    t = T(x0+w/2-sv/2, y0+h/2+58, 160, 'ch', num, ink) + T(500, y0+h+200, 92, 'ab', nom, ink, extra='letter-spacing="8"')
    return f, t

# ---------- Club Soleil · A : la signature ----------
def signature(ink, bg, nom, num):
    f = f'<path d="M150,470 C330,430 600,440 830,395" fill="none" stroke="{SUN}" stroke-width="16" stroke-linecap="round"/>'
    f += f'<path d="M210,510 C380,480 560,485 720,462" fill="none" stroke="{SUN}" stroke-width="8" stroke-linecap="round"/>'
    f += ball(870, 385, 34, ink)
    f += T(500, 600, 32, 'ab', 'PADEL AU SOLEIL', ink, extra='letter-spacing="18"')
    # soleil levant au-dessus, numéro dedans
    cx, cy = 500, 150
    f += f'<circle cx="{cx}" cy="{cy}" r="78" fill="none" stroke="{ink}" stroke-width="8"/>'
    for i in range(16):
        a = math.pi + i*math.pi/15
        r2 = 125 if i % 2 == 0 else 108
        f += f'<line x1="{cx+95*math.cos(a):.1f}" y1="{cy+95*math.sin(a):.1f}" x2="{cx+r2*math.cos(a):.1f}" y2="{cy+r2*math.sin(a):.1f}" stroke="{ink}" stroke-width="7" stroke-linecap="round"/>'
    t = T(cx, cy+30, 84, 'fr', num, ink) + T(500, 400, 170, 'pa', nom, ink)
    return f, t

# ---------- Club Soleil · B : le billet ----------
def billet(ink, bg, nom, num):
    x0, y0, w, h, cut = 60, 120, 880, 430, 690
    body = (f'M{x0+30},{y0} H{cut-24} A24,24 0 0 0 {cut+24},{y0} H{x0+w-30} Q{x0+w},{y0} {x0+w},{y0+30} '
            f'V{y0+h-30} Q{x0+w},{y0+h} {x0+w-30},{y0+h} H{cut+24} A24,24 0 0 0 {cut-24},{y0+h} H{x0+30} Q{x0},{y0+h} {x0},{y0+h-30} V{y0+30} Q{x0},{y0} {x0+30},{y0}Z')
    f = f'<path d="{body}" fill="none" stroke="{ink}" stroke-width="10"/>'
    f += f'<line x1="{cut}" y1="{y0+40}" x2="{cut}" y2="{y0+h-40}" stroke="{ink}" stroke-width="6" stroke-dasharray="4 16" stroke-linecap="round"/>'
    f += knock(f'<rect x="{x0+40}" y="{y0+40}" width="{cut-x0-80}" height="70" rx="10" fill="FILL"/>',
               T((x0+cut)/2, y0+87, 28, 'ab', 'BILLET · COURT CENTRAL', '#000', extra='letter-spacing="4"'), SUN, 'kb')
    f += T(x0+50, y0+170, 26, 'ab', 'JOUEUR', ink, anchor='start', extra='letter-spacing="8"')
    f += T(x0+50, y0+340, 26, 'ab', 'PLACE N°', ink, anchor='start', extra='letter-spacing="8"')
    f += T(x0+50, y0+h-30, 22, 'ab', 'VALABLE TOUT L’ÉTÉ', ink, anchor='start', extra='letter-spacing="5"')
    sx = (cut+x0+w)/2
    f += T(sx, y0+150, 40, 'ab', 'ADMIS', ink, extra='letter-spacing="8"') + T(sx, y0+195, 24, 'ab', '1 JOUEUR', ink, extra='letter-spacing="6"')
    f += ball(sx, y0+305, 44, ink)
    t = T(x0+50, y0+262, 100, 'fr', nom, ink, anchor='start') + T(x0+250, y0+352, 90, 'fr', num, ink, anchor='start')
    return f, t

MODELES = {'maillot-score': score, 'maillot-terrain': terrain, 'soleil-signature': signature, 'soleil-billet': billet}
EXEMPLES = {'maillot-score': ('DUPONT', '10'), 'maillot-terrain': ('DUPONT', '10'), 'soleil-signature': ('Martin', '7'), 'soleil-billet': ('Martin', '7')}

if __name__ == '__main__':
    out = os.path.join(os.path.dirname(__file__), '..', 'perso', 'svg')
    os.makedirs(out, exist_ok=True)
    for k, f in MODELES.items():
        for v, ink, bg in (('clair', INK, '#F4F4F2'), ('fonce', CREAM, '#1E1E1E')):
            open(f'{out}/{k}-devant-{v}.svg', 'w').write(svg(f(ink, bg, '', '')[0]))
            open(f'{out}/{k}-devant-{v}-exemple.svg', 'w').write(svg(''.join(f(ink, bg, *EXEMPLES[k]))))
    print('ok')
