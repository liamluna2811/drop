"""Modèles v2 : esprit sérigraphie vintage (trait irrégulier, encres en aplat, léger effet usé)."""
import math, re, os
OUT='/home/user/drop/shopify/designs'
F='file:///tmp/claude-0/fonts/'
RK=re.search(r'<path id="rk" fill-rule="evenodd" d="([^"]+)"',open('logo-mark.svg').read()).group(1)
INK='#14263B'; CREAM='#F7EBD3'; PAPER='#FBF5E8'; SUN='#EE7B30'; GOLD='#F4B63F'; LIME='#C8D43B'; SEA='#2F6FA8'; SKY='#A8D0E6'; LEAF='#3F6B4A'; PINK='#EE9C93'
def logo(cx,cy,w,ink=INK,ball=LIME):
    s=w/502
    return f'<g transform="translate({cx},{cy}) scale({s:.4f}) translate(-539,-450)"><path fill="{ink}" fill-rule="evenodd" d="{RK}"/><circle cx="539.4" cy="636.4" r="43" fill="{ball}"/></g>'
DEFS=f'''<style>
@font-face{{font-family:BO;src:url({F}BowlbyOne-Regular.ttf)}}
@font-face{{font-family:PA;src:url({F}Pacifico-Regular.ttf)}}
@font-face{{font-family:AB;src:url({F}ArchivoBlack-Regular.ttf)}}
@font-face{{font-family:FR;src:url({F}Fraunces-Italic.ttf)}}
.bo{{font-family:BO}}.pa{{font-family:PA}}.ab{{font-family:AB}}.fr{{font-family:FR;font-variation-settings:'wght' 900,'SOFT' 100,'WONK' 1,'opsz' 144}}
</style>
<filter id="rough" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="5" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="wear" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="3" seed="11" result="n"/>
<feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="2" result="m"/><feComposite in="n" in2="m" operator="arithmetic" k2="0.75" k3="0.55" k4="-0.12" result="nm"/>
<feComponentTransfer in="nm" result="mask"><feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 0 0"/></feComponentTransfer>
<feComposite in="SourceGraphic" in2="mask" operator="in"/></filter>'''
def svg(w,h,body):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}"><defs>{DEFS}</defs><g filter="url(#wear)"><g filter="url(#rough)">{body}</g></g></svg>'
def P(x,y): return f'{x:.1f},{y:.1f}'

# ---- petits signes au trait (même épaisseur que le logo) ----
SW=7
def s_sun(x,y,s):
    g=f'<circle cx="{x}" cy="{y}" r="{s*.22:.1f}" fill="{SUN}" stroke="{INK}" stroke-width="{SW}"/>'
    for i in range(8):
        a=i*math.pi/4; g+=f'<line x1="{x+s*.34*math.cos(a):.1f}" y1="{y+s*.34*math.sin(a):.1f}" x2="{x+s*.5*math.cos(a):.1f}" y2="{y+s*.5*math.sin(a):.1f}" stroke="{INK}" stroke-width="{SW}" stroke-linecap="round"/>'
    return g
def s_wave(x,y,s):
    g=''
    for dy,c in ((-s*.13,SEA),(s*.15,INK)):
        d=f'M{P(x-s*.48,y+dy)}'
        for i in range(3): d+=f' q{s*.08:.1f},{-s*.17:.1f} {s*.16:.1f},0 t{s*.16:.1f},0'
        g+=f'<path d="{d}" fill="none" stroke="{c}" stroke-width="{SW}" stroke-linecap="round"/>'
    return g
def s_spark(x,y,s,c=GOLD):
    r=s*.5; q=s*.09
    return f'<path d="M{P(x,y-r)} Q{P(x+q,y-q)} {P(x+r,y)} Q{P(x+q,y+q)} {P(x,y+r)} Q{P(x-q,y+q)} {P(x-r,y)} Q{P(x-q,y-q)} {P(x,y-r)}Z" fill="{c}" stroke="{INK}" stroke-width="{SW*.8}" stroke-linejoin="round"/>'
def s_flower(x,y,s):
    g=''
    for i in range(5):
        g+=f'<ellipse cx="{x}" cy="{y-s*.24:.1f}" rx="{s*.15:.1f}" ry="{s*.22:.1f}" fill="{PINK}" stroke="{INK}" stroke-width="{SW*.8}" transform="rotate({i*72} {x} {y})"/>'
    return g+f'<circle cx="{x}" cy="{y}" r="{s*.11:.1f}" fill="{GOLD}" stroke="{INK}" stroke-width="{SW*.8}"/>'

# ================= A. CLUB SOLEIL : médaillon =================
def club_soleil(V):
    c=500; b=''
    for i in range(44):
        a=i*2*math.pi/44; r2=492 if i%2==0 else 432; w=0.034
        b+=f'<path d="M{P(c+330*math.cos(a-w),c+330*math.sin(a-w))} L{P(c+r2*math.cos(a),c+r2*math.sin(a))} L{P(c+330*math.cos(a+w),c+330*math.sin(a+w))}Z" fill="{SUN}"/>'
    b+=f'<circle cx="{c}" cy="{c}" r="338" fill="{CREAM}" stroke="{INK}" stroke-width="15"/>'
    b+=f'<circle cx="{c}" cy="{c}" r="262" fill="{PAPER}" stroke="{INK}" stroke-width="8"/>'
    b+=f'<path id="tA" d="M{c-283},{c} A283,283 0 0 1 {c+283},{c}" fill="none"/><path id="bA" d="M{c-314},{c} A314,314 0 0 0 {c+314},{c}" fill="none"/>'
    b+=f'<text class="bo" font-size="54" letter-spacing="7" fill="{INK}" text-anchor="middle"><textPath href="#tA" startOffset="50%">BANDEJA CLUB</textPath></text>'
    b+=f'<text class="ab" font-size="33" letter-spacing="9" fill="{INK}" text-anchor="middle"><textPath href="#bA" startOffset="50%">PADEL · SOLEIL · VITRES</textPath></text>'
    b+=s_spark(c-300,c,44,SUN)+s_spark(c+300,c,44,SUN)
    b+=f'<circle cx="{c}" cy="{c}" r="212" fill="none" stroke="{INK}" stroke-width="3.5" stroke-dasharray="1 13" stroke-linecap="round"/>'
    b+=logo(c,c-4,262)
    for i,f in enumerate([s_sun,s_wave,s_flower,s_spark]*2):
        a=-math.pi/2+i*math.pi/4
        b+=f(round(c+214*math.cos(a),1),round(c+214*math.sin(a),1),68)
    return svg(1000,1000,b)

# ================= B. SOUVENIR : carte postale rétro =================
def souvenir(V):
    L=V['line']; b=''
    word='BANDEJA'; base=470; size=196
    txt=lambda extra: f'<text class="bo" x="500" y="{base}" font-size="{size}" text-anchor="middle" textLength="900" lengthAdjust="spacingAndGlyphs" {extra}>{word}</text>'
    b+=f'<clipPath id="wd">{txt("")}</clipPath>'
    ext=txt('fill="%s" stroke="%s" stroke-width="8"'%(INK,INK))
    for i in range(16,0,-1): b+=f'<g transform="translate({i*1.1:.1f},{i*1.1:.1f})">{ext}</g>'
    # panorama dans les lettres
    sc=f'<rect x="0" y="0" width="1000" height="1000" fill="{CREAM}"/>'
    for k,(y,col) in enumerate(((330,GOLD),(372,SUN))):
        sc+=f'<rect x="0" y="{y}" width="1000" height="{430-y}" fill="{col}"/>'
    sc+=f'<circle cx="500" cy="420" r="92" fill="{LIME}" stroke="{INK}" stroke-width="7"/><path d="M412,392 Q500,452 588,392" fill="none" stroke="{PAPER}" stroke-width="8"/>'
    sc+=f'<rect x="0" y="418" width="1000" height="80" fill="{SEA}"/>'
    for y in (436,456):
        d=f'M0,{y}'
        for i in range(30): d+=' q17,-10 34,0'
        sc+=f'<path d="{d}" fill="none" stroke="{PAPER}" stroke-width="5"/>'
    for x,y in ((180,330),(230,345),(760,320)): sc+=f'<path d="M{x-16},{y} q8,-10 16,0 q8,-10 16,0" fill="none" stroke="{INK}" stroke-width="5" stroke-linecap="round"/>'
    b+=f'<g clip-path="url(#wd)">{sc}</g>'
    b+=txt(f'fill="none" stroke="{INK}" stroke-width="8" stroke-linejoin="round"')
    b+=f'<text class="pa" x="70" y="250" font-size="96" fill="{SUN}" stroke="{INK}" stroke-width="7" paint-order="stroke" stroke-linejoin="round" transform="rotate(-7 70 250)">Souvenir du</text>'
    b+=f'<text class="pa" x="430" y="680" font-size="190" fill="{SUN}" stroke="{INK}" stroke-width="10" paint-order="stroke" stroke-linejoin="round" text-anchor="middle" transform="rotate(-6 430 640)">Club</text>'
    # timbre
    sx,sy=800,615; per=''
    for i in range(36):
        a=i*2*math.pi/36; per+=f'<circle cx="{sx+122*math.cos(a):.1f}" cy="{sy+122*math.sin(a):.1f}" r="9" fill="#000"/>'
    b+=f'<mask id="perf"><rect width="1000" height="1000" fill="#fff"/>{per}</mask>'
    b+=f'<g transform="rotate(8 {sx} {sy})"><circle cx="{sx}" cy="{sy}" r="124" fill="{CREAM}" stroke="{INK}" stroke-width="6" mask="url(#perf)"/><circle cx="{sx}" cy="{sy}" r="96" fill="none" stroke="{INK}" stroke-width="4"/>{logo(sx,sy-4,128)}</g>'
    for k in range(3):
        y=sy-70+k*24; b+=f'<path d="M{sx+20},{y} q20,-13 40,0 t40,0 t40,0 t40,0" fill="none" stroke="{INK}" stroke-width="5" stroke-linecap="round" opacity=".75"/>'
    b+=f'<text class="ab" x="500" y="800" font-size="36" letter-spacing="12" fill="{L}" text-anchor="middle">PADEL · SOLEIL · VITRES</text>'
    return svg(1000,840,b)

# ================= C. APÉRO : arche méditerranéenne =================
def palm_frond(x0,y0,ang,length,flip=1,n=12):
    """Palme : nervure courbe et folioles effilées qui retombent."""
    g=''; pts=[]
    for i in range(n+1):
        t=i/n
        x=x0+length*t*math.cos(ang)+flip*length*0.25*t*t*math.cos(ang+math.pi/2)
        y=y0+length*t*math.sin(ang)+flip*length*0.25*t*t*math.sin(ang+math.pi/2)
        pts.append((x,y))
    blades=''
    for i in range(1,n):
        x,y=pts[i]; nx,ny=pts[i+1]; dx,dy=nx-x,ny-y; m=math.hypot(dx,dy); dx,dy=dx/m,dy/m
        ll=length*(0.42*math.sin(math.pi*(0.2+0.8*i/n)))+14
        for side in (1,-1):
            px,py=-dy*side,dx*side
            bx,by=px*0.75+dx*0.45,py*0.75+dy*0.45+0.35   # direction : vers l'extérieur, vers l'avant, et qui tombe
            bm=math.hypot(bx,by); bx,by=bx/bm,by/bm
            ex,ey=x+bx*ll,y+by*ll; qx,qy=-by,bx; w=ll*0.16
            mx,my=x+bx*ll*0.45,y+by*ll*0.45
            blades+=f'<path d="M{P(x,y)} Q{P(mx+qx*w,my+qy*w)} {P(ex,ey)} Q{P(mx-qx*w,my-qy*w)} {P(x,y)}Z" fill="{LEAF}" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>'
    d='M'+' L'.join(P(*p) for p in pts)
    return blades+f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>'
def apero(V):
    L=V['line']; b=''
    ax0,ax1,acy,ar,ay1=230,770,420,270,960
    arch=f'M{ax0},{ay1} L{ax0},{acy} A{ar},{ar} 0 0 1 {ax1},{acy} L{ax1},{ay1}Z'
    b+=f'<clipPath id="ar"><path d="{arch}"/></clipPath>'
    sc=f'<rect x="0" y="0" width="1000" height="1000" fill="{CREAM}"/>'
    for i in range(18):
        a=math.pi+i*math.pi/17
        sc+=f'<path d="M500,700 L{P(500+600*math.cos(a-0.04),700+600*math.sin(a-0.04))} L{P(500+600*math.cos(a+0.04),700+600*math.sin(a+0.04))}Z" fill="{GOLD}" opacity=".55"/>'
    sc+=f'<circle cx="500" cy="700" r="150" fill="{LIME}" stroke="{INK}" stroke-width="9"/>'
    sc+=f'<path d="M360,650 Q500,760 640,650" fill="none" stroke="{PAPER}" stroke-width="13" stroke-linecap="round"/>'
    sc+=f'<rect x="0" y="700" width="1000" height="300" fill="{SEA}"/><line x1="0" y1="700" x2="1000" y2="700" stroke="{INK}" stroke-width="8"/>'
    for k,y in enumerate((735,780,830,885,940)):
        d=f'M{-20+k*15},{y}'
        for i in range(22): d+=' q24,-14 48,0'
        sc+=f'<path d="{d}" fill="none" stroke="{SKY if k%2 else PAPER}" stroke-width="7" stroke-linecap="round"/>'
    for x,y,s in ((330,330,1),(380,300,.8),(660,360,.9)):
        sc+=f'<path d="M{x-18*s},{y} q{9*s},{-12*s} {18*s},0 q{9*s},{-12*s} {18*s},0" fill="none" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>'
    sc+=palm_frond(200,170,0.45,300,1)+palm_frond(800,170,math.pi-0.45,300,-1)+palm_frond(190,290,0.1,200,1)
    b+=f'<g clip-path="url(#ar)">{sc}</g>'
    b+=f'<path d="{arch}" fill="none" stroke="{INK}" stroke-width="16" stroke-linejoin="round"/>'
    o=24; b+=f'<path d="M{ax0-o},{ay1+o} L{ax0-o},{acy} A{ar+o},{ar+o} 0 0 1 {ax1+o},{acy} L{ax1+o},{ay1+o}Z" fill="none" stroke="{L}" stroke-width="6" stroke-linejoin="round"/>'
    b+=f'<circle cx="500" cy="150" r="78" fill="{CREAM}" stroke="{INK}" stroke-width="10"/>'+logo(500,148,100)
    b+=f'<text class="fr" x="500" y="1095" font-size="118" fill="{L}" text-anchor="middle">Soleil, padel</text>'
    b+=f'<text class="fr" x="500" y="1215" font-size="118" fill="{SUN if L==INK else GOLD}" text-anchor="middle">&amp; apéro.</text>'
    b+=f'<text class="ab" x="500" y="1290" font-size="32" letter-spacing="14" fill="{L}" text-anchor="middle">BANDEJA CLUB</text>'
    return svg(1000,1320,b)

# ---- cœur ----
def coeur_soleil(V):
    c=200; b=''
    for i in range(28):
        a=i*2*math.pi/28; r2=190 if i%2==0 else 160; w=0.06
        b+=f'<path d="M{P(c+118*math.cos(a-w),c+118*math.sin(a-w))} L{P(c+r2*math.cos(a),c+r2*math.sin(a))} L{P(c+118*math.cos(a+w),c+118*math.sin(a+w))}Z" fill="{SUN}"/>'
    b+=f'<circle cx="{c}" cy="{c}" r="122" fill="{CREAM}" stroke="{INK}" stroke-width="10"/>'+logo(c,c-2,150)
    return svg(400,400,b)
def coeur_script(V):
    L=V['line']
    return svg(600,300,logo(300,95,150,L)+f'<text class="pa" x="300" y="265" font-size="74" fill="{L}" text-anchor="middle">Bandeja Club</text>')

designs={'club-soleil':(club_soleil,coeur_soleil),'souvenir':(souvenir,coeur_script),'apero':(apero,coeur_script)}
VAR={'clair':dict(line=INK),'fonce':dict(line=CREAM)}
os.makedirs('svg2',exist_ok=True)
for n,(fd,fc) in designs.items():
    for v,V in VAR.items():
        open(f'svg2/{n}-dos-{v}.svg','w').write(fd(V))
        open(f'svg2/{n}-coeur-{v}.svg','w').write(fc(V))
print('ok')
