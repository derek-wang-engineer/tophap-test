import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from '@models/auth.model'
import * as admin from 'firebase-admin'
import axios from 'axios'
import AppError from '@models/error.model'
import { StatusCode } from '@enums/status-code.enum'

export default class AuthService {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
      })
    })
  }

  private _generateIdToken = async (email: string, password: string): Promise<string> => {
    const result = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
      email,
      password,
      returnSecureToken: true
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (result.data && result.data.idToken) {
      return result.data.idToken
    }
    throw new AppError('Failed to get token', StatusCode.ERROR)
  }

  login = async (request: ILoginRequest): Promise<ILoginResponse> => {
    const token = await this._generateIdToken(request.email, request.password)
    return {
      token
    }
  }

  register = async (request: IRegisterRequest): Promise<IRegisterResponse> => {
    const newUser = await admin.auth().createUser({
      email: request.email,
      password: request.password,
      displayName: `${request.firstName} ${request.lastName}`
    })
    if (newUser) {
      const token = await this._generateIdToken(request.email, request.password)
      return {
        id: newUser.uid,
        token
      }
    }
    throw new Error('Failed to register new user')
  }

  isValid = async (token: string) => {
    try {
      const decoded = await admin.auth().verifyIdToken(token)
      return decoded.user_id != null
    } catch (error) {
      console.log('Error', error)
      return false
    }
  }
}
