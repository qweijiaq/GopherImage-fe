import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';
import { File } from '../../file/create/file-create.store';

export interface PostCreateStoreState {
  audit: {
    id: number;
    status: string;
  } | null;
  status: string | null;
  unsaved: boolean;
  postId: number | null;
  title: string;
  content: string;
  loading: boolean;
}

export interface CreatePostData {
  title: string;
  content?: string;
  status?: string;
}

export interface CreatePostOptions {
  data?: CreatePostData;
  file?: File;
}

export const postCreateStoreModule: Module<PostCreateStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    audit: null,
    status: null,
    unsaved: false,
    postId: null,
    title: '',
    content: '',
    loading: false,
  } as PostCreateStoreState,

  /**
   * 获取器
   */
  getters: {
    audit(state) {
      return state.audit;
    },

    status(state) {
      return state.status;
    },

    unsaved(state) {
      return state.unsaved;
    },

    postId(state) {
      return state.postId;
    },

    title(state) {
      return state.title;
    },

    content(state) {
      return state.content;
    },

    loading(state) {
      return state.loading;
    },

    isPendingAudit(state) {
      return state.audit && state.audit.status === 'pending';
    },

    isApprovedAudit(state) {
      return state.audit && state.audit.status === 'approved';
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setAudit(state, data) {
      state.audit = data;
    },

    setStatus(state, data) {
      state.status = data;
    },

    setUnsaved(state, data) {
      state.unsaved = data;
    },

    setPostId(state, data) {
      state.postId = data;
    },

    setTitle(state, data) {
      state.title = data;
    },

    setContent(state, data) {
      state.content = data;
    },

    setLoading(state, data) {
      state.loading = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async createPost({ commit, dispatch }, options: CreatePostOptions = {}) {
      commit('setLoading', true);

      const { data, file } = options;

      try {
        const response = await apiHttpClient.post(`posts`, data);
        commit('setLoading', false);
        commit('setPostId', response.data.insertId);

        if (file) {
          dispatch(
            'file/create/createFile',
            {
              file,
              postId: response.data.insertId,
            },
            { root: true },
          );
        }

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
