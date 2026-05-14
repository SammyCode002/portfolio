import Phaser from 'phaser'
import { beep } from '../util/audio.js'
import {
  getLeaderboard,
  qualifies,
  submitScore,
  sanitizeName,
  NAME_MAX,
} from '../util/leaderboard.js'

const FONT = 'JetBrains Mono, monospace'

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver')
  }

  init(data) {
    this.finalScore = data?.score || 0
    this.highScore = data?.highScore || 0
    this.isNewBest = this.finalScore > 0 && this.finalScore >= this.highScore
    this.canSubmit = qualifies(this.finalScore)
    this.nameInput = ''
    this.submittedEntry = null
    this.inputActive = false
    this.cursorOn = true
  }

  create() {
    const W = this.scale.width
    const H = this.scale.height

    // dim backdrop
    this.add.rectangle(W / 2, H / 2, W, H, 0x050b14, 0.88).setDepth(0)

    // title
    this.add.text(W / 2, 60, 'CONNECTION TERMINATED', {
      fontFamily: FONT,
      fontSize: '30px',
      color: '#ef4444',
      fontStyle: 'bold',
    }).setOrigin(0.5).setDepth(2)

    this.add.text(W / 2, 92, '> system breach detected_', {
      fontFamily: FONT,
      fontSize: '12px',
      color: '#9ebed4',
    }).setOrigin(0.5).setDepth(2)

    // score panel (left)
    this.buildScorePanel(180, H / 2 + 10)

    // leaderboard panel (right)
    this.buildLeaderboardPanel(W - 180, H / 2 + 10)

    // bottom prompt
    this.bottomPrompt = this.add.text(W / 2, H - 28, '', {
      fontFamily: FONT,
      fontSize: '13px',
      color: '#6bcce8',
    }).setOrigin(0.5).setDepth(2)
    this.tweens.add({
      targets: this.bottomPrompt,
      alpha: 0.35,
      yoyo: true,
      repeat: -1,
      duration: 700,
    })

    if (this.canSubmit) {
      this.beginNameEntry()
    } else {
      this.showRetryPrompt()
    }

    if (this.isNewBest && this.finalScore > 0) {
      beep(this, 660, 0.12, 'triangle', 0.05)
      beep(this, 880, 0.16, 'triangle', 0.05, 0.12)
    }

    // cursor blink timer
    this.time.addEvent({
      delay: 480,
      loop: true,
      callback: () => {
        this.cursorOn = !this.cursorOn
        if (this.inputActive) this.renderNameField()
      },
    })
  }

  buildScorePanel(cx, cy) {
    const panelW = 280
    const panelH = 220
    this.add.rectangle(cx, cy, panelW, panelH, 0x0a1525, 0.85)
      .setStrokeStyle(1, 0x1d3458)
      .setDepth(1)

    this.add.text(cx, cy - panelH / 2 + 22, 'PACKETS DEFENDED', {
      fontFamily: FONT,
      fontSize: '12px',
      color: '#6bcce8',
    }).setOrigin(0.5).setDepth(2)

    this.add.text(cx, cy - panelH / 2 + 60, String(this.finalScore).padStart(6, '0'), {
      fontFamily: FONT,
      fontSize: '44px',
      color: '#eaf6fb',
      fontStyle: 'bold',
    }).setOrigin(0.5).setDepth(2)

    const bestColor = this.isNewBest ? '#fde047' : '#3a6a82'
    const bestLabel = this.isNewBest ? 'NEW BEST' : 'BEST'
    this.add.text(cx, cy - panelH / 2 + 100, `${bestLabel}  ${String(this.highScore).padStart(6, '0')}`, {
      fontFamily: FONT,
      fontSize: '12px',
      color: bestColor,
    }).setOrigin(0.5).setDepth(2)

    // name entry slot (rendered later when inputActive)
    this.nameLabel = this.add.text(cx, cy + 8, '', {
      fontFamily: FONT,
      fontSize: '11px',
      color: '#fde047',
    }).setOrigin(0.5).setDepth(2)

    this.nameBox = this.add.rectangle(cx, cy + 38, 220, 36, 0x050b14)
      .setStrokeStyle(1, 0x6bcce8)
      .setDepth(2)
      .setVisible(false)

    this.nameText = this.add.text(cx, cy + 38, '', {
      fontFamily: FONT,
      fontSize: '20px',
      color: '#eaf6fb',
    }).setOrigin(0.5).setDepth(3)

    this.nameHint = this.add.text(cx, cy + 64, '', {
      fontFamily: FONT,
      fontSize: '10px',
      color: '#6a8aa8',
    }).setOrigin(0.5).setDepth(2)
  }

  buildLeaderboardPanel(cx, cy) {
    const panelW = 360
    const panelH = 320
    this.lbPanel = this.add.rectangle(cx, cy - 36, panelW, panelH, 0x0a1525, 0.85)
      .setStrokeStyle(1, 0x1d3458)
      .setDepth(1)

    this.add.text(cx, cy - 36 - panelH / 2 + 22, 'LEADERBOARD', {
      fontFamily: FONT,
      fontSize: '14px',
      color: '#6bcce8',
      fontStyle: 'bold',
    }).setOrigin(0.5).setDepth(2)

    this.lbCenterX = cx
    this.lbTopY = cy - 36 - panelH / 2 + 56
    this.renderLeaderboard()
  }

  renderLeaderboard() {
    // clear existing
    if (this.lbRows) this.lbRows.forEach((t) => t.destroy())
    this.lbRows = []

    const lb = getLeaderboard()
    const cx = this.lbCenterX
    const startY = this.lbTopY
    const rowH = 22

    if (lb.length === 0) {
      const t = this.add.text(cx, startY + 20, 'no scores yet — be the first', {
        fontFamily: FONT,
        fontSize: '11px',
        color: '#6a8aa8',
      }).setOrigin(0.5).setDepth(2)
      this.lbRows.push(t)
      return
    }

    for (let i = 0; i < lb.length; i++) {
      const entry = lb[i]
      const y = startY + i * rowH
      const isMe = this.submittedEntry && entry.ts === this.submittedEntry.ts
      const baseColor = isMe ? '#fde047' : '#9ebed4'

      const rank = this.add.text(cx - 140, y, String(i + 1).padStart(2, ' ') + '.', {
        fontFamily: FONT,
        fontSize: '13px',
        color: baseColor,
      }).setOrigin(0, 0.5).setDepth(2)

      const name = this.add.text(cx - 100, y, entry.name, {
        fontFamily: FONT,
        fontSize: '13px',
        color: baseColor,
      }).setOrigin(0, 0.5).setDepth(2)

      const score = this.add.text(cx + 140, y, String(entry.score).padStart(6, '0'), {
        fontFamily: FONT,
        fontSize: '13px',
        color: isMe ? '#fde047' : '#6bcce8',
      }).setOrigin(1, 0.5).setDepth(2)

      this.lbRows.push(rank, name, score)

      if (isMe) {
        const tag = this.add.text(cx + 150, y, '← YOU', {
          fontFamily: FONT,
          fontSize: '10px',
          color: '#fde047',
        }).setOrigin(0, 0.5).setDepth(2)
        this.lbRows.push(tag)
      }
    }
  }

  beginNameEntry() {
    this.inputActive = true
    this.nameLabel.setText('★ NEW HIGH SCORE — ENTER HANDLE')
    this.nameBox.setVisible(true)
    this.nameHint.setText(`A–Z 0–9, max ${NAME_MAX} chars · ENTER to submit · ESC to skip`)
    this.renderNameField()
    this.bottomPrompt.setText('type your handle')

    this.input.keyboard.on('keydown', this.handleNameKey, this)
  }

  handleNameKey(event) {
    if (!this.inputActive) return
    const key = event.key
    if (key === 'Enter') {
      this.submitName()
      return
    }
    if (key === 'Escape') {
      this.skipNameEntry()
      return
    }
    if (key === 'Backspace') {
      this.nameInput = this.nameInput.slice(0, -1)
      this.renderNameField()
      return
    }
    if (key.length === 1 && /^[A-Za-z0-9 _-]$/.test(key) && this.nameInput.length < NAME_MAX) {
      this.nameInput += key.toUpperCase()
      this.renderNameField()
      beep(this, 720, 0.04, 'square', 0.025)
    }
  }

  renderNameField() {
    const shown = this.nameInput + (this.cursorOn ? '_' : ' ')
    this.nameText.setText(shown)
  }

  submitName() {
    const clean = sanitizeName(this.nameInput)
    if (!clean) {
      // empty name — flash and ignore
      this.cameras.main.flash(120, 239, 68, 68)
      return
    }
    const entry = submitScore(clean, this.finalScore)
    if (!entry) return
    this.submittedEntry = entry
    this.inputActive = false
    this.nameLabel.setText(`SAVED AS  ${entry.name}`)
    this.nameBox.setStrokeStyle(1, 0xfde047)
    this.nameText.setText(entry.name)
    this.nameHint.setText('')
    beep(this, 660, 0.12, 'triangle', 0.05)
    beep(this, 880, 0.18, 'triangle', 0.05, 0.1)
    this.renderLeaderboard()
    this.showRetryPrompt()
  }

  skipNameEntry() {
    this.inputActive = false
    this.nameLabel.setText('SCORE NOT SAVED')
    this.nameBox.setVisible(false)
    this.nameText.setText('')
    this.nameHint.setText('')
    this.showRetryPrompt()
  }

  showRetryPrompt() {
    this.bottomPrompt.setText('[ SPACE to reconnect  •  ESC for menu ]')
    // small delay so accidental key bleed doesn't insta-restart
    this.time.delayedCall(250, () => {
      this.input.keyboard.once('keydown-SPACE', () => this.restart())
      this.input.keyboard.once('keydown-UP', () => this.restart())
      this.input.keyboard.once('keydown-ESC', () => this.toMenu())
      this.input.once('pointerdown', () => this.restart())
    })
  }

  restart() {
    this.scene.start('Game')
  }

  toMenu() {
    this.scene.start('Menu')
  }
}
