import Phaser from 'phaser'
import { beep } from '../util/audio.js'

const GAME_W = 960
const GAME_H = 540
const GROUND_Y = 480
const PLAYER_X = 160
const JUMP_VELOCITY = -900
const DOUBLE_JUMP_VELOCITY = -780
const BASE_SCROLL = 360
const MAX_SCROLL = 760
const HS_KEY = 'cyberrunner.hs'

const OBSTACLE_TYPES = [
  { key: 'malware', label: 'malware', yOffset: 0, weight: 5 },
  { key: 'phishing', label: 'phishing', yOffset: 0, weight: 3 },
  { key: 'ransomware', label: 'ransomware', yOffset: 0, weight: 2 },
]

const TOTAL_WEIGHT = OBSTACLE_TYPES.reduce((s, o) => s + o.weight, 0)

export class GameScene extends Phaser.Scene {
  constructor() {
    super('Game')
  }

  create() {
    this.scrollSpeed = BASE_SCROLL
    this.score = 0
    this.highScore = Number(localStorage.getItem(HS_KEY) || 0)
    this.lastJumpPressed = -1000
    this.lastGrounded = -1000
    this.airJumpsLeft = 1
    this.invincibleUntil = 0
    this.slowMoUntil = 0
    this.gameOver = false

    this.buildMatrixRain()
    this.buildGround()
    this.buildPlayer()
    this.buildHud()
    this.buildInput()

    this.obstacles = this.physics.add.group()
    this.powerups = this.physics.add.group()

    this.scheduleObstacle()
    this.schedulePowerup()

    this.physics.add.overlap(this.player, this.obstacles, this.handleHit, null, this)
    this.physics.add.overlap(this.player, this.powerups, this.handlePickup, null, this)

    // intro flash
    this.cameras.main.flash(300, 107, 204, 232)
  }

