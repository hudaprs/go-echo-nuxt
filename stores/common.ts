// Pinia
import { defineStore } from 'pinia'

// Interfaces
import { ICommonStoreState } from '~~/utils/interfaces/common/commonStore'

// Constants
import { COMMON_STATE_INITIAL } from '~~/utils/constants/common/common'

export const useCommonStore = defineStore('common', {
  state: (): ICommonStoreState => COMMON_STATE_INITIAL,
  actions: {
    /**
     * @description Handle modal refetch
     *
     * @param {ICommonStoreState['modalRefetchOptions']} options
     *
     * @return {void} void
     */
    SET_MODAL_REFETCH: function (
      options: ICommonStoreState['modalRefetchOptions']
    ) {
      this.modalRefetchOptions = { ...this.modalRefetchOptions, ...options }
    },

    /**
     * @description Clear modal refetch
     *
     * @param {function} callback
     *
     * @return {void} void
     */
    CLEAR_MODAL_REFETCH: function (callback?: () => void) {
      this.modalRefetchOptions = COMMON_STATE_INITIAL.modalRefetchOptions

      // Check if theres any callback'
      // Force callback to be called
      if (callback) callback()
    }
  }
})
