import math, re, os
OUT='/home/user/drop/shopify/designs'
FONTS='file:///tmp/claude-0/fonts/'
LOGO=open('logo-mark.svg').read()
RK=re.search(r'<path id="rk" fill-rule="evenodd" d="([^"]+)"',LOGO).group(1)
# logo-mark coordinates: bbox 288..790 x 195..705 -> centre (539,450), ~502x510
def logo(cx,cy,w,ink,ball='#C8D43B'):
    s=w/502
    return f'<g transform="translate({cx},{cy}) scale({s}) translate(-539,-450)"><path fill="{ink}" fill-rule="evenodd" d="{RK}"/><circle cx="539.4" cy="636.4" r="43" fill="{ball}"/></g>'

def style():
    return f'''<style>
@font-face{{font-family:AB;src:url({FONTS}ArchivoBlack-Regular.ttf)}}
@font-face{{font-family:CP;src:url({FONTS}Caprasimo-Regular.ttf)}}
@font-face{{font-family:SH;src:url({FONTS}Shrikhand-Regular.ttf)}}
.ab{{font-family:AB}} .cp{{font-family:CP}} .sh{{font-family:SH}}
</style>'''

# ---------- signes ----------
def sun(x,y,s,c,ink=None):
    r=s*.26; g=f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}"/>'
    for i in range(10):
        a=i*math.pi/5; r1=s*.36; r2=s*.5
        g+=f'<line x1="{x+r1*math.cos(a):.1f}" y1="{y+r1*math.sin(a):.1f}" x2="{x+r2*math.cos(a):.1f}" y2="{y+r2*math.sin(a):.1f}" stroke="{c}" stroke-width="{s*.08:.1f}" stroke-linecap="round"/>'
    return g
def wave(x,y,s,c,ink=None):
    w=s*.9; g=''
    for k,dy in enumerate((-s*.14,s*.14)):
        x0=x-w/2; yy=y+dy; d=f'M{x0:.1f},{yy:.1f}'
        for i in range(3):
            d+=f' q{w/12:.1f},{-s*.16:.1f} {w/6:.1f},0 t{w/6:.1f},0'
        g+=f'<path d="{d}" fill="none" stroke="{c}" stroke-width="{s*.09:.1f}" stroke-linecap="round"/>'
    return g
def flower(x,y,s,c,ink='#F6F4EE',center='#F2B33D'):
    g=''
    for i in range(6):
        a=i*60
        g+=f'<ellipse cx="{x}" cy="{y-s*.25:.1f}" rx="{s*.15:.1f}" ry="{s*.24:.1f}" fill="{c}" transform="rotate({a} {x} {y})"/>'
    return g+f'<circle cx="{x}" cy="{y}" r="{s*.13:.1f}" fill="{center}"/>'
def sparkle(x,y,s,c,ink=None):
    r=s*.48; q=s*.07
    d=f'M{x},{y-r} Q{x+q},{y-q} {x+r},{y} Q{x+q},{y+q} {x},{y+r} Q{x-q},{y+q} {x-r},{y} Q{x-q},{y-q} {x},{y-r}Z'
    return f'<path d="{d}" fill="{c}"/>'
def ball(x,y,s,c,ink='#F6F4EE'):
    r=s*.4
    return (f'<circle cx="{x}" cy="{y}" r="{r:.1f}" fill="{c}"/>'
      f'<path d="M{x-r*.95:.1f},{y-r*.3:.1f} Q{x},{y+r*.35:.1f} {x+r*.95:.1f},{y-r*.3:.1f}" fill="none" stroke="{ink}" stroke-width="{s*.06:.1f}" stroke-linecap="round"/>')
def palm(x,y,s,c,ink=None):
    w=s*.07
    g=f'<path d="M{x-s*.05:.1f},{y+s*.48:.1f} Q{x+s*.12:.1f},{y+s*.1:.1f} {x},{y-s*.22:.1f}" fill="none" stroke="{c}" stroke-width="{w*1.3:.1f}" stroke-linecap="round"/>'
    for dx,dy,cx_,cy_ in ((-.42,-.05,-.22,-.42),(.42,-.05,.22,-.42),(-.3,.12,-.3,-.25),(.3,.12,.3,-.25),(-.02,-.5,-.2,-.45)):
        g+=f'<path d="M{x:.1f},{y-s*.22:.1f} Q{x+s*cx_:.1f},{y+s*cy_:.1f} {x+s*dx:.1f},{y+s*dy:.1f}" fill="none" stroke="{c}" stroke-width="{w:.1f}" stroke-linecap="round"/>'
    return g
