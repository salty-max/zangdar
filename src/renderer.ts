import Layer from './layer'

class Renderer {
  private namedLayers: Record<string, Layer> = {}
  private layers: Array<Layer> = []
  private layerElements: Record<string, HTMLElement> = {}
  private size: number = 16
  private beforeDraw: () => void = () => {}

  frames: number = 0

  addLayer(name: string, layer: Layer) {
    if (name in this.namedLayers) {
      return new Error(`Layer with name ${name} already exists`)
    }

    this.namedLayers[name] = layer
    this.layers.push(layer)
    this.orderLayers()

    return this
  }

  onBeforeDraw(fn: () => void) {
    this.beforeDraw = fn
  }

  commit() {
    this.beforeDraw()

    Object.entries(this.namedLayers).forEach(([name, layer]) => {
      let layerEl = this.layerElements[name]

      if (!layerEl) {
        layerEl = document.createElement('div') as HTMLDivElement
        layerEl.classList.add('zangdar_layer')
        layerEl.style.fontSize = `${this.size}px`
        layerEl.style.top = `${layer.pos.y * this.size}px`
        layerEl.style.left = `${(layer.pos.x * this.size) / 2}px`
        layerEl.style.width = `${(layer.size.x * this.size) / 2}px`
        layerEl.style.height = `${layer.size.y * this.size}px`
        layerEl.style.zIndex = `${layer.zIndex}`

        const root = document.getElementById('zangdar_root') as HTMLDivElement
        root.style.width = `${(layer.size.x * this.size) / 2}px`
        root.style.height = `${layer.size.y * this.size}px`
        root.appendChild(layerEl)
        this.layerElements[name] = layerEl
      }

      layer.operations.forEach((op) => {
        let opEl = document.getElementById(`zangdar_tile_${op.tile.id}`)

        if (!opEl) {
          opEl = document.createElement('div') as HTMLDivElement
          opEl.classList.add('zangdar_tile')
          opEl.id = `zangdar_tile_${op.tile.id}`

          layerEl.appendChild(opEl)
        }

        if (op.isVisible) {
          opEl.innerHTML = op.char.replace(/ /g, '&nbsp;')
          opEl.style.color = op.colour.cssString
          opEl.style.backgroundColor = op.background.cssString
          opEl.style.top = `${op.pos.y * this.size}px`
          opEl.style.left = `${(op.pos.x * this.size) / 2}px`
          opEl.style.display = 'block'
        } else {
          opEl.style.display = 'none'
        }
      })

      layer.clear()
    })

    this.frames++
  }

  private orderLayers() {
    this.layers.sort((a, b) => a.zIndex - b.zIndex)
  }
}

export default Renderer
