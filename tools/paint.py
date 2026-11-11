# Procedural oil-painting placeholders -> public/art/<kind>.png  (python3 tools/paint.py)
import numpy as np, math, sys
from PIL import Image, ImageDraw, ImageFilter
from scipy.ndimage import gaussian_filter as gf
W,H=480,288; K=W/400; rng=np.random.default_rng(7)
hx=lambda s:tuple(int(s[i:i+2],16) for i in (1,3,5))
MOOD={ # sky top, sky bottom, far, mid, near, ground, figure, sun
'night':('#0B1F24','#E9744A','#1B4A4C','#123A38','#0C2A2C','#081A1E','#F3E9D2','#F6CF6E'),
'dawn':('#9FC7C9','#FBE3B8','#8DB7A8','#4F8E7B','#2F6B5A','#244E44','#0E2A2E','#F0B93B'),
'dusk':('#2B2A5E','#F4885A','#5B4A7A','#2F3F63','#1D3050','#10202F','#FCE9C4','#FFD36B')}
def ramp(a,b,n):return np.linspace(a,b,n)[:,None]
def ridge(seed,base,amp,k):
    xs=np.arange(W);t=xs/K
    return base-amp*(np.sin(t*.017*k+seed)+.55*np.sin(t*.043*k+seed*2.3)+.25*np.sin(t*.11*k+seed))
def fig(d,t,x,y,s,c):
    u=K*s;ln=max(3,int(3.4*u*1.5));P=lambda *p:[(x+p[i]*u,y+p[i+1]*u) for i in range(0,len(p),2)]
    if t=='c':
        for cx in(-22,22):d.ellipse([x+(cx-12)*u,y-24*u,x+(cx+12)*u,y],outline=c,width=ln)
        d.line(P(-22,-12,-6,-32,14,-32,22,-12,-2,-12,-22,-12),fill=c,width=ln);d.line(P(-4,-36,8,-54,18,-38),fill=c,width=ln)
        d.line(P(-4,-36,4,-22,-2,-12),fill=c,width=ln);d.ellipse([x+6*u,y-68*u,x+18*u,y-56*u],fill=c)
    elif t=='r':
        d.ellipse([x-4*u,y-62*u,x+8*u,y-50*u],fill=c);d.line(P(0,-50,-5,-30,6,-20,2,-8),fill=c,width=ln)
        d.line(P(-5,-30,-14,-20,-22,-24),fill=c,width=ln);d.line(P(0,-46,10,-42,14,-50),fill=c,width=ln)
    elif t=='p':
        d.ellipse([x-6*u,y-50*u,x+6*u,y-38*u],fill=c);d.polygon(P(-9,0,-6,-36,6,-36,9,0),fill=c)
    elif t=='t':d.polygon(P(-28,0,0,-38,28,0),fill=c);d.polygon(P(-7,0,0,-17,7,0),fill=hx('#081A1E'))
    elif t=='n':
        for q,h in((0,62),(0,44)):d.polygon(P(0,-h,18,-h*.55+4,-18,-h*.55+4),fill=c)
        d.rectangle(P(-3,-14,3,0),fill=c)
    elif t=='h':
        d.ellipse([x-26*u,y-45*u,x+26*u,y-23*u],fill=c);d.line(P(20,-40,32,-60,46,-54),fill=c,width=ln+2)
        for lx in(-16,-8,10,20):d.line(P(lx,-26,lx+2,0),fill=c,width=ln)
    elif t=='m':
        for cx in(-24,24):d.ellipse([x+(cx-11)*u,y-22*u,x+(cx+11)*u,y],outline=c,width=ln)
        d.line(P(-24,-11,-8,-26,12,-26,24,-11),fill=c,width=ln);d.ellipse([x-4*u,y-58*u,x+8*u,y-46*u],fill=c)
    elif t=='o':d.polygon(P(-32,-6,0,-60,32,-6),fill=c);d.rectangle(P(-44,-6,44,1),fill=hx('#EAD9B5'))
    elif t=='d':
        d.rectangle(P(-44,-26,-16,0),fill=c);d.rectangle(P(-14,-40,14,0),fill=c);d.rectangle(P(16,-16,44,0),fill=c)
