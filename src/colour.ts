const palette: Record<string, number[]> = {
  // PICO8 Palette in hexadecimal rgba
  none: [0x00, 0x00, 0x00, 0],
  black: [0x00, 0x00, 0x00, 1],
  darkblue: [0x1d, 0x2b, 0x53, 1],
  darkpurple: [0x7e, 0x25, 0x53, 1],
  darkgreen: [0x00, 0x87, 0x51, 1],
  brown: [0xab, 0x52, 0x36, 1],
  darkgrey: [0x5f, 0x57, 0x4f, 1],
  lightgray: [0xc2, 0xc3, 0xc7, 1],
  white: [0xff, 0xf1, 0xe8, 1],
  red: [0xff, 0x00, 0x4d, 1],
  orange: [0xff, 0xa3, 0x00, 1],
  yellow: [0xff, 0xec, 0x27, 1],
  green: [0x00, 0xe4, 0x36, 1],
  blue: [0x29, 0xad, 0xff, 1],
  indigo: [0x83, 0x76, 0x9c, 1],
  pink: [0xff, 0x77, 0xa8, 1],
  peach: [0xff, 0xcc, 0xaa, 1],
}

class Colour {
  private _r: number
  private _g: number
  private _b: number
  private _a: number
  private _cssString: string

  constructor(
    r: number = 255,
    g: number = 255,
    b: number = 255,
    a: number = 1,
  ) {
    this._r = r
    this._g = g
    this._b = b
    this._a = a

    this._cssString = this.makeCssString()
  }

  get r(): number {
    return this._r
  }
  get g(): number {
    return this._g
  }
  get b(): number {
    return this._b
  }
  get a(): number {
    return this._a
  }
  get cssString(): string {
    return this._cssString
  }
  set r(r: number) {
    this._r = r
    this._cssString = this.makeCssString()
  }
  set g(g: number) {
    this._g = g
    this._cssString = this.makeCssString()
  }
  set b(b: number) {
    this._b = b
    this._cssString = this.makeCssString()
  }
  set a(a: number) {
    this._a = a
    this._cssString = this.makeCssString()
  }

  private makeCssString(): string {
    return `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`
  }

  clone(): Colour {
    return new Colour(this._r, this._g, this._b, this._a)
  }

  static fromPalette(colour: string): Colour {
    const [r, g, b, a] = palette[colour]
    return new Colour(r, g, b, a)
  }
}

export default Colour
