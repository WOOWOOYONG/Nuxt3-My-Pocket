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

interface Target {
  target: string
  price: number
  _id: string
}

export interface Pocket {
  _id: string
  status: boolean
  collect: boolean
  category: string
  shopName: string
  region: string
  targets: Target[]
  memo: string
  createdAt: string
  updatedAt: string
}
