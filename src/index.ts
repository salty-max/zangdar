import Colour from './colour'
import Config from './config'
import Layer from './layer'
import Renderer from './renderer'
import Tile from './tile'
import Vector from './vector'

const { SCREEN_W, SCREEN_H } = Config

const layers: Record<string, Layer> = {
  bg: new Layer({ size: new Vector(SCREEN_W, SCREEN_H) }),
  actors: new Layer({ size: new Vector(SCREEN_W, SCREEN_H) }),
}

const player = new Tile({
  char: '@',
  colour: Colour.fromPalette('green'),
  pos: new Vector(40, 12),
})

const bgTiles = Array.from({ length: SCREEN_W * SCREEN_H }, (_, i) => {
  const x = i % SCREEN_W
  const y = Math.floor(i / SCREEN_W)

  return new Tile({
    char: '.',
    colour: Colour.fromPalette('darkgrey'),
    background: Colour.fromPalette('black'),
    pos: new Vector(x, y),
  })
})

const renderer = new Renderer()
renderer.addLayer('bg', layers.bg)
renderer.addLayer('actors', layers.actors)

renderer.onBeforeDraw(() => {
  layers.bg.operations.forEach((op) => {
    const newAlpha = (Math.sin(op.pos.x + op.pos.y) + 1) / 2
    op.colour.a = newAlpha
  })
})

const draw = () => {
  bgTiles.forEach((tile) => layers.bg.draw(tile))
  layers.actors.draw(player)
  renderer.commit()

  requestAnimationFrame(draw)
}

draw()

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      player.pos.add(new Vector(0, -1))
      break
    case 'ArrowDown':
      player.pos.add(new Vector(0, 1))
      break
    case 'ArrowLeft':
      player.pos.add(new Vector(-1, 0))
      break
    case 'ArrowRight':
      player.pos.add(new Vector(1, 0))
      break
  }

  draw()
})
