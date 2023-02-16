// Pinia
import { defineStore } from 'pinia'

// Api
import * as api from '~~/api/role'

// Constants
import {
  COMMON_LOADING,
  COMMON_PAGINATION
} from '~~/utils/constants/common/common'
import { commonLoadingMap } from '~~/utils/helpers/common/common'

// Interfaces
import {
  IRoleAttrsStore,
  IRoleAttrsUpdate,
  IRoleAttrsDestroy,
  IRoleAttrsShow,
  IRoleAttrsIndex
} from '~~/utils/interfaces/role/roleAttrs'
import {
  IRoleResponseList,
  IRoleResponseDetail,
  IRoleResponseDetailWithPermission
} from '~~/utils/interfaces/role/roleResponse'
import { IRoleStoreState } from '~~/utils/interfaces/role/roleStore'

export const useRoleStore = defineStore('role', {
  state: (): IRoleStoreState => ({
    loading: COMMON_LOADING,
    list: { ...COMMON_PAGINATION, rows: [] },
    detail: null
  }),
  actions: {
    /**
     * @description Reset state
     *
     * @param {string} stateKey
     *
     * @return {void} void
     */
    reset: function (stateKey: 'list' | 'detail'): void {
      switch (stateKey) {
        case 'list':
          this.list = { ...COMMON_PAGINATION, rows: [] }
          break
        case 'detail':
          this.detail = null
          break
        default:
          return
      }
    },

    /**
     * @description Get list of role
     *
     * @param {IRoleAttrsIndex} payload
     *
     * @return {Promise<IRoleResponseList>} Promise<IRoleResponseList>
     */
    index: async function (
      payload: IRoleAttrsIndex
    ): Promise<IRoleResponseList> {
      this.loading = commonLoadingMap(this.loading, 'isDefaultLoading', true)

      try {
        const response = await api.index(payload)
        this.list = response.result

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.loading = commonLoadingMap(this.loading, 'isDefaultLoading', false)
      }
    },

    /**
     * @description Create role
     *
     * @param {IRoleAttrsStore} payload
     *
     * @return {Promise<IRoleResponseDetail>} Promise<IRoleResponseDetail>
     */
    store: async function (
      payload: IRoleAttrsStore
    ): Promise<IRoleResponseDetail> {
      this.loading = commonLoadingMap(this.loading, 'isCreateEditLoading', true)

      try {
        const response = await api.store(payload)

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
     * @description Get detail of role
     *
     * @param {IRoleAttrsShow} payload
     *
     * @return {Promise<IRoleResponseDetailWithPermission>} Promise<IRoleResponseDetailWithPermission>
     */
    show: async function (
      payload: IRoleAttrsShow
    ): Promise<IRoleResponseDetailWithPermission> {
      this.loading = commonLoadingMap(this.loading, 'isDetailLoading', true)

      try {
        const response = await api.show(payload)

        this.detail = response.result

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.loading = commonLoadingMap(this.loading, 'isDetailLoading', false)
      }
    },

    /**
     * @description Update role
     *
     * @param {IRoleAttrsUpdate} payload
     *
     * @return {Promise<IRoleResponseDetail>} Promise<IRoleResponseDetail>
     */
    update: async function (
      payload: IRoleAttrsUpdate
    ): Promise<IRoleResponseDetail> {
      this.loading = commonLoadingMap(this.loading, 'isCreateEditLoading', true)

      try {
        const response = await api.update(payload)

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
     * @description Delete role
     *
     * @param {IRoleAttrsDestroy} payload
     *
     * @return {Promise<IRoleResponseDetail>} Promise<IRoleResponseDetail>
     */
    destroy: async function (
      payload: IRoleAttrsDestroy
    ): Promise<IRoleResponseDetail> {
      this.loading = commonLoadingMap(this.loading, 'isDeleteLoading', true)

      try {
        const response = await api.destroy(payload)

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.loading = commonLoadingMap(this.loading, 'isDeleteLoading', false)
      }
    }
  }
})
