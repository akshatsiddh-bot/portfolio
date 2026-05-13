/* eslint-disable */
import { Renderer, Program, Mesh, Triangle } from "ogl";
import { useEffect, useRef } from "react";

/**
 * Galaxy — atmospheric starfield shader (OGL).
 * Adapted from React Bits — kept slow, cool-toned, cinematic.
 */
type Props = {
  mouseRepulsion?: boolean;
  mouseInteraction?: boolean;
  density?: number;
  glowIntensity?: number;
  saturation?: number;
  hueShift?: number;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  repulsionStrength?: number;
  starSpeed?: number;
  transparent?: boolean;
  className?: string;
};

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position, 0., 1.); }
`;

const fragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uMouseActiveFactor;
uniform float uStarSpeed;
uniform float uDensity;
uniform float uHueShift;
uniform float uSaturation;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uRepulsionStrength;
uniform float uGlowIntensity;
uniform float uMouseRepulsion;
uniform float uAutoCenterRepulsion;
uniform float uTransparent;
varying vec2 vUv;

#define NUM_LAYER 4.0
#define STAR_COLOR_CUTOFF 0.2
#define MAT45 mat2(0.7071,-0.7071,0.7071,0.7071)
#define PERIOD 3.0

float Hash21(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float tri(float x){ return abs(fract(x)*2.0 - 1.0); }
float tris(float x){ float t = fract(x); return 1.0 - smoothstep(0.0,1.0,abs(2.0*t - 1.0)); }
float trisn(float x){ float t = fract(x); return 2.0*(1.0 - smoothstep(0.0,1.0,abs(2.0*t - 1.0))) - 1.0; }
vec3 hsv2rgb(vec3 c){ vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0); vec3 p = abs(fract(c.xxx + K.xyz)*6.0 - K.www); return c.z*mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y); }

float Star(vec2 uv, float flare){
  float d = length(uv);
  float m = (0.05*uGlowIntensity)/d;
  float rays = max(0.0, 1.0 - abs(uv.x*uv.y*1000.0));
  m += rays*flare*uGlowIntensity;
  uv *= MAT45;
  rays = max(0.0, 1.0 - abs(uv.x*uv.y*1000.0));
  m += rays*0.3*flare*uGlowIntensity;
  m *= smoothstep(1.0, 0.2, d);
  return m;
}

vec3 StarLayer(vec2 uv){
  vec3 col = vec3(0.0);
  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);
  for(int y=-1;y<=1;y++){
    for(int x=-1;x<=1;x++){
      vec2 offset = vec2(float(x), float(y));
      vec2 si = id + offset;
      float seed = Hash21(si);
      float size = fract(seed*345.32);
      float glossLocal = tri(uStarSpeed/(PERIOD*seed+1.0));
      float flareSize = smoothstep(0.9, 1.0, size)*glossLocal;
      float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si+1.0)) + STAR_COLOR_CUTOFF;
      float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si+3.0)) + STAR_COLOR_CUTOFF;
      float grn = min(red, blu)*seed;
      vec3 base = vec3(red, grn, blu);
      float hue = atan(base.g - base.r, base.b - base.r)/(2.0*3.14159) + 0.5;
      hue = fract(hue + uHueShift/360.0);
      float sat = length(base - vec3(dot(base, vec3(0.299,0.587,0.114))))*uSaturation;
      float val = max(max(base.r, base.g), base.b);
      base = hsv2rgb(vec3(hue, sat, val));
      vec2 pad = vec2(tris(seed*34.0 + uTime*uStarSpeed/10.0), tris(seed*38.0 + uTime*uStarSpeed/30.0)) - 0.5;
      float star = Star(gv - offset - pad, flareSize);
      vec3 color = base;
      float twinkle = trisn(uTime*uStarSpeed + seed*6.2831)*0.5 + 1.0;
      twinkle = mix(1.0, twinkle, uTwinkleIntensity);
      star *= twinkle;
      col += star*size*color;
    }
  }
  return col;
}

void main(){
  vec2 focalPx = uResolution.xy*0.5;
  vec2 uv = (vUv*uResolution.xy - focalPx)/uResolution.y;

  vec2 mouseNorm = uMouse - vec2(0.5);
  if(uAutoCenterRepulsion > 0.0){
    vec2 toCenter = -uv;
    float dC = length(toCenter);
    if(dC > 0.0){ float pull = (uAutoCenterRepulsion/(dC + 0.1))*0.02; uv += normalize(toCenter)*pull; }
  } else if(uMouseRepulsion > 0.0){
    vec2 mw = (uMouse*uResolution.xy - focalPx)/uResolution.y;
    vec2 toMouse = uv - mw;
    float dM = length(toMouse);
    if(dM > 0.0){ float push = (uRepulsionStrength/(dM + 0.1))*0.02*uMouseActiveFactor; uv += normalize(toMouse)*push; }
  } else { vec2 mouseOffset = mouseNorm*0.1*uMouseActiveFactor; uv += mouseOffset; }

  float autoRotAngle = uTime*uRotationSpeed;
  mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
  uv = autoRot*uv;
  uv = mat2(cos(uTime*0.0), sin(uTime*0.0), -sin(uTime*0.0), cos(uTime*0.0))*uv;

  vec3 col = vec3(0.0);
  for(float i=0.0;i<1.0;i+=1.0/NUM_LAYER){
    float depth = fract(i + uStarSpeed*0.1);
    float scale = mix(20.0*uDensity, 0.5*uDensity, depth);
    float fade = depth*smoothstep(1.0, 0.9, depth);
    col += StarLayer(uv*scale + i*453.32)*fade;
  }

  if(uTransparent > 0.5){
    float alpha = length(col); alpha = smoothstep(0.0, 0.3, alpha); alpha = min(alpha, 1.0);
    gl_FragColor = vec4(col, alpha);
  } else {
    gl_FragColor = vec4(col, 1.0);
  }
}
`;

