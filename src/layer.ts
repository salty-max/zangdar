import Colour from './colour'
import Tile from './tile'
import Vector from './vector'

interface DrawingOperation {
  tile: Tile
  char: string
  colour: Colour
  background: Colour
  pos: Vector
  isVisible?: boolean
}

interface LayerConstructionOptions {
  opacity?: number
  isVisible?: boolean
  pos?: Vector
  size: Vector
  zIndex?: number
}

class Layer {
  opacity: number
  isVisible: boolean
  pos: Vector
  size: Vector
  operations: Array<DrawingOperation>
  private _zIndex: number

  constructor(options: LayerConstructionOptions) {
    this.opacity = options.opacity ?? 1
    this.isVisible = options.isVisible ?? true
    this.pos = options.pos ?? Vector.zero()
    this.size = options.size
    this.operations = []
    this._zIndex = options.zIndex ?? 0
  }

  get zIndex(): number {
    return this._zIndex
  }

  draw(tile: Tile) {
    this.operations.push(this.makeDrawingOperation(tile))
  }

  clear() {
    this.operations = []
  }

  private makeDrawingOperation = (tile: Tile): DrawingOperation => ({
    tile,
    char: tile.char,
    colour: tile.colour?.clone(),
    background: tile.background?.clone(),
    pos: tile.pos?.clone(),
    isVisible: tile.isVisible,
  })
}

export default Layer
