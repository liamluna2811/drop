import numpy as np
from PIL import Image, ImageFilter
from scipy.ndimage import gaussian_filter, map_coordinates
def comp(photo, txt, out):
    ph=np.asarray(Image.open(photo).convert('RGB')).astype(np.float32)/255
    t=np.asarray(Image.open(txt).convert('RGBA')).astype(np.float32)/255
    L=ph.mean(2)
    # relief du tissu : grandes ombres (plis) + fin grain
    Lb=gaussian_filter(L,6)
    a=t[...,3]; m=a>0.05
    ref=np.median(Lb[gaussian_filter(a,25)>0.02])
    shade=np.clip(Lb/ref,0.55,1.12)
    grain=np.clip(1+(L-gaussian_filter(L,1.5))*2.2,0.85,1.15)
    # déformation suivant les plis
    gy,gx=np.gradient(gaussian_filter(L,10))
    yy,xx=np.mgrid[0:L.shape[0],0:L.shape[1]].astype(np.float32)
    k=60
    warp=lambda c: map_coordinates(c,[yy-gy*k,xx-gx*k],order=1,mode='constant')
    tw=np.stack([warp(t[...,i]) for i in range(4)],-1)
    a=gaussian_filter(tw[...,3],0.6)*0.93
    ink=tw[...,:3]
    # encre posée sur le tissu : légère transparence, prend la couleur du t-shirt (multiplication)
    printed=(ink*0.9+ph*0.1)*shade[...,None]*grain[...,None]
    o=ph*(1-a[...,None])+printed*a[...,None]
    Image.fromarray((np.clip(o,0,1)*255+.5).astype(np.uint8)).save(out,quality=94)
comp('a/sun-b-man-pink-clean.jpg','txt-sun.png','a/sun-b-man-pink-perso.jpg')
comp('a/clubp-b-man-blue-clean.jpg','txt-club.png','a/clubp-b-man-blue-perso.jpg')
