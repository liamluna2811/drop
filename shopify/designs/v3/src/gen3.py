"""Club Soleil v3 : médaillon une encre, esprit gravure (bague de texte continue + symboles)."""
import math, os
from gen2 import logo, P, LIME, INK, CREAM, F
DEFS=f'''<style>
@font-face{{font-family:CZ;src:url({F}Cinzel.ttf)}}
@font-face{{font-family:MS;src:url({F}MarcellusSC-Regular.ttf)}}
.cz{{font-family:CZ;font-weight:900}} .ms{{font-family:MS}}
</style>
<filter id="rough" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="3.5" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="wear" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="3" seed="11" result="n"/>
<feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="2" result="m"/><feComposite in="n" in2="m" operator="arithmetic" k2="0.75" k3="0.55" k4="-0.16" result="nm"/>
<feComponentTransfer in="nm" result="mask"><feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 0"/></feComponentTransfer>
<feComposite in="SourceGraphic" in2="mask" operator="in"/></filter>'''
def svg(w,h,body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}"><defs>{DEFS}</defs><g filter="url(#wear)"><g filter="url(#rough)">{body}</g></g></svg>'

# symboles gravés, une seule encre
def sym_sun(x,y,s,c,rot=0):
    g=f'<circle cx="{x}" cy="{y}" r="{s*.24:.1f}" fill="none" stroke="{c}" stroke-width="{s*.08:.1f}"/><circle cx="{x}" cy="{y}" r="{s*.07:.1f}" fill="{c}"/>'
    for i in range(12):
        a=i*math.pi/6+rot; r2=s*(.5 if i%2==0 else .42)
        g+=f'<line x1="{x+s*.33*math.cos(a):.1f}" y1="{y+s*.33*math.sin(a):.1f}" x2="{x+r2*math.cos(a):.1f}" y2="{y+r2*math.sin(a):.1f}" stroke="{c}" stroke-width="{s*.065:.1f}" stroke-linecap="round"/>'
    return g
def sym_flower(x,y,s,c,rot=0):
    g=''
    for i in range(5):
        a=i*72+math.degrees(rot)
        g+=f'<path d="M{x},{y} C{x-s*.2:.1f},{y-s*.2:.1f} {x-s*.16:.1f},{y-s*.48:.1f} {x},{y-s*.5:.1f} C{x+s*.16:.1f},{y-s*.48:.1f} {x+s*.2:.1f},{y-s*.2:.1f} {x},{y}Z" fill="none" stroke="{c}" stroke-width="{s*.07:.1f}" stroke-linejoin="round" transform="rotate({a:.1f} {x} {y})"/>'
        g+=f'<line x1="{x}" y1="{y-s*.12:.1f}" x2="{x}" y2="{y-s*.34:.1f}" stroke="{c}" stroke-width="{s*.04:.1f}" stroke-linecap="round" transform="rotate({a:.1f} {x} {y})"/>'
    return g+f'<circle cx="{x}" cy="{y}" r="{s*.1:.1f}" fill="{c}"/>'

def club_soleil(ink, rays=False):
    c=500; R1,R2=470,384; rt=(R1+R2)/2-14   # bague de texte
    b=f'<circle cx="{c}" cy="{c}" r="{R1}" fill="none" stroke="{ink}" stroke-width="9"/>'
    b+=f'<circle cx="{c}" cy="{c}" r="{R1-14}" fill="none" stroke="{ink}" stroke-width="3"/>'
    b+=f'<circle cx="{c}" cy="{c}" r="{R2}" fill="none" stroke="{ink}" stroke-width="9"/>'
    # chemin circulaire qui démarre en bas (le texte du haut ne coupe jamais le départ)
    S=158  # le chemin démarre sur un symbole, jamais au milieu d'un mot
    pt=lambda d: P(c+rt*math.sin(math.radians(d)),c-rt*math.cos(math.radians(d)))
    b+=f'<path id="ring" d="M{pt(S)} A{rt},{rt} 0 1 1 {pt(S+180)} A{rt},{rt} 0 1 1 {pt(S)}" fill="none"/>'
    L=2*math.pi*rt
    items=[('t','BANDEJA CLUB',64),('sun',None,12),('t','PADEL',28),('flower',None,12)]*3
    ang=-32  # centre du premier mot : en haut
    for k,(kind,txt,w) in enumerate(items):
        mid=ang+w/2 if k else 0
        if k==0: ang=-32
        mid=ang+w/2
        if kind=='t':
            off=((mid-S)%360)/360*L
            b+=f'<text class="cz" font-size="50" letter-spacing="4" fill="{ink}" text-anchor="middle"><textPath href="#ring" startOffset="{off:.1f}" textLength="{w/360*L*0.92:.1f}" lengthAdjust="spacing">{txt}</textPath></text>'
        else:
            a=math.radians(mid-90); x,y=c+(rt+17)*math.cos(a),c+(rt+17)*math.sin(a)
            f=sym_sun if kind=='sun' else sym_flower
            b+=f(round(x,1),round(y,1),54,ink,a+math.pi/2)
        ang+=w
    # disque intérieur
    if rays:
        for i in range(150):
            a=i*2*math.pi/150; r0=196 if i%2 else 176; r1=R2-22-(i%3)*10
            b+=f'<line x1="{c+r0*math.cos(a):.1f}" y1="{c+r0*math.sin(a):.1f}" x2="{c+r1*math.cos(a):.1f}" y2="{c+r1*math.sin(a):.1f}" stroke="{ink}" stroke-width="{2.6 if i%2 else 3.6}" stroke-linecap="round"/>'
        b+=f'<circle cx="{c}" cy="{c}" r="160" fill="none" stroke="{ink}" stroke-width="5"/>'
        b+=logo(c,c,232,ink,LIME)
    else:
        b+=f'<circle cx="{c}" cy="{c}" r="{R2-26}" fill="none" stroke="{ink}" stroke-width="3" stroke-dasharray="1 12" stroke-linecap="round"/>'
        b+=logo(c,c+30,330,ink,LIME)
        b+=sym_sun(c,c-262,78,ink)
        b+=sym_flower(c-258,c+70,64,ink,0.3)+sym_flower(c+258,c+70,64,ink,-0.3)
    return svg(1000,1000,b)

def coeur(ink):
    return svg(600,420,logo(300,150,230,ink,LIME)+f'<text class="cz" x="300" y="385" font-size="58" letter-spacing="5" fill="{ink}" text-anchor="middle">BANDEJA CLUB</text>')

if __name__=='__main__':
    os.makedirs('svg3',exist_ok=True)
    for v,ink in (('clair',INK),('fonce',CREAM)):
        open(f'svg3/club-soleil-v3-dos-{v}.svg','w').write(club_soleil(ink))
        open(f'svg3/club-soleil-v3-rayons-dos-{v}.svg','w').write(club_soleil(ink,True))
        for k in ('club-soleil-v3','club-soleil-v3-rayons'):
            open(f'svg3/{k}-coeur-{v}.svg','w').write(coeur(ink))
    print('ok')
