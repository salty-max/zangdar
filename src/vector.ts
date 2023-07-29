class Vector {
  private _x: number
  private _y: number

  constructor(x: number, y: number) {
    this._x = x
    this._y = y
  }

  get x(): number {
    return this._x
  }

  get y(): number {
    return this._y
  }

  add(other: Vector): Vector {
    this._x += other._x
    this._y += other._y
    return this
  }

  subtract(other: Vector): Vector {
    this._x -= other._x
    this._y -= other._y
    return this
  }

  multiply(other: Vector): Vector {
    this._x *= other._x
    this._y *= other._y
    return this
  }

  divide(other: Vector): Vector {
    this._x /= other._x
    this._y /= other._y
    return this
  }

  clone(): Vector {
    return new Vector(this._x, this._y)
  }

  static add(a: Vector, b: Vector): Vector {
    return a.clone().add(b)
  }

  static subtract(a: Vector, b: Vector): Vector {
    return a.clone().subtract(b)
  }

  static multiply(a: Vector, b: Vector): Vector {
    return a.clone().multiply(b)
  }

  static divide(a: Vector, b: Vector): Vector {
    return a.clone().divide(b)
  }

  static zero(): Vector {
    return new Vector(0, 0)
  }
}

export default Vector
