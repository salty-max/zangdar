import Colour from './colour'
import Vector from './vector'

interface TileConstructorOptions {
  char?: string
  colour?: Colour
  background?: Colour
  pos?: Vector
  isVisible?: boolean
}

class Tile {
  char: string
  colour: Colour
  background: Colour
  pos: Vector
  isVisible: boolean

  readonly id: string = Math.random().toString(36).slice(2)

  constructor(options: TileConstructorOptions) {
    this.char = options.char ?? ' '
    this.colour = options.colour ?? Colour.fromPalette('white')
    this.background = options.background ?? Colour.fromPalette('none')
    this.pos = options.pos ?? new Vector(0, 0)
    this.isVisible = options.isVisible ?? true
  }

  clone(): Tile {
    return new Tile({
      char: this.char,
      colour: this.colour,
      background: this.background,
      pos: this.pos,
      isVisible: this.isVisible,
    })
  }
}

export default Tile