def vitre(x,y,s,c,ink=None):
    w=s*.8; h=s*.62; sw=s*.07
    g=f'<rect x="{x-w/2:.1f}" y="{y-h/2:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{s*.06:.1f}" fill="none" stroke="{c}" stroke-width="{sw:.1f}"/>'
    for i in (1,2,3): g+=f'<line x1="{x-w/2+i*w/4:.1f}" y1="{y-h/2:.1f}" x2="{x-w/2+i*w/4:.1f}" y2="{y+h/2:.1f}" stroke="{c}" stroke-width="{sw*.6:.1f}"/>'
    g+=f'<line x1="{x-w/2:.1f}" y1="{y:.1f}" x2="{x+w/2:.1f}" y2="{y:.1f}" stroke="{c}" stroke-width="{sw*.6:.1f}"/>'
    return g

def svg(vb_w,vb_h,body,extra=''):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vb_w} {vb_h}" width="{vb_w}" height="{vb_h}">{style()}{extra}{body}</svg>'

# ---------- 1. Club Soleil : badge rond ----------
def club_soleil(P):
    cx=cy=500
    b=f'<defs><path id="top" d="M{cx-352},{cy} A352,352 0 0 1 {cx+352},{cy}"/><path id="bot" d="M{cx-398},{cy} A398,398 0 0 0 {cx+398},{cy}"/></defs>'
    b+=f'<circle cx="{cx}" cy="{cy}" r="440" fill="none" stroke="{P["line"]}" stroke-width="10"/>'
    b+=f'<circle cx="{cx}" cy="{cy}" r="424" fill="none" stroke="{P["line"]}" stroke-width="4"/>'
    b+=f'<circle cx="{cx}" cy="{cy}" r="326" fill="{P["disc"]}" stroke="{P["line"]}" stroke-width="8"/>'
    # bande « soleil » et orbite des signes autour du logo
    b+=f'<circle cx="{cx}" cy="{cy}" r="318" fill="{P["band"]}"/>'
    b+=f'<circle cx="{cx}" cy="{cy}" r="206" fill="{P["disc"]}" stroke="{P["line_in"]}" stroke-width="5"/>'
    b+=f'<circle cx="{cx}" cy="{cy}" r="262" fill="none" stroke="{P["line_in"]}" stroke-width="3" stroke-dasharray="2 14" stroke-linecap="round"/>'
    b+=logo(cx,cy-4,290,P['logo'],P['ball'])
    signs=[sun,wave,flower,sparkle,sun,wave,flower,sparkle]
    cols=P['signs']
    for i,f in enumerate(signs):
        a=-math.pi/2+i*math.pi/4+math.pi/8
        x,y=cx+262*math.cos(a),cy+262*math.sin(a)
        b+=f'<circle cx="{x:.1f}" cy="{y:.1f}" r="44" fill="{P["disc"]}" stroke="{P["line_in"]}" stroke-width="4"/>'+f(round(x,1),round(y,1),64,cols[i%len(cols)],P['disc'])
    b+=f'<text class="ab" font-size="64" letter-spacing="10" fill="{P["line"]}" text-anchor="middle"><textPath href="#top" startOffset="50%">BANDEJA CLUB</textPath></text>'
    b+=f'<text class="ab" font-size="46" letter-spacing="8" fill="{P["line"]}" text-anchor="middle"><textPath href="#bot" startOffset="50%">PADEL · SOLEIL · VITRES</textPath></text>'
    for sx in (cx-375,cx+375): b+=sparkle(sx,cy,44,P['accent'])
    return svg(1000,1000,b)

def chest(P,word=True):
    b=logo(250,150,240,P['line'],P['ball'])
    if word: b+=f'<text class="ab" x="250" y="370" font-size="40" letter-spacing="6" fill="{P["line"]}" text-anchor="middle">BANDEJA CLUB</text>'
    return svg(500,400,b)

