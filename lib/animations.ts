// lib/animations.ts — ALL animations used site-wide

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)

// PAGE TRANSITION
export const pageIn = () => {
  const el = document.getElementById("page-overlay")!
  gsap.set(el, { display: "flex" })
  return gsap.fromTo(el,
    { clipPath: "inset(100% 0% 0% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", duration: 0.65, ease: "power4.inOut" }
  )
}

export const pageOut = () => {
  const el = document.getElementById("page-overlay")!
  return gsap.to(el, {
    clipPath: "inset(0% 0% 100% 0%)",
    duration: 0.65,
    ease: "power4.inOut",
    onComplete: () => gsap.set(el, { display: "none" }),
  })
}

// CINEMATIC HEADLINE REVEAL
export const revealHeadline = (el: HTMLElement, trigger?: Element) => {
  const split = new SplitText(el, {
    type: "lines,words",
    linesClass: "clip-line",
  })
  document.querySelectorAll(".clip-line").forEach((line) => {
    (line as HTMLElement).style.overflow = "hidden"
  })
  return gsap.fromTo(split.words,
    { y: "105%", opacity: 0, rotateX: -40 },
    {
      y: "0%", opacity: 1, rotateX: 0,
      duration: 0.95, ease: "power4.out",
      stagger: 0.045,
      scrollTrigger: trigger ? {
        trigger, start: "top 82%", once: true,
      } : undefined,
      onComplete: () => split.revert(),
    }
  )
}

// 3D CARD TILT
export const initCardTilt = (card: HTMLElement) => {
  const MAX = 10
  const onMove = (e: MouseEvent) => {
    const r = card.getBoundingClientRect()
    const rY = ((e.clientX - r.left - r.width/2) / (r.width/2)) * MAX
    const rX = -((e.clientY - r.top - r.height/2) / (r.height/2)) * MAX
    gsap.to(card, { rotateX: rX, rotateY: rY, transformPerspective: 700, duration: 0.35, ease: "power2.out" })
    const shine = card.querySelector<HTMLElement>(".card-shine")
    if (shine) {
      const pX = ((e.clientX - r.left) / r.width) * 100
      const pY = ((e.clientY - r.top) / r.height) * 100
      shine.style.background = `radial-gradient(circle at ${pX}% ${pY}%, rgba(255,255,255,0.12) 0%, transparent 55%)`
    }
  }
  const onLeave = () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" })
    const shine = card.querySelector<HTMLElement>(".card-shine")
    if (shine) shine.style.background = "transparent"
  }
  card.style.transformStyle = "preserve-3d"
  card.style.willChange = "transform"
  card.addEventListener("mousemove", onMove)
  card.addEventListener("mouseleave", onLeave)
  return () => {
    card.removeEventListener("mousemove", onMove)
    card.removeEventListener("mouseleave", onLeave)
  }
}

// MAGNETIC BUTTON
export const initMagnetic = (btn: HTMLElement) => {
  const STRENGTH = 0.28
  const onMove = (e: MouseEvent) => {
    const r = btn.getBoundingClientRect()
    const dX = (e.clientX - (r.left + r.width/2)) * STRENGTH
    const dY = (e.clientY - (r.top + r.height/2)) * STRENGTH
    gsap.to(btn, { x: dX, y: dY, duration: 0.35, ease: "power2.out" })
  }
  const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.35)" })
  btn.addEventListener("mousemove", onMove)
  btn.addEventListener("mouseleave", onLeave)
  return () => {
    btn.removeEventListener("mousemove", onMove)
    btn.removeEventListener("mouseleave", onLeave)
  }
}

