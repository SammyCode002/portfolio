import Phaser from 'phaser'
import { beep } from '../util/audio.js'
import { getLeaderboard } from '../util/leaderboard.js'

const GAME_W = 960
const GAME_H = 540
const FONT = 'JetBrains Mono, monospace'
const HS_KEY = 'cyberrunner.hs'

const MENU_ITEMS = [
  { key: 'start', label: 'START GAME' },
  { key: 'leaderboard', label: 'LEADERBOARD' },
  { key: 'credits', label: 'CREDITS' },
]

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('Menu')
  }

  create() {
    this.view = 'main'
    this.cursor = 0
    this.highScore = Number(localStorage.getItem(HS_KEY) || 0)

    this.buildMatrixRain()
    this.buildSkyline()
    this.buildTitle()
    this.buildCharacters()
    this.buildMenu()
    this.buildFooter()

    this.subViewLayer = this.add.container(0, 0).setDepth(50).setVisible(false)

    this.input.keyboard.on('keydown-UP', () => this.moveCursor(-1))
    this.input.keyboard.on('keydown-W', () => this.moveCursor(-1))
    this.input.keyboard.on('keydown-DOWN', () => this.moveCursor(1))
    this.input.keyboard.on('keydown-S', () => this.moveCursor(1))
    this.input.keyboard.on('keydown-ENTER', () => this.activate())
    this.input.keyboard.on('keydown-SPACE', () => this.activate())
    this.input.keyboard.on('keydown-ESC', () => this.backToMain())

    this.cameras.main.flash(280, 107, 204, 232)
  }

  buildMatrixRain() {
    this.rainCols = []
    const colWidth = 16
    const cols = Math.ceil(GAME_W / colWidth)
    const glyphs = '01アカサタナハマヤラワ#@$%&*+=<>/\\|'
    for (let i = 0; i < cols; i++) {
      const txt = this.add.text(
        i * colWidth,
        Math.random() * GAME_H,
        this.randomColumnString(glyphs, 14),
        {
          fontFamily: FONT,
          fontSize: '14px',
          color: '#1a7a8a',
          align: 'center',
        }
      )
      txt.setAlpha(0.35)
      txt.setDepth(-10)
      this.rainCols.push({ txt, speed: 35 + Math.random() * 80, glyphs })
    }
  }

  randomColumnString(glyphs, rows) {
    let s = ''
    for (let i = 0; i < rows; i++) {
      s += glyphs[Math.floor(Math.random() * glyphs.length)] + '\n'
    }
    return s
  }

  buildSkyline() {
    // dark silhouette skyline behind title for depth
    const g = this.add.graphics().setDepth(-5)
    g.fillStyle(0x081323, 0.85)
    let x = 0
    while (x < GAME_W) {
      const w = 22 + Math.floor(Math.random() * 48)
      const h = 80 + Math.floor(Math.random() * 180)
      g.fillRect(x, GAME_H - h - 60, w, h)
      // window lights
      g.fillStyle(0x6bcce8, 0.18)
      for (let wy = GAME_H - h - 60 + 8; wy < GAME_H - 60; wy += 10) {
        for (let wx = x + 4; wx < x + w - 4; wx += 8) {
          if (Math.random() < 0.35) g.fillRect(wx, wy, 2, 4)
        }
      }
      g.fillStyle(0x081323, 0.85)
      x += w + 2
    }
    // ground bar
    g.fillStyle(0x0a1525, 1)
    g.fillRect(0, GAME_H - 60, GAME_W, 60)
    g.fillStyle(0x6bcce8, 0.5)
    g.fillRect(0, GAME_H - 60, GAME_W, 2)
  }

  buildTitle() {
    const cx = GAME_W / 2

    // glitch shadow layer (offset, cyan-deep)
    this.titleShadow1 = this.add.text(cx + 4, 78, 'CYBER', {
      fontFamily: FONT,
      fontSize: '88px',
      color: '#3aa9d4',
      fontStyle: 'bold',
    }).setOrigin(0.5, 0).setAlpha(0.55).setDepth(1)

    this.titleShadow2 = this.add.text(cx + 4, 148, 'RUNNER', {
      fontFamily: FONT,
      fontSize: '88px',
      color: '#ec4899',
      fontStyle: 'bold',
    }).setOrigin(0.5, 0).setAlpha(0.45).setDepth(1)

    this.title1 = this.add.text(cx, 78, 'CYBER', {
      fontFamily: FONT,
      fontSize: '88px',
      color: '#eaf6fb',
      fontStyle: 'bold',
      stroke: '#6bcce8',
      strokeThickness: 3,
    }).setOrigin(0.5, 0).setDepth(3)

    this.title2 = this.add.text(cx, 148, 'RUNNER', {
      fontFamily: FONT,
      fontSize: '88px',
      color: '#eaf6fb',
      fontStyle: 'bold',
      stroke: '#6bcce8',
      strokeThickness: 3,
    }).setOrigin(0.5, 0).setDepth(3)

    this.title1.preFX?.addGlow(0x6bcce8, 2, 0, false, 0.1, 10)
    this.title2.preFX?.addGlow(0x6bcce8, 2, 0, false, 0.1, 10)

    // sign block with "THE GAME"
    const signY = 250
    const sign = this.add.rectangle(cx, signY, 200, 32, 0x050b14)
      .setStrokeStyle(2, 0x6bcce8)
      .setDepth(3)
    this.add.text(cx, signY, 'THE GAME', {
      fontFamily: FONT,
      fontSize: '16px',
      color: '#6bcce8',
      fontStyle: 'bold',
    }).setOrigin(0.5).setDepth(4)

    // tagline
    this.add.text(cx, signY + 28, 'OUTRUN THE EXPLOITS', {
      fontFamily: FONT,
      fontSize: '12px',
      color: '#9ebed4',
    }).setOrigin(0.5).setDepth(3)

    // subtle horizontal scanline on title
    this.tweens.add({
      targets: [this.titleShadow1, this.titleShadow2],
      alpha: { from: 0.55, to: 0.25 },
      yoyo: true,
      repeat: -1,
      duration: 1400,
      ease: 'Sine.easeInOut',
    })
  }

  buildCharacters() {
    // player on left, hovering / running
    this.playerSprite = this.add.image(110, 340, 'player')
      .setScale(2.2)
      .setDepth(4)
    this.playerSprite.preFX?.addGlow(0x6bcce8, 1, 0, false, 0.1, 6)
    this.tweens.add({
      targets: this.playerSprite,
      y: 332,
      yoyo: true,
      repeat: -1,
      duration: 420,
      ease: 'Sine.easeInOut',
    })

    // malware on right, bobbing
    this.enemySprite = this.add.image(GAME_W - 110, 330, 'malware')
      .setScale(1.6)
      .setDepth(4)
    this.enemySprite.preFX?.addGlow(0xef4444, 1.5, 0, false, 0.1, 8)
    this.tweens.add({
      targets: this.enemySprite,
      y: 320,
      yoyo: true,
      repeat: -1,
      duration: 620,
      ease: 'Sine.easeInOut',
    })
    this.tweens.add({
      targets: this.enemySprite,
      angle: 360,
      repeat: -1,
      duration: 6000,
    })
  }

  buildMenu() {
    const cx = GAME_W / 2
    const startY = 360
    const gap = 32

    this.menuTexts = MENU_ITEMS.map((item, i) => {
      const t = this.add.text(cx, startY + i * gap, item.label, {
        fontFamily: FONT,
        fontSize: '22px',
        color: '#9ebed4',
        fontStyle: 'bold',
      }).setOrigin(0.5).setDepth(5).setInteractive({ useHandCursor: true })

      t.on('pointerover', () => {
        this.cursor = i
        this.renderCursor()
      })
      t.on('pointerdown', () => {
        this.cursor = i
        this.activate()
      })
      return t
    })

    // cursor arrows that flank the selected item
    this.leftArrow = this.add.text(0, 0, '▶', {
      fontFamily: FONT,
      fontSize: '20px',
      color: '#6bcce8',
    }).setOrigin(0.5).setDepth(5)
    this.rightArrow = this.add.text(0, 0, '◀', {
      fontFamily: FONT,
      fontSize: '20px',
      color: '#6bcce8',
    }).setOrigin(0.5).setDepth(5)

    this.tweens.add({
      targets: [this.leftArrow, this.rightArrow],
      alpha: { from: 1, to: 0.4 },
      yoyo: true,
      repeat: -1,
      duration: 540,
    })

    this.renderCursor()

    // "PRESS ENTER" blinker
    this.pressPrompt = this.add.text(GAME_W / 2, 480, '▶ PRESS ENTER', {
      fontFamily: FONT,
      fontSize: '12px',
      color: '#fde047',
      fontStyle: 'bold',
    }).setOrigin(0.5).setDepth(5)
    this.tweens.add({
      targets: this.pressPrompt,
      alpha: 0.25,
      yoyo: true,
      repeat: -1,
      duration: 700,
    })
  }

  buildFooter() {
    this.add.text(20, GAME_H - 18, '© 2026 SAM DAMEG', {
      fontFamily: FONT,
      fontSize: '10px',
      color: '#3a6a82',
    }).setOrigin(0, 0.5).setDepth(5)

    this.add.text(GAME_W - 20, GAME_H - 18, `BEST  ${String(this.highScore).padStart(6, '0')}`, {
      fontFamily: FONT,
      fontSize: '10px',
      color: '#3a6a82',
    }).setOrigin(1, 0.5).setDepth(5)
  }

  renderCursor() {
    this.menuTexts.forEach((t, i) => {
      const selected = i === this.cursor
      t.setColor(selected ? '#eaf6fb' : '#9ebed4')
      t.setScale(selected ? 1.06 : 1.0)
    })
    const active = this.menuTexts[this.cursor]
    const halfW = active.displayWidth / 2 + 22
    this.leftArrow.setPosition(active.x - halfW, active.y)
    this.rightArrow.setPosition(active.x + halfW, active.y)
  }

  moveCursor(delta) {
    if (this.view !== 'main') return
    this.cursor = (this.cursor + delta + MENU_ITEMS.length) % MENU_ITEMS.length
    beep(this, 540, 0.04, 'square', 0.03)
    this.renderCursor()
  }

  activate() {
    if (this.view === 'leaderboard' || this.view === 'credits') {
      this.backToMain()
      return
    }
    const item = MENU_ITEMS[this.cursor]
    beep(this, 720, 0.08, 'triangle', 0.05)
    if (item.key === 'start') {
      this.cameras.main.fade(260, 5, 11, 20)
      this.time.delayedCall(280, () => this.scene.start('Game'))
    } else if (item.key === 'leaderboard') {
      this.showLeaderboard()
    } else if (item.key === 'credits') {
      this.showCredits()
    }
  }

  showLeaderboard() {
    this.view = 'leaderboard'
    this.openSubView('LEADERBOARD', (cx, topY) => {
      const lb = getLeaderboard()
      const rows = []
      if (lb.length === 0) {
        rows.push(this.add.text(cx, topY + 80, 'no scores yet — be the first', {
          fontFamily: FONT,
          fontSize: '14px',
          color: '#6a8aa8',
        }).setOrigin(0.5))
      } else {
        const rowH = 24
        for (let i = 0; i < lb.length; i++) {
          const e = lb[i]
          const y = topY + 40 + i * rowH
          const color = i === 0 ? '#fde047' : '#9ebed4'
          rows.push(this.add.text(cx - 160, y, String(i + 1).padStart(2, ' ') + '.', {
            fontFamily: FONT, fontSize: '15px', color,
          }).setOrigin(0, 0.5))
          rows.push(this.add.text(cx - 110, y, e.name, {
            fontFamily: FONT, fontSize: '15px', color,
          }).setOrigin(0, 0.5))
          rows.push(this.add.text(cx + 160, y, String(e.score).padStart(6, '0'), {
            fontFamily: FONT, fontSize: '15px', color: i === 0 ? '#fde047' : '#6bcce8',
          }).setOrigin(1, 0.5))
        }
      }
      return rows
    })
  }

  showCredits() {
    this.view = 'credits'
    this.openSubView('CREDITS', (cx, topY) => {
      const lines = [
        { text: 'design + code', color: '#6bcce8', size: 13, gap: 26 },
        { text: 'SAM DAMEG', color: '#eaf6fb', size: 20, gap: 36 },
        { text: 'built with', color: '#6bcce8', size: 13, gap: 26 },
        { text: 'PHASER 4 · VITE', color: '#eaf6fb', size: 18, gap: 36 },
        { text: 'all sprites drawn at runtime', color: '#9ebed4', size: 11, gap: 18 },
        { text: 'all sound synthesized with webaudio', color: '#9ebed4', size: 11, gap: 22 },
        { text: 'github.com/SammyCode002/cyberrunner', color: '#fde047', size: 11, gap: 0 },
      ]
      const rows = []
      let y = topY + 30
      for (const ln of lines) {
        rows.push(this.add.text(cx, y, ln.text, {
          fontFamily: FONT,
          fontSize: ln.size + 'px',
          color: ln.color,
        }).setOrigin(0.5))
        y += ln.gap
      }
      return rows
    })
  }

  openSubView(title, contentFactory) {
    this.subViewLayer.removeAll(true)
    this.subViewLayer.setVisible(true)

    const overlay = this.add.rectangle(GAME_W / 2, GAME_H / 2, GAME_W, GAME_H, 0x050b14, 0.92)
    const panel = this.add.rectangle(GAME_W / 2, GAME_H / 2, 560, 380, 0x0a1525, 0.95)
      .setStrokeStyle(2, 0x6bcce8)
    const heading = this.add.text(GAME_W / 2, GAME_H / 2 - 160, title, {
      fontFamily: FONT,
      fontSize: '22px',
      color: '#6bcce8',
      fontStyle: 'bold',
    }).setOrigin(0.5)
    const closeHint = this.add.text(GAME_W / 2, GAME_H / 2 + 170, '[ ESC / ENTER to go back ]', {
      fontFamily: FONT,
      fontSize: '11px',
      color: '#9ebed4',
    }).setOrigin(0.5)

    this.subViewLayer.add([overlay, panel, heading, closeHint])
    const content = contentFactory(GAME_W / 2, GAME_H / 2 - 130) || []
    content.forEach((c) => this.subViewLayer.add(c))
  }

  backToMain() {
    if (this.view === 'main') return
    this.view = 'main'
    this.subViewLayer.setVisible(false)
    this.subViewLayer.removeAll(true)
    beep(this, 380, 0.06, 'square', 0.04)
  }

  update(_t, dt) {
    if (!this.rainCols) return
    for (const col of this.rainCols) {
      col.txt.y += (col.speed * dt) / 1000
      if (col.txt.y > GAME_H + 40) {
        col.txt.y = -200
        col.txt.setText(this.randomColumnString(col.glyphs, 14))
      }
    }
  }
}
