// Pinia
import { defineStore } from 'pinia'

// Api
import { $api } from '~~/api/base'

// Constants
import { COMMON_LOADING } from '~~/utils/constants/common/common'
import {
  commonLoadingDataMap,
  commonLoadingMap
} from '~~/utils/helpers/common/common'

// Interfaces
import {
  ITodoAttrsCreate,
  ITodoAttrsUpdate,
  ITodoAttrsDelete,
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
    list: [],
    detail: null
  }),
  actions: {
    /**
     * @description Get list of todo
     *
     * @return {Promise<ITodoResponseList>} Promise<ITodoResponseList>
     */
    index: async function (): Promise<ITodoResponseList> {
      this.loading = commonLoadingMap(this.loading, 'isDefaultLoading', true)

      try {
        const response = await $api<ITodoResponseList>('/v1/todos')

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
     * @param {ITodoAttrsCreate} payload
     *
     * @return {Promise<ITodoResponseDetail>} Promise<ITodoResponseDetail>
     */
    create: async function (
      payload: ITodoAttrsCreate
    ): Promise<ITodoResponseDetail> {
      this.loading = commonLoadingMap(this.loading, 'isCreateEditLoading', true)

      try {
        const response = await $api<ITodoResponseDetail>('/v1/todos', {
          method: 'post',
          body: payload.body
        })

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
      this.list = commonLoadingDataMap(
        payload.params.id,
        this.list,
        'isDetailLoading',
        true
      )

      try {
        const response = await $api<ITodoResponseDetail>('/v1/todos', {
          params: { id: payload.params.id }
        })

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.list = commonLoadingDataMap(
          payload.params.id,
          this.list,
          'isDetailLoading',
          true
        )
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
        const response = await $api<ITodoResponseDetail>('/v1/todos', {
          params: payload.params,
          method: 'patch',
          body: payload.body
        })

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
     * @param {ITodoAttrsDelete} payload
     *
     * @return {Promise<ITodoResponseDetail>} Promise<ITodoResponseDetail>
     */
    delete: async function (
      payload: ITodoAttrsDelete
    ): Promise<ITodoResponseDetail> {
      this.list = commonLoadingDataMap(
        payload.params.id,
        this.list,
        'isDeleteLoading',
        true
      )

      try {
        const response = await $api<ITodoResponseDetail>('/v1/todos', {
          params: payload.params,
          method: 'delete'
        })

        return Promise.resolve(response)
      } catch (err) {
        return Promise.reject(err)
      } finally {
        this.list = commonLoadingDataMap(
          payload.params.id,
          this.list,
          'isDeleteLoading',
          false
        )
      }
    }
  }
})
