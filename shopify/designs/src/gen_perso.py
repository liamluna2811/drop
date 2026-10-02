"""T-shirts personnalisables : une partie fixe (logo, décor) + deux zones de texte NOM et NUMÉRO.
Dans Printful, la partie fixe est l'image imprimée ; NOM et NUMÉRO sont des calques texte
« personnalisables ». Les SVG `-exemple` montrent le rendu avec un nom et un numéro fictifs."""
import os, sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'v3', 'src'))
from gen2 import logo, INK, CREAM, LIME, F
import gen3

W, H = 1000, 1333  # dos : 12 × 16 in
FONTS = f'''<style>
@font-face{{font-family:AB;src:url({F}ArchivoBlack-Regular.ttf)}}
@font-face{{font-family:CZ;src:url({F}Cinzel.ttf)}}
.ab{{font-family:AB}} .cz{{font-family:CZ;font-weight:900}}
</style>'''

def svg(body, w=W, h=H):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}"><defs>{FONTS}</defs>{body}</svg>'

def medallion(ink, x, y, size):
    """Le médaillon Club Soleil (déjà au dos du t-shirt BandejaClub), réduit."""
    inner = gen3.club_soleil(ink)
    return f'<svg x="{x}" y="{y}" width="{size}" height="{size}" viewBox="0 0 1000 1000">{inner[inner.index(">")+1:-6]}</svg>'

# Chaque modèle renvoie (partie fixe, calques texte) ; les calques texte sont ceux à créer dans Printful.
def maillot(ink, nom, num):
    fixe = logo(500, 1110, 190, ink, LIME)
    fixe += f'<text class="cz" x="500" y="1290" font-size="52" letter-spacing="10" fill="{ink}" text-anchor="middle">BANDEJA CLUB</text>'
    texte = f'<text class="ab" x="500" y="190" font-size="140" letter-spacing="10" fill="{ink}" text-anchor="middle">{nom}</text>'
    texte += f'<text class="ab" x="500" y="830" font-size="620" fill="{ink}" text-anchor="middle">{num}</text>'
    return fixe, texte

def soleil(ink, nom, num):
    fixe = medallion(ink, 90, 0, 820)
    fixe += f'<line x1="170" y1="1170" x2="380" y2="1170" stroke="{ink}" stroke-width="5"/><line x1="620" y1="1170" x2="830" y2="1170" stroke="{ink}" stroke-width="5"/>'
    fixe += gen3.sym_sun(140, 1170, 50, ink) + gen3.sym_sun(860, 1170, 50, ink)
    texte = f'<text class="cz" x="500" y="1010" font-size="120" letter-spacing="14" fill="{ink}" text-anchor="middle">{nom}</text>'
    texte += f'<text class="cz" x="500" y="1205" font-size="110" fill="{ink}" text-anchor="middle">{num}</text>'
    return fixe, texte

def carte(ink, nom, num):
    x0, y0, cw, ch = 40, 120, 920, 600
    fixe = f'<rect x="{x0}" y="{y0}" width="{cw}" height="{ch}" rx="44" fill="none" stroke="{ink}" stroke-width="12"/>'
    fixe += f'<rect x="{x0+22}" y="{y0+22}" width="{cw-44}" height="{ch-44}" rx="28" fill="none" stroke="{ink}" stroke-width="3"/>'
    fixe += f'<text class="cz" x="500" y="{y0+105}" font-size="62" letter-spacing="10" fill="{ink}" text-anchor="middle">BANDEJA CLUB</text>'
    fixe += f'<text class="ab" x="500" y="{y0+160}" font-size="30" letter-spacing="12" fill="{ink}" text-anchor="middle">CARTE DE MEMBRE · PADEL</text>'
    fixe += f'<line x1="{x0+60}" y1="{y0+195}" x2="{x0+cw-60}" y2="{y0+195}" stroke="{ink}" stroke-width="4"/>'
    fixe += logo(225, y0+395, 230, ink, LIME)
    fixe += f'<line x1="370" y1="{y0+235}" x2="370" y2="{y0+ch-60}" stroke="{ink}" stroke-width="3"/>'
    for label, yy in (('NOM', y0+265), ('NUMÉRO', y0+430)):
        fixe += f'<text class="ab" x="410" y="{yy}" font-size="28" letter-spacing="8" fill="{ink}">{label}</text>'
        fixe += f'<line x1="410" y1="{yy+120}" x2="{x0+cw-70}" y2="{yy+120}" stroke="{ink}" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>'
    texte = f'<text class="ab" x="410" y="{y0+372}" font-size="96" fill="{ink}">{nom}</text>'
    texte += f'<text class="ab" x="410" y="{y0+537}" font-size="96" fill="{ink}">{num}</text>'
    return fixe, texte

MODELES = {'maillot': maillot, 'soleil': soleil, 'carte': carte}
EXEMPLES = {'maillot': ('DUPONT', '10'), 'soleil': ('MARTIN', 'N° 7'), 'carte': ('LÉA', '23')}

if __name__ == '__main__':
    out = os.path.join(os.path.dirname(__file__), '..', 'perso', 'svg')
    os.makedirs(out, exist_ok=True)
    for k, f in MODELES.items():
        for v, ink in (('clair', INK), ('fonce', CREAM)):
            fixe, _ = f(ink, '', '')
            ex_fixe, ex_texte = f(ink, *EXEMPLES[k])
            open(f'{out}/{k}-dos-{v}.svg', 'w').write(svg(fixe))
            open(f'{out}/{k}-dos-{v}-exemple.svg', 'w').write(svg(ex_fixe + ex_texte))
    print('ok')
