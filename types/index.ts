export interface UserData {
  userName: string
  email: string
  id: string
  thumbnail: string
}

export interface ApiResponse<T> {
  token?: string
  data: T
  ok: boolean
}
