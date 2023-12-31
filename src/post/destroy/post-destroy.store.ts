import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface PostDestroyStoreState {
  loading: boolean;
}

export interface DeletePostOptions {
  postId?: number;
}

export const postDestroyStoreModule: Module<PostDestroyStoreState, RootState> =
  {
    /**
     * 命名空间
     */
    namespaced: true,

    /**
     * 数据
     */
    state: {
      loading: false,
    } as PostDestroyStoreState,

    /**
     * 获取器
     */
    getters: {
      loading(state) {
        return state.loading;
      },
    },

    /**
     * 修改器
     */
    mutations: {
      setLoading(state, data) {
        state.loading = data;
      },
    },

    /**
     * 动作
     */
    actions: {
      async deletePost({ commit }, options: DeletePostOptions = {}) {
        commit('setLoading', true);

        const { postId } = options;

        try {
          const response = await apiHttpClient.delete(`posts/${postId}`);
          commit('setLoading', false);

          return response;
        } catch (error) {
          commit('setLoading', false);

          const _error = error as any;

          if (_error.response) {
            throw _error.response;
          }
        }
      },
    },

    /**
     * 模块
     */
    modules: {},
  };
