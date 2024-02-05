export interface UserData {
  userName: string
  email: string
  id: string
  thumbnail: string
}

export interface ApiResponse<T> {
  msg: string
  token?: string
  data: T
  ok: boolean
}

export interface Target {
  name: string
  price: number
  _id?: string
}

export interface Pocket {
  _id: string
  status: boolean
  collect: boolean
  category: 'tw' | 'jp' | 'cn' | 'ita'
  shopName: string
  region: string
  targets: Target[]
  totalPrice: number
  memo: string
  createdAt: string
  updatedAt: string
  rank?: 'S' | 'A' | 'B' | 'C'
}
