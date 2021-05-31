export interface ILoginRequest {
  email: string
  password: string
}
export interface ILoginResponse {
  token: string
}

export interface IRegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
}
export interface IRegisterResponse {
  id: string
  token: string
}