  // ---------- BUILD ----------

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
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '14px',
          color: '#1a7a8a',
          align: 'center',
        }
      )
      txt.setAlpha(0.45)
      txt.setDepth(-10)
      this.rainCols.push({ txt, speed: 40 + Math.random() * 90, glyphs })
    }
  }

  randomColumnString(glyphs, rows) {
    let s = ''
    for (let i = 0; i < rows; i++) {
      s += glyphs[Math.floor(Math.random() * glyphs.length)] + '\n'
    }
    return s
  }

  buildGround() {
    const GROUND_H = 60
    this.groundTile = this.add.tileSprite(GAME_W / 2, GROUND_Y + GROUND_H / 2, GAME_W, GROUND_H, 'ground')
    this.groundTile.setDepth(2)

    // ground top accent line
    const line = this.add.graphics()
    line.lineStyle(2, 0x6bcce8, 0.6)
    line.lineBetween(0, GROUND_Y, GAME_W, GROUND_Y)
    line.setDepth(3)

    // invisible static collider spanning the full width with its top at GROUND_Y
    this.groundBody = this.add.rectangle(GAME_W / 2, GROUND_Y + 6, GAME_W, 12, 0x000000, 0)
    this.physics.add.existing(this.groundBody, true)
  }

  buildPlayer() {
    this.player = this.physics.add.sprite(PLAYER_X, GROUND_Y - 60, 'player')
    this.player.setDepth(10)
    this.player.setCollideWorldBounds(true)
    this.player.body.setSize(22, 52)
    this.player.body.setOffset(5, 4)
    this.physics.add.collider(this.player, this.groundBody)

    // subtle trail glow
    this.player.preFX?.addGlow(0x6bcce8, 1, 0, false, 0.1, 8)
  }

  buildHud() {
    const hudStyle = {
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '16px',
      color: '#6bcce8',
    }
    this.scoreText = this.add.text(GAME_W - 24, 24, 'PACKETS DEFENDED  000000', hudStyle)
      .setOrigin(1, 0)
      .setDepth(20)
    this.hsText = this.add.text(24, 24, `BEST  ${this.formatScore(this.highScore)}`, hudStyle)
      .setOrigin(0, 0)
      .setDepth(20)
    this.powerText = this.add.text(GAME_W / 2, 24, '', {
      ...hudStyle,
      color: '#fde047',
    }).setOrigin(0.5, 0).setDepth(20)

    // help text bottom
    this.helpText = this.add.text(GAME_W / 2, GAME_H - 24, 'SPACE / TAP to jump  •  press again mid-air for double jump', {
      ...hudStyle,
      fontSize: '12px',
      color: '#3a6a82',
    }).setOrigin(0.5, 1).setDepth(20)
  }

  buildInput() {
    this.input.keyboard.on('keydown-SPACE', () => this.requestJump())
    this.input.keyboard.on('keydown-UP', () => this.requestJump())
    this.input.keyboard.on('keydown-W', () => this.requestJump())
    this.input.on('pointerdown', () => this.requestJump())
  }

  // ---------- SCHEDULING ----------

  scheduleObstacle() {
    const minDelay = Phaser.Math.Linear(1400, 600, this.difficultyT())
    const maxDelay = Phaser.Math.Linear(2200, 1100, this.difficultyT())
    const delay = Phaser.Math.Between(minDelay, maxDelay)
    this.obstacleTimer = this.time.delayedCall(delay, () => {
      if (!this.gameOver) {
        this.spawnObstacle()
        this.scheduleObstacle()
      }
    })
  }

  schedulePowerup() {
    const delay = Phaser.Math.Between(8000, 18000)
    this.powerupTimer = this.time.delayedCall(delay, () => {
      if (!this.gameOver) {
        this.spawnPowerup()
        this.schedulePowerup()
      }
    })
  }

  difficultyT() {
    // 0 at start, 1 by score 12000
    return Phaser.Math.Clamp(this.score / 12000, 0, 1)
  }

  // ---------- SPAWN ----------

  spawnObstacle() {
    const type = this.pickObstacleType()
    const tex = this.textures.get(type.key).getSourceImage()
    const h = tex.height
    const y = GROUND_Y - h / 2 - type.yOffset
    const obs = this.obstacles.create(GAME_W + 60, y, type.key)
    obs.body.setAllowGravity(false)
    obs.setVelocityX(-this.scrollSpeed)
    obs.setDepth(8)
    obs.kind = type.label
  }

  pickObstacleType() {
    let r = Math.random() * TOTAL_WEIGHT
    for (const t of OBSTACLE_TYPES) {
      if (r < t.weight) return t
      r -= t.weight
    }
    return OBSTACLE_TYPES[0]
  }

  spawnPowerup() {
    const kind = Math.random() < 0.5 ? 'key' : 'mfa'
    const y = GROUND_Y - 120 - Math.random() * 120
    const p = this.powerups.create(GAME_W + 40, y, kind)
    p.body.setAllowGravity(false)
    p.setVelocityX(-this.scrollSpeed * 0.9)
    p.setDepth(8)
    p.kind = kind
    this.tweens.add({
      targets: p,
      y: y - 12,
      yoyo: true,
      duration: 700,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })
  }

  // ---------- INPUT ----------

  requestJump() {
    if (this.gameOver) return
    this.lastJumpPressed = this.time.now
  }

  // ---------- UPDATE ----------

  update(_t, dt) {
    if (this.gameOver) return

    const slowFactor = this.time.now < this.slowMoUntil ? 0.55 : 1
    const targetSpeed = Phaser.Math.Linear(BASE_SCROLL, MAX_SCROLL, this.difficultyT()) * slowFactor
    this.scrollSpeed += (targetSpeed - this.scrollSpeed) * 0.08

    this.groundTile.tilePositionX += (this.scrollSpeed * dt) / 1000

    this.updateRain(dt)
    this.updateJump()
    this.updateScore(dt)
    this.updateInvincibility()
    this.cleanupOffscreen()
    this.syncVelocities()
  }

  updateRain(dt) {
    for (const col of this.rainCols) {
      col.txt.y += (col.speed * dt) / 1000
      if (col.txt.y > GAME_H + 40) {
        col.txt.y = -200
        col.txt.setText(this.randomColumnString(col.glyphs, 14))
      }
    }
  }

  updateJump() {
    const now = this.time.now
    const onGround = this.player.body.blocked.down || this.player.body.touching.down
    if (onGround) {
      this.lastGrounded = now
      this.airJumpsLeft = 1
    }

    const buffered = now - this.lastJumpPressed < 140
    if (!buffered) return

    const canCoyote = now - this.lastGrounded < 120

    if (canCoyote) {
      this.player.setVelocityY(JUMP_VELOCITY)
      this.lastJumpPressed = -1000
      this.lastGrounded = -1000
      beep(this, 540, 0.07, 'square', 0.05)
    } else if (this.airJumpsLeft > 0) {
      this.player.setVelocityY(DOUBLE_JUMP_VELOCITY)
      this.lastJumpPressed = -1000
      this.airJumpsLeft -= 1
      beep(this, 720, 0.08, 'triangle', 0.05)
      this.spawnAirJumpFx()
    }
  }

  spawnAirJumpFx() {
    const x = this.player.x
    const y = this.player.y + 26
    const ring = this.add.circle(x, y, 6, 0x6bcce8, 0.55).setDepth(11)
    this.tweens.add({
      targets: ring,
      scale: 3.2,
      alpha: 0,
      duration: 280,
      onComplete: () => ring.destroy(),
    })
  }

  updateScore(dt) {
    if (this.time.now < this.slowMoUntil) {
      this.score += dt * 0.05
    } else {
      this.score += dt * 0.08
    }
    this.scoreText.setText(`PACKETS DEFENDED  ${this.formatScore(this.score)}`)
  }

  updateInvincibility() {
    if (this.time.now < this.invincibleUntil) {
      const t = (this.time.now / 80) | 0
      this.player.setTint(t % 2 ? 0xfde047 : 0xffffff)
      this.powerText.setText('SHIELDED')
    } else if (this.time.now < this.slowMoUntil) {
      this.player.setTint(0x10b981)
      this.powerText.setText('SLOW-MO')
    } else {
      this.player.clearTint()
      this.powerText.setText('')
    }
  }

  cleanupOffscreen() {
    this.obstacles.getChildren().forEach((o) => {
      if (o.x < -80) o.destroy()
    })
    this.powerups.getChildren().forEach((p) => {
      if (p.x < -80) p.destroy()
    })
  }

  syncVelocities() {
    // keep obstacles + powerups at current scroll speed (in case it changed)
    this.obstacles.getChildren().forEach((o) => o.setVelocityX(-this.scrollSpeed))
    this.powerups.getChildren().forEach((p) => p.setVelocityX(-this.scrollSpeed * 0.9))
  }

  // ---------- COLLISION ----------

  handleHit(_player, obstacle) {
    if (this.time.now < this.invincibleUntil) {
      this.destroyObstacle(obstacle)
      return
    }
    this.endRun()
  }

  destroyObstacle(obstacle) {
    const x = obstacle.x
    const y = obstacle.y
    obstacle.destroy()
    this.flashAt(x, y, 0xfde047)
    beep(this, 880, 0.06, 'sawtooth', 0.04)
  }

  handlePickup(_player, p) {
    const kind = p.kind
    const x = p.x
    const y = p.y
    p.destroy()
    if (kind === 'key') {
      this.invincibleUntil = this.time.now + 5000
      this.flashAt(x, y, 0xfde047)
      beep(this, 700, 0.12, 'triangle', 0.05)
      beep(this, 980, 0.18, 'triangle', 0.05, 0.08)
    } else {
      this.slowMoUntil = this.time.now + 3000
      this.flashAt(x, y, 0x10b981)
      beep(this, 440, 0.18, 'sine', 0.06)
    }
  }

  flashAt(x, y, color) {
    const c = this.add.circle(x, y, 8, color, 0.7).setDepth(30)
    this.tweens.add({
      targets: c,
      scale: 4,
      alpha: 0,
      duration: 380,
      onComplete: () => c.destroy(),
    })
  }

  endRun() {
    this.gameOver = true
    beep(this, 200, 0.25, 'square', 0.08)
    beep(this, 140, 0.4, 'sawtooth', 0.08, 0.1)
    this.cameras.main.shake(220, 0.012)
    this.cameras.main.flash(160, 239, 68, 68)

    if (this.score > this.highScore) {
      this.highScore = Math.floor(this.score)
      localStorage.setItem(HS_KEY, String(this.highScore))
    }

    this.physics.pause()
    this.obstacleTimer?.remove(false)
    this.powerupTimer?.remove(false)

    this.time.delayedCall(700, () => {
      this.scene.start('GameOver', {
        score: Math.floor(this.score),
        highScore: this.highScore,
      })
    })
  }

  formatScore(n) {
    return String(Math.floor(n)).padStart(6, '0')
  }
}
