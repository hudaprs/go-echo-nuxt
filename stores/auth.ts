// Pinia
import { defineStore } from 'pinia'

// Constants
import { AUTH_STATE_INITIAL } from '~~/utils/constants/auth/auth'

// Helpers
import { commonLoadingMap } from '~~/utils/helpers/common/common'

// Interfaces
import {
  IAuthAttrsLogin,
  IAuthAttrsRegister
} from '~~/utils/interfaces/auth/authAttrs'
import {
  IAuthResponseUser,
  IAuthResponseToken
} from '~~/utils/interfaces/auth/authResponse'
import { IAuthStoreState } from '~~/utils/interfaces/auth/authStore'

// Api
import * as api from '~~/api/auth'

export const useAuthStore = defineStore('auth', {
  persist: {
    paths: ['token', 'refreshToken', 'user']
  },
  state: (): IAuthStoreState => AUTH_STATE_INITIAL,
  getters: {
    isAuthenticated: (state): boolean => {
      return state.token !== '' && state.refreshToken !== ''
    }
  },
  actions: {
    /**
     * @description Register user
     *
     * @param {IAuthAttrsRegister} form
     *
     * @return {Promise<IAuthResponseUser>} Promise<IAuthResponseUser>
     */
    register: async function (
      form: IAuthAttrsRegister
    ): Promise<IAuthResponseUser> {
      this.loading = commonLoadingMap(this.loading, 'isCreateEditLoading', true)

      try {
        const response = await api.register(form)

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.loading = commonLoadingMap(
          this.loading,
          'isCreateEditLoading',
          false
        )
      }
    },

    /**
     * @description Login user
     *
     * @return {Promise<IAuthResponseToken>} Promise<IAuthResponseToken>
     */
    login: async function (form: IAuthAttrsLogin): Promise<IAuthResponseToken> {
      this.loading = commonLoadingMap(this.loading, 'isCreateEditLoading', true)

      try {
        const response = await api.login(form)
        const { token, refreshToken } = response.result

        this.token = token
        this.refreshToken = refreshToken

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.loading = commonLoadingMap(
          this.loading,
          'isCreateEditLoading',
          false
        )
      }
    },

    /**
     * @description Get authenticated user
     *
     * @return {Promise<IAuthResponseUser>} Promise<IAuthResponseUser>
     */
    me: async function (): Promise<IAuthResponseUser> {
      this.loading = commonLoadingMap(this.loading, 'isDetailLoading', true)

      try {
        const response = await api.me()

        this.user = response.result

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.loading = commonLoadingMap(this.loading, 'isDetailLoading', false)
      }
    },

    /**
     * @description Refresh token of user
     *
     * @return {Promise<IAuthResponseToken>} Promise<IAuthResponseToken>
     */
    refresh: async function (): Promise<IAuthResponseToken> {
      this.loading = commonLoadingMap(this.loading, 'isDetailLoading', true)

      try {
        const response = await api.refresh()
        const { token, refreshToken } = response.result

        this.token = token
        this.refreshToken = refreshToken

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.loading = commonLoadingMap(this.loading, 'isDetailLoading', false)
      }
    },

    /**
     * @description Logout user
     *
     * @return {Promise<void>} Promise<void>
     */
    logout: async function (): Promise<void> {
      this.loading = commonLoadingMap(this.loading, 'isDeleteLoading', true)

      try {
        await api.logout()

        this.loading = AUTH_STATE_INITIAL.loading
        this.token = AUTH_STATE_INITIAL.token
        this.refreshToken = AUTH_STATE_INITIAL.refreshToken
        this.user = AUTH_STATE_INITIAL.user
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.loading = commonLoadingMap(this.loading, 'isDeleteLoading', false)
      }
    }
  }
})
