import numpy as np, potrace
from PIL import Image
im=Image.open('/home/user/drop/shopify/logo-bandeja-club-transparent.png').convert('RGBA')
a=np.array(im).astype(int)
# mark area only (exclude text below y~760)
a=a[:740]
r,g,b,al=a[...,0],a[...,1],a[...,2],a[...,3]
dark=(al>128)&(r<90)&(g<90)&(b<90)
lime=(al>128)&(g>150)&(r>150)&(b<120)
ys,xs=np.where(dark|lime); print('bbox',xs.min(),xs.max(),ys.min(),ys.max())
def trace(mask):
    # upscale 4x for smoother curves
    m=Image.fromarray((mask*255).astype('uint8')).resize((mask.shape[1]*4,mask.shape[0]*4),Image.LANCZOS)
    m=np.array(m)<=127
    p=potrace.Bitmap(m).trace(turdsize=20,alphamax=1.2,opticurve=True,opttolerance=0.4)
    out=[]
    for c in p:
        s=c.start_point; d=f"M{s.x/4:.2f},{s.y/4:.2f}"
        for seg in c.segments:
            if seg.is_corner: d+=f"L{seg.c.x/4:.2f},{seg.c.y/4:.2f}L{seg.end_point.x/4:.2f},{seg.end_point.y/4:.2f}"
            else: d+=f"C{seg.c1.x/4:.2f},{seg.c1.y/4:.2f} {seg.c2.x/4:.2f},{seg.c2.y/4:.2f} {seg.end_point.x/4:.2f},{seg.end_point.y/4:.2f}"
        out.append(d+"Z")
    return "".join(out)
d1=trace(dark)
ys,xs=np.where(lime); cx,cy,rad=xs.mean(),ys.mean(),(xs.max()-xs.min()+1)/2
print('ball',cx,cy,rad)
open('logo-mark.svg','w').write(f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="290 190 480 520"><path id="rk" fill-rule="evenodd" d="{d1}"/><circle id="ball" cx="{cx:.1f}" cy="{cy:.1f}" r="{rad:.1f}" fill="#C8D43C"/></svg>''')
print(len(d1))
