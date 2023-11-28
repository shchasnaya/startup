export interface userModel {
  email: string
  password?: string
  name: string
  sphere: string
  organization: string
}

export interface loginModel {
  username: string
  password: string
}

export interface confirmPasswordModel {
  email: string
  password: string
  confirmCode: string
}