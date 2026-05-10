import Phaser from 'phaser'

const COLORS = {
  bg: 0x050b14,
  panel: 0x0a1525,
  border: 0x1d3458,
  cyan: 0x6bcce8,
  cyanBright: 0xb6e3f4,
  cyanDeep: 0x3aa9d4,
  red: 0xef4444,
  orange: 0xf59e0b,
  purple: 0xa855f7,
  yellow: 0xfde047,
  green: 0x22d3ee,
  mfa: 0x10b981,
  white: 0xffffff,
  dark: 0x050b14,
}

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot')
  }

  create() {
    this.makePlayerTexture()
    this.makeGroundTexture()
    this.makeMalwareTexture()
    this.makePhishingTexture()
    this.makeRansomwareTexture()
    this.makeKeyTexture()
    this.makeMfaTexture()
    this.makeScanlineTexture()

    this.scene.start('Game')
  }

  makePlayerTexture() {
    const g = this.add.graphics()
    const W = 32
    const H = 56

    const HOOD = 0x111827
    const HOOD_BACK = 0x0b1220
    const HOODIE = 0x1e293b
    const HOODIE_SHADE = 0x0f172a
    const PANTS = 0x0f172a
    const BOOTS = 0x000000
    const SKIN = 0xfcd9b6
    const SKIN_SHADE = 0xc69977
    const VISOR = 0x06b6d4
    const VISOR_HI = 0x67e8f9
    const NEON = 0xec4899
    const NEON_HI = 0xf9a8d4
    const TECH = 0x6bcce8

    const px = (x, y, w, h, color) => {
      g.fillStyle(color, 1)
      g.fillRect(x, y, w, h)
    }

    // HOOD (side profile, facing right)
    // back of hood pulled up, drapes behind head
    px(4, 6, 14, 4, HOOD)
    px(2, 8, 18, 4, HOOD)
    px(0, 10, 4, 6, HOOD_BACK)    // back drape
    px(2, 12, 20, 8, HOOD)
    px(4, 18, 18, 4, HOOD)

    // FACE (peeking out on the right side of hood)
    px(14, 10, 10, 4, SKIN)        // forehead
    px(14, 14, 12, 2, SKIN)        // upper face
    px(24, 14, 2, 2, SKIN_SHADE)   // nose tip
    px(14, 18, 10, 2, SKIN_SHADE)  // jaw shadow
    px(14, 20, 8, 2, SKIN_SHADE)   // chin

    // VISOR (one band across face, slight extension past hood)
    px(14, 13, 12, 3, VISOR)
    px(14, 13, 12, 1, VISOR_HI)
    px(24, 14, 4, 2, VISOR_HI)     // glowing edge

    // NEON TRIM around hood opening (where face meets hood)
    px(12, 10, 2, 12, NEON)        // vertical line
    px(12, 10, 2, 2, NEON_HI)

    // IMPLANT on visible temple
    px(20, 11, 2, 2, TECH)
    px(20, 9, 2, 2, TECH)          // small antenna stub

    // NECK
    px(16, 22, 6, 2, SKIN_SHADE)

    // HOODIE BODY (shoulders + torso)
    px(4, 24, 22, 16, HOODIE)
    px(2, 26, 2, 8, HOODIE)        // back shoulder
    px(26, 26, 2, 6, HOODIE)       // front shoulder
    // inner shadow under hood
    px(6, 26, 18, 2, HOOD)

    // ZIPPER NEON (down the front, side-view so close to right)
    px(20, 24, 2, 16, NEON)
    px(20, 24, 2, 2, NEON_HI)

    // POCKET
    px(8, 32, 14, 4, HOODIE_SHADE)

    // FRONT ARM (bent forward, hand near hip front)
    px(22, 28, 4, 6, HOODIE)       // upper arm
    px(24, 32, 6, 6, HOODIE)       // forearm
    px(24, 36, 6, 2, TECH)         // wristband
    px(26, 38, 4, 3, SKIN)         // hand

    // BACK ARM (mostly hidden, slight elbow peek)
    px(0, 28, 4, 4, HOODIE_SHADE)
    px(2, 38, 3, 3, SKIN_SHADE)    // hand peek behind hip

    // PANTS HIPS
    px(6, 40, 20, 4, PANTS)

    // STRIDE LEGS
    // back leg (pushing off, left side)
    px(4, 44, 8, 6, PANTS)
    px(2, 48, 8, 4, PANTS)
    // front leg (stepping forward, right side)
    px(16, 44, 10, 8, PANTS)
    px(18, 50, 10, 2, PANTS)

    // pants neon side stripe
    px(4, 46, 2, 4, TECH)
    px(24, 46, 2, 4, TECH)

    // BOOTS
    // back boot (raised slightly off ground in stride)
    px(0, 50, 10, 4, BOOTS)
    px(0, 52, 10, 2, TECH)
    // front boot (planted)
    px(18, 52, 12, 4, BOOTS)
    px(18, 54, 12, 2, TECH)

    g.generateTexture('player', W, H)
    g.destroy()
  }

  makeGroundTexture() {
    const g = this.add.graphics()
    const W = 64
    const H = 36
    g.fillStyle(COLORS.panel, 1)
    g.fillRect(0, 0, W, H)
    // top hairline
    g.lineStyle(1, COLORS.cyan, 0.6)
    g.lineBetween(0, 0, W, 0)
    // tile divider
    g.lineStyle(1, COLORS.border, 1)
    g.lineBetween(W - 1, 0, W - 1, H)
    // circuit dots
    g.fillStyle(COLORS.cyan, 0.35)
    g.fillRect(8, 10, 2, 2)
    g.fillRect(34, 18, 2, 2)
    g.fillRect(50, 26, 2, 2)
    g.generateTexture('ground', W, H)
    g.destroy()
  }

  makeMalwareTexture() {
    const g = this.add.graphics()
    const S = 42
    const r = 16
    const cx = S / 2
    const cy = S / 2
    // spikes
    g.fillStyle(COLORS.red, 1)
    const spikes = 8
    for (let i = 0; i < spikes; i++) {
      const a = (i / spikes) * Math.PI * 2
      const sx = cx + Math.cos(a) * (r + 4)
      const sy = cy + Math.sin(a) * (r + 4)
      g.fillCircle(sx, sy, 4)
    }
    // body
    g.fillStyle(COLORS.red, 1)
    g.fillCircle(cx, cy, r)
    g.lineStyle(2, 0x991b1b, 1)
    g.strokeCircle(cx, cy, r)
    // eyes
    g.fillStyle(COLORS.white, 1)
    g.fillCircle(cx - 5, cy - 2, 3)
    g.fillCircle(cx + 5, cy - 2, 3)
    g.fillStyle(COLORS.dark, 1)
    g.fillCircle(cx - 5, cy - 2, 1.5)
    g.fillCircle(cx + 5, cy - 2, 1.5)
    g.generateTexture('malware', S, S)
    g.destroy()
  }

  makePhishingTexture() {
    const g = this.add.graphics()
    const W = 58
    const H = 40
    // envelope body
    g.fillStyle(COLORS.orange, 1)
    g.fillRoundedRect(0, 4, W, H - 4, 3)
    g.lineStyle(2, 0xb45309, 1)
    g.strokeRoundedRect(1, 5, W - 2, H - 6, 3)
    // flap triangle
    g.fillStyle(0xb45309, 1)
    g.beginPath()
    g.moveTo(0, 4)
    g.lineTo(W / 2, 22)
    g.lineTo(W, 4)
    g.closePath()
    g.fillPath()
    // @ hook
    g.lineStyle(2.5, COLORS.dark, 1)
    g.strokeCircle(W / 2, H / 2 + 4, 6)
    g.lineBetween(W / 2 + 6, H / 2 + 4, W / 2 + 10, H / 2 + 8)
    g.generateTexture('phishing', W, H)
    g.destroy()
  }

  makeRansomwareTexture() {
    const g = this.add.graphics()
    const W = 48
    const H = 62
    // lock body
    g.fillStyle(COLORS.purple, 1)
    g.fillRoundedRect(0, 22, W, H - 22, 6)
    g.lineStyle(2, 0x6b21a8, 1)
    g.strokeRoundedRect(1, 23, W - 2, H - 24, 6)
    // shackle
    g.lineStyle(6, COLORS.purple, 1)
    g.beginPath()
    g.arc(W / 2, 22, 14, Math.PI, Math.PI * 2)
    g.strokePath()
    g.lineStyle(2, 0x6b21a8, 1)
    g.beginPath()
    g.arc(W / 2, 22, 14, Math.PI, Math.PI * 2)
    g.strokePath()
    // keyhole
    g.fillStyle(COLORS.dark, 1)
    g.fillCircle(W / 2, 38, 4)
    g.fillRect(W / 2 - 1.5, 38, 3, 10)
    // skull dots (warning)
    g.fillStyle(COLORS.white, 1)
    g.fillCircle(W / 2 - 8, H - 8, 1.5)
    g.fillCircle(W / 2 + 8, H - 8, 1.5)
    g.generateTexture('ransomware', W, H)
    g.destroy()
  }

  makeKeyTexture() {
    const g = this.add.graphics()
    const W = 40
    const H = 24
    // ring
    g.lineStyle(4, COLORS.yellow, 1)
    g.strokeCircle(10, H / 2, 7)
    // shaft
    g.fillStyle(COLORS.yellow, 1)
    g.fillRect(16, H / 2 - 3, W - 18, 6)
    // teeth
    g.fillRect(W - 8, H / 2 + 3, 4, 5)
    g.fillRect(W - 14, H / 2 + 3, 3, 4)
    // hole
    g.fillStyle(COLORS.dark, 1)
    g.fillCircle(10, H / 2, 3)
    g.generateTexture('key', W, H)
    g.destroy()
  }

  makeMfaTexture() {
    const g = this.add.graphics()
    const S = 38
    const cx = S / 2
    const cy = S / 2
    // hexagon
    g.fillStyle(COLORS.mfa, 1)
    g.beginPath()
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2
      const x = cx + Math.cos(a) * 16
      const y = cy + Math.sin(a) * 16
      if (i === 0) g.moveTo(x, y)
      else g.lineTo(x, y)
    }
    g.closePath()
    g.fillPath()
    g.lineStyle(2, 0x047857, 1)
    g.strokePath()
    // checkmark
    g.lineStyle(3, COLORS.white, 1)
    g.beginPath()
    g.moveTo(cx - 6, cy + 1)
    g.lineTo(cx - 1, cy + 5)
    g.lineTo(cx + 7, cy - 4)
    g.strokePath()
    g.generateTexture('mfa', S, S)
    g.destroy()
  }

  makeScanlineTexture() {
    const g = this.add.graphics()
    g.fillStyle(0xffffff, 0.06)
    g.fillRect(0, 0, 2, 1)
    g.generateTexture('scanline', 2, 3)
    g.destroy()
  }
}