def paint(kind,mood,sx,sy,sr,a,sea=0,city=0,mist=0):
    m=[hx(v) for v in MOOD[mood]];top,bot,far,mid,near,gnd,fg,sun=m
    img=np.zeros((H,W,3));t=ramp(0,1,H)**1.3
    img[:]=np.array(top)*(1-t[:,:,None])+np.array(bot)*t[:,:,None]
    yy,xx=np.mgrid[0:H,0:W];r=np.hypot(xx-sx*W,yy-sy*H)
    img+=np.clip(1-r/(sr*W*5),0,1)[:,:,None]**2*np.array(sun)*.55
    img=np.where((r<sr*W)[:,:,None],np.array(sun),img)
    def fill(path,c,fade=0):
        nonlocal img;mk=yy>path[None,:];col=np.array(c)*(1-fade)+np.array(bot)*fade
        img=np.where(mk[:,:,None],col,img)
    fill(ridge(len(kind),.60*H,.2*H,1),far,.45);fill(ridge(len(kind)+2,.74*H,.12*H,1.4),mid,.1)
    if city:
        x=10*K;i=0
        while x<W:
            w=(18+((i*7+city)%5)*5)*K;h=(40+((i*29+city*13)%70))*K;img[int(.83*H-h):int(.83*H),int(x):int(x+w)]=np.array(near)*.9+np.array(bot)*.1;x+=w+4*K;i+=1
    if sea:fill(np.full(W,.70*H)+np.sin(np.arange(W)/9)*2,near,.25);img[int(.7*H):int(.83*H)]+=(np.array(sun)*.18*(gf(rng.random((int(.83*H)-int(.7*H),W)),(0.6,25))>.52)[:,:,None])
    fill(np.full(W,.83*H),gnd)
    pil=Image.fromarray(np.clip(img,0,255).astype('uint8'));ov=Image.new('RGBA',(W,H));d=ImageDraw.Draw(ov)
    if mist:
        for k in range(3):d.ellipse([W*(.15+.2*k),.5*H,W*(.55+.2*k),.62*H],fill=(255,245,230,46))
    for i,(tp,x,s) in enumerate(a):
        c=fg if mood!='dawn' else hx('#0E2A2E')
        if i%3==2:c=hx('#F2663C')
        fig(d,tp,x*W,.88*H+(i%2)*6,s,c)
    pil=Image.alpha_composite(pil.convert('RGBA'),ov.filter(ImageFilter.GaussianBlur(.6))).convert('RGB')
    pil=pil.filter(ImageFilter.MedianFilter(5));a=np.asarray(pil).astype(float)
    pil2=pil.filter(ImageFilter.GaussianBlur(1.1));a=a*.4+np.asarray(pil2)*.6
    sel=gf(rng.random((H,W)),30)>.5
    h=np.where(sel,gf(rng.standard_normal((H,W)),(.9,7)),gf(rng.standard_normal((H,W)),(7,.9)))
    h=h/np.std(h)+.6*gf(rng.standard_normal((H,W)),(2,2))/.25*.25
    gy,gx=np.gradient(gf(h,.8));a*=(1+.07*(-gx-gy))[:,:,None]
    a+=gf(rng.standard_normal((H,W,1)),(14,14,0))*38*np.array([1,.8,.7])+ (np.sin(xx*1.9)*np.sin(yy*1.9)*3)[:,:,None]
    a*=(1-.28*(np.hypot(xx-W/2,yy-H/2)/np.hypot(W/2,H/2))**2.2)[:,:,None]
    im=Image.fromarray(np.clip(a,0,255).astype('uint8')).quantize(128,dither=Image.Dither.NONE)
    im.save(f'public/art/{kind}.png',optimize=True)
S=lambda *x:list(x)
SC={
'hero':('night',.74,.30,.075,S(('n',.08,1.2),('n',.93,1.4),('c',.32,1.5),('c',.52,1.25),('r',.74,1.25))),
'kids':('dawn',.8,.26,.07,S(('r',.27,1),('r',.42,.85),('c',.65,1),('n',.1,.8))),
'school':('dawn',.17,.26,.07,S(('t',.3,1.4),('t',.52,1.1),('n',.8,1.2),('p',.68,.9))),
'riders':('dusk',.22,.3,.07,S(('c',.3,1.4),('c',.54,1.2),('c',.75,1))),
'family':('dawn',.82,.24,.065,S(('p',.3,1.2),('p',.38,.8),('p',.45,1.1),('t',.7,1.2))),
'seniors':('dawn',.8,.28,.075,S(('p',.35,1.4),('p',.54,1.4),('n',.83,1.1))),
'corporate':('night',.82,.3,.06,S(('t',.28,1.3),('p',.5,1.1),('p',.59,1.1),('p',.68,1.1))),
'ocean':('dusk',.52,.4,.1,S(('c',.3,1.3),('c',.62,1.1)),1),
'hills':('dawn',.22,.28,.065,S(('n',.22,1.1),('n',.33,1.5),('n',.75,1.2),('c',.54,1.1)),0,0,1),
'hills2':('night',.75,.26,.065,S(('n',.15,1.4),('n',.85,1.2),('r',.5,1.2)),0,0,1),
'valley':('dawn',.82,.27,.075,S(('t',.25,1.2),('t',.4,1),('n',.75,1.3),('c',.6,1))),
'podium':('dusk',.22,.3,.065,S(('d',.52,1.7))),
'oath':('dawn',.5,.33,.09,S(('p',.22,1.1),('p',.37,1.3),('p',.54,1.2),('p',.7,1.3),('p',.84,1))),
'wild':('dawn',.8,.27,.07,S(('c',.28,1.3),('h',.65,1.4))),
'hawk':('night',.78,.28,.075,S(('h',.4,1.7),('c',.78,1))),
'estate':('dusk',.78,.38,.085,S(('o',.38,1.7),('n',.68,1.4)),1),
'glamp':('night',.82,.24,.05,S(('t',.25,1.5),('t',.5,1.8),('t',.75,1.4))),
'games':('dawn',.17,.26,.065,S(('p',.28,1.1),('p',.36,1.1),('p',.64,1.1),('p',.73,1.1))),
'trek':('night',.22,.25,.06,S(('p',.4,1.4),('p',.55,1.4),('n',.83,1.3)),0,0,1),
'moto':('dawn',.8,.25,.07,S(('m',.33,1.5),('m',.65,1.3))),
'equestrian':('dawn',.2,.26,.065,S(('h',.35,1.6),('h',.68,1.3))),
'stories':('night',.5,.38,.085,S(('c',.5,1.5))),
'city0':('dawn',.82,.24,.06,S(('r',.38,1.1),('c',.65,1),),0,3),
'city1':('night',.2,.26,.06,S(('c',.4,1.1),('r',.68,1.1)),0,3),
'city2':('dusk',.5,.3,.07,S(('r',.3,1.1),('r',.48,1),('c',.7,1)),0,6)}
for k,v in SC.items():
    if len(sys.argv)>1 and k not in sys.argv[1:]:continue
    W,H=(640,384) if k=='hero' else (480,288);K=W/400;mood,sx,sy,sr,a=v[:5];e=v[5:]+(0,)*3;paint(k,mood,sx,sy,sr,a,e[0],e[1],e[2])
    print(k,end=' ',flush=True)