// HORIZONTAL SCROLL (Process Section)
export const initHorizontalScroll = (section: HTMLElement, track: HTMLElement) => {
  if (window.innerWidth < 1024) return
  gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${track.scrollWidth - window.innerWidth}`,
      scrub: 1.2,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  })
}

// COUNTER ANIMATION
export const animateCounter = (el: HTMLElement, target: number, suffix = "") => {
  const obj = { v: 0 }
  gsap.to(obj, {
    v: target, duration: 2.2, ease: "power3.out",
    snap: { v: 1 },
    onUpdate: () => { el.textContent = Math.round(obj.v) + suffix },
    scrollTrigger: { trigger: el, start: "top 82%", once: true },
  })
}

// SERVICE ROW HOVER
export const initServiceRow = (row: HTMLElement) => {
  const bg = row.querySelector<HTMLElement>(".row-bg")!
  const name = row.querySelector<HTMLElement>(".row-name")!
  const arrow = row.querySelector<HTMLElement>(".row-arrow")!
  const desc = row.querySelector<HTMLElement>(".row-desc")!
  const icon = row.querySelector<HTMLElement>(".row-icon")!
  const tl = gsap.timeline({ paused: true })
  tl
    .to(bg, { clipPath: "inset(0 0% 0 0)", duration: 0.38, ease: "power2.out" })
    .to([name], { color: "#E8156D", x: 8, duration: 0.2 }, 0)
    .to(arrow, { rotation: -45, color: "#E8156D", duration: 0.28, ease: "back.out(2)" }, 0)
    .to(icon, { scale: 1.3, opacity: 1, rotation: 360, duration: 0.5, ease: "back.out(1.5)" }, 0)
    .fromTo(desc, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.25 }, 0.18)
  row.addEventListener("mouseenter", () => tl.play())
  row.addEventListener("mouseleave", () => tl.reverse())
}

// STAGGERED CARD ENTRANCE
export const staggerCards = (cards: NodeListOf<Element> | HTMLElement[]) => {
  gsap.fromTo(cards,
    { y: 70, opacity: 0, rotateX: -15, scale: 0.96, transformPerspective: 500 },
    {
      y: 0, opacity: 1, rotateX: 0, scale: 1,
      duration: 0.85, ease: "power3.out",
      stagger: { amount: 0.55, ease: "power2.out" },
      scrollTrigger: { trigger: cards[0], start: "top 85%", once: true },
    }
  )
}

// SVG PATH DRAW (Process connecting line)
export const drawPath = (path: SVGPathElement) => {
  const len = path.getTotalLength()
  gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
  gsap.to(path, {
    strokeDashoffset: 0, ease: "none",
    scrollTrigger: {
      trigger: path,
      start: "top 75%",
      end: "bottom 25%",
      scrub: true,
    },
  })
}

// PARALLAX LAYERS
export const initParallax = () => {
  gsap.utils.toArray("[data-parallax]").forEach((el) => {
    const speed = (el as HTMLElement).dataset.parallax || "20"
    gsap.to(el as HTMLElement, {
      yPercent: -parseFloat(speed),
      ease: "none",
      scrollTrigger: {
        trigger: el as HTMLElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
  })
}

// PAGE BACKGROUND COLOR MORPH
export const initColorMorph = () => {
  [
    ["#hero", "#0A0A0A"],
    ["#services", "#FAF9F7"],
    ["#portfolio", "#0F0F0F"],
    ["#about-snap", "#0F0F0F"],
    ["#process", "#FAF9F7"],
    ["#honest-board", "#F2E8D9"],
    ["#testimonials", "#FAF9F7"],
    ["#cta", "#E8156D"],
  ].forEach(([selector, color]) => {
    const el = document.querySelector(selector)
    if (!el) return
    ScrollTrigger.create({
      trigger: el,
      start: "top 55%",
      onEnter: () => gsap.to("body", { backgroundColor: color, duration: 0.9, ease: "power2.inOut" }),
      onEnterBack: () => gsap.to("body", { backgroundColor: color, duration: 0.9, ease: "power2.inOut" }),
    })
  })
}

// LIQUID IMAGE HOVER
export const initLiquidHover = (container: HTMLElement) => {
  const img = container.querySelector("img")!
  container.addEventListener("mouseenter", () =>
    gsap.to(img, { scale: 1.07, filter: "brightness(1.05)", duration: 0.6, ease: "power2.out" })
  )
  container.addEventListener("mousemove", (e) => {
    const r = container.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10
    const y = ((e.clientY - r.top) / r.height - 0.5) * 10
    gsap.to(img, { x, y, duration: 0.4, ease: "power2.out" })
  })
  container.addEventListener("mouseleave", () =>
    gsap.to(img, { scale: 1, x: 0, y: 0, filter: "brightness(1)", duration: 0.6, ease: "power2.out" })
  )
}

// GLITCH TEXT
export const glitchText = (el: HTMLElement) => {
  const original = el.innerText
  const chars = "!@#$%^&*<>{}[]ABCDEFGHIJabcdef0123456789"
  let frame = 0
  const interval = setInterval(() => {
    el.innerText = original.split("").map((c, i) => {
      if (c === " ") return " "
      if (i < frame * 0.6) return original[i]
      return chars[Math.floor(Math.random() * chars.length)]
    }).join("")
    frame++
    if (frame > original.length * 1.7) {
      el.innerText = original
      clearInterval(interval)
    }
  }, 38)
}

// RIPPLE ON CLICK
export const addRipple = (btn: HTMLElement) => {
  btn.addEventListener("click", (e) => {
    const r = btn.getBoundingClientRect()
    const size = Math.max(r.width, r.height) * 2
    const ripple = document.createElement("span")
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${size}px; height:${size}px;
      left:${(e as MouseEvent).clientX - r.left - size/2}px;
      top:${(e as MouseEvent).clientY - r.top - size/2}px;
      background:rgba(255,255,255,0.35); transform:scale(0);
    `
    btn.appendChild(ripple)
    gsap.to(ripple, {
      scale: 1, opacity: 0, duration: 0.75, ease: "power2.out",
      onComplete: () => ripple.remove(),
    })
  })
}

// MORPHING BLOB
export const initMorphingBlob = (path: SVGPathElement) => {
  const shapes = [
    "M 150 0 C 220 20,280 50,300 150 C 320 250,280 320,200 350 C 120 380,40 340,20 250 C 0 160,40 60,100 20 Z",
    "M 170 10 C 250 0,310 80,290 170 C 270 260,200 330,120 310 C 40 290,-10 210,20 130 C 50 50,90 20,170 10 Z",
    "M 140 20 C 230 -10,300 70,310 160 C 320 250,260 340,170 350 C 80 360,10 290,0 200 C -10 110,50 50,140 20 Z",
  ]
  let i = 0
  const morph = () => {
    i = (i + 1) % shapes.length
    gsap.to(path, { attr: { d: shapes[i] }, duration: 3.5, ease: "power2.inOut", onComplete: morph })
  }
  morph()
}
