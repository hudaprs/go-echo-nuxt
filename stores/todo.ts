// Pinia
import { defineStore } from 'pinia'

// Api
import * as api from '~~/api/todo'

// Constants
import {
  COMMON_LOADING,
  COMMON_PAGINATION
} from '~~/utils/constants/common/common'
import {
  commonLoadingDataMap,
  commonLoadingMap
} from '~~/utils/helpers/common/common'

// Interfaces
import {
  ITodoAttrsIndex,
  ITodoAttrsStore,
  ITodoAttrsUpdate,
  ITodoAttrsDestroy,
  ITodoAttrsShow
} from '~~/utils/interfaces/todo/todoAttrs'
import {
  ITodoResponseList,
  ITodoResponseDetail
} from '~~/utils/interfaces/todo/todoResponse'
import { ITodoStoreState } from '~~/utils/interfaces/todo/todoStore'

export const useTodoStore = defineStore('todo', {
  state: (): ITodoStoreState => ({
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
     * @description Get list of todo
     *
     * @param {ITodoAttrsIndex} payload
     *
     * @return {Promise<ITodoResponseList>} Promise<ITodoResponseList>
     */
    index: async function (
      payload: ITodoAttrsIndex
    ): Promise<ITodoResponseList> {
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
     * @description Create todo
     *
     * @param {ITodoAttrsStore} payload
     *
     * @return {Promise<ITodoResponseDetail>} Promise<ITodoResponseDetail>
     */
    create: async function (
      payload: ITodoAttrsStore
    ): Promise<ITodoResponseDetail> {
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
     * @description Get detail of todo
     *
     * @param {ITodoAttrsShow} payload
     *
     * @return {Promise<ITodoResponseDetail>} Promise<ITodoResponseDetail>
     */
    show: async function (
      payload: ITodoAttrsShow
    ): Promise<ITodoResponseDetail> {
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
     * @description Update todo
     *
     * @param {ITodoAttrsUpdate} payload
     *
     * @return {Promise<ITodoResponseDetail>} Promise<ITodoResponseDetail>
     */
    update: async function (
      payload: ITodoAttrsUpdate
    ): Promise<ITodoResponseDetail> {
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
     * @description Delete todo
     *
     * @param {ITodoAttrsDestroy} payload
     *
     * @return {Promise<ITodoResponseDetail>} Promise<ITodoResponseDetail>
     */
    destroy: async function (
      payload: ITodoAttrsDestroy
    ): Promise<ITodoResponseDetail> {
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