export default function Galaxy({
  mouseRepulsion = true,
  mouseInteraction = true,
  density = 1.2,
  glowIntensity = 0.35,
  saturation = 0.4,
  hueShift = 210,
  twinkleIntensity = 0.2,
  rotationSpeed = 0.05,
  repulsionStrength = 1.5,
  starSpeed = 0.3,
  transparent = true,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctn = ref.current;
    if (!ctn) return;
    const renderer = new Renderer({
      alpha: transparent,
      premultipliedAlpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    const gl = renderer.gl;
    if (transparent) { gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); gl.clearColor(0, 0, 0, 0); }
    else gl.clearColor(0, 0, 0, 1);
    ctn.appendChild(gl.canvas);
    gl.canvas.style.width = "100%"; gl.canvas.style.height = "100%"; gl.canvas.style.display = "block";

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex, fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight, ctn.offsetWidth / ctn.offsetHeight] },
        uMouse: { value: [0.5, 0.5] },
        uMouseActiveFactor: { value: 0 },
        uStarSpeed: { value: starSpeed },
        uDensity: { value: density },
        uHueShift: { value: hueShift },
        uSaturation: { value: saturation },
        uTwinkleIntensity: { value: twinkleIntensity },
        uRotationSpeed: { value: rotationSpeed },
        uRepulsionStrength: { value: repulsionStrength },
        uGlowIntensity: { value: glowIntensity },
        uMouseRepulsion: { value: mouseRepulsion ? 1 : 0 },
        uAutoCenterRepulsion: { value: 0 },
        uTransparent: { value: transparent ? 1 : 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = ctn.offsetWidth, h = ctn.offsetHeight;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [w, h, w / h];
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(ctn);

    const target = { x: 0.5, y: 0.5 }; const smooth = { x: 0.5, y: 0.5 }; let active = 0;
    const onMove = (e: MouseEvent) => {
      const r = ctn.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height;
      active = 1;
    };
    const onLeave = () => { active = 0; };
    if (mouseInteraction) {
      ctn.addEventListener("mousemove", onMove);
      ctn.addEventListener("mouseleave", onLeave);
    }

    let raf = 0; const t0 = performance.now();
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      program.uniforms.uTime.value = (t - t0) * 0.001;
      smooth.x += (target.x - smooth.x) * 0.05;
      smooth.y += (target.y - smooth.y) * 0.05;
      program.uniforms.uMouse.value = [smooth.x, smooth.y];
      program.uniforms.uMouseActiveFactor.value += (active - program.uniforms.uMouseActiveFactor.value) * 0.05;
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect();
      if (mouseInteraction) { ctn.removeEventListener("mousemove", onMove); ctn.removeEventListener("mouseleave", onLeave); }
      try { ctn.removeChild(gl.canvas); } catch {}
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [mouseRepulsion, mouseInteraction, density, glowIntensity, saturation, hueShift, twinkleIntensity, rotationSpeed, repulsionStrength, starSpeed, transparent]);

  return <div ref={ref} className={`absolute inset-0 ${className}`} />;
}