# ---------- 2. Riviera : coucher de soleil rétro ----------
def riviera(P):
    cx=500; cy=600; r=300
    b=f'<defs><clipPath id="sun"><circle cx="{cx}" cy="{cy}" r="{r}"/></clipPath><path id="arc" d="M150,470 A390,390 0 0 1 850,470"/></defs>'
    bands=P['bands']; g=''
    y0=cy-r
    for i,col in enumerate(bands):
        g+=f'<rect x="{cx-r}" y="{y0+i*2*r/len(bands):.1f}" width="{2*r}" height="{2*r/len(bands)+1:.1f}" fill="{col}"/>'
    # coupures horizontales façon années 70 (de plus en plus larges vers le bas)
    yy=cy+20; gap=8; cuts=''
    for i in range(6):
        cuts+=f'<rect x="{cx-r}" y="{yy}" width="{2*r}" height="{gap}" fill="#000"/>'
        yy+=gap+34-i*3; gap+=7
    b+=f'<mask id="cuts"><rect width="1000" height="1150" fill="#fff"/>{cuts}</mask><g clip-path="url(#sun)" mask="url(#cuts)">{g}</g>'
    b+=logo(cx,cy-60,270,P['logo'],P['ball'])
    # vagues
    for k in range(3):
        y=cy+r+40+k*42; d=f'M{cx-330},{y}'
        for i in range(6): d+=' q27.5,-24 55,0 t55,0'
        b+=f'<path d="{d}" fill="none" stroke="{P["sea"]}" stroke-width="13" stroke-linecap="round"/>'
    b+=f'<text class="cp" font-size="118" letter-spacing="4" fill="{P["line"]}" text-anchor="middle"><textPath href="#arc" startOffset="50%">Bandeja Club</textPath></text>'
    b+=f'<text class="ab" x="{cx}" y="1110" font-size="54" letter-spacing="14" fill="{P["line"]}" text-anchor="middle">PADEL AU SOLEIL</text>'
    b+=sparkle(130,330,60,P['accent'])+sparkle(880,300,44,P['accent'])+sparkle(90,860,40,P['accent'])+sparkle(905,820,56,P['accent'])
    return svg(1000,1150,b)

# ---------- 3. Les signes du club : planche de pastilles ----------
def signes(P):
    b=f'<text class="sh" x="500" y="140" font-size="112" fill="{P["line"]}" text-anchor="middle">Bandeja Club</text>'
    items=[(sun,0),(wave,1),(flower,2),(ball,3),('logo',None),(palm,4),(sparkle,5),(vitre,0),(sun,1)]
    for i,(f,ci) in enumerate(items):
        col,row=i%3,i//3; x=230+col*270; y=355+row*270
        tile=P['tiles'][i%len(P['tiles'])]
        b+=f'<circle cx="{x}" cy="{y}" r="112" fill="{tile}" stroke="{P["line"]}" stroke-width="8"/>'
        if f=='logo': b+=logo(x,y,140,P['logo_in'],P['ball'])
        else: b+=f(x,y,140,P['icon'][ci],tile)
    b+=f'<text class="ab" x="500" y="1050" font-size="46" letter-spacing="12" fill="{P["line"]}" text-anchor="middle">PADEL · SOLEIL · COPAINS</text>'
    return svg(1000,1090,b)

INK='#13253A'; CREAM='#F6F1E4'; LIME='#C8D43B'; ORANGE='#F08A3C'; TERRA='#D2603A'; SEA='#3B7FB5'; SKY='#9FCDE8'; PINK='#F2A3A0'; SUN='#F6C343'; SAGE='#B9CBB0'
designs={
 'club-soleil':{
   'fn':club_soleil,
   'variants':{
     'clair':dict(line=INK,disc='#FBF3DC',band='#F7D57E',line_in=INK,logo=INK,ball=LIME,signs=[ORANGE,SEA,PINK,TERRA],accent=TERRA),
     'fonce':dict(line=CREAM,disc='#FBF3DC',band='#F7D57E',line_in=INK,logo=INK,ball=LIME,signs=[ORANGE,SEA,PINK,TERRA],accent=SUN),
   }},
 'riviera':{
   'fn':riviera,
   'variants':{
     'clair':dict(line=INK,bands=[SUN,'#F5A94B',ORANGE,'#E9744A',TERRA],cut='#00000000',logo=INK,ball=LIME,sea=SEA,accent=ORANGE),
     'fonce':dict(line=CREAM,bands=[SUN,'#F5A94B',ORANGE,'#E9744A',TERRA],cut='#00000000',logo=INK,ball=LIME,sea=SKY,accent=SUN),
   }},
 'signes-du-club':{
   'fn':signes,
   'variants':{
     'clair':dict(line=INK,tiles=['#FBF3DC',SKY,'#FBF3DC',PINK,'#FBF3DC',SAGE,'#FBF3DC',SUN,'#FBF3DC'],icon=[ORANGE,SEA,TERRA,LIME,INK,TERRA],logo_in=INK,ball=LIME),
     'fonce':dict(line=CREAM,tiles=['#FBF3DC',SKY,'#FBF3DC',PINK,'#FBF3DC',SAGE,'#FBF3DC',SUN,'#FBF3DC'],icon=[ORANGE,SEA,TERRA,LIME,INK,TERRA],logo_in=INK,ball=LIME),
   }},
}
os.makedirs(f'{OUT}/src/svg',exist_ok=True)
for name,D in designs.items():
    for v,P in D['variants'].items():
        open(f'{OUT}/src/svg/{name}-dos-{v}.svg','w').write(D['fn'](P))
        open(f'{OUT}/src/svg/{name}-coeur-{v}.svg','w').write(chest(P))
print('ok')
