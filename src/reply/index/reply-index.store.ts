import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface ReplyListItem {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
    avatar: number;
  };
}

export type Replies = {
  [commentId: number]: Array<ReplyListItem>;
};

export interface ReplyIndexStoreState {
  loading: boolean;
  replies: Replies;
}

export const replyIndexStoreModule: Module<ReplyIndexStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
    replies: {},
  } as ReplyIndexStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    replies: (state) => (commentId: number) => {
      return state.replies[commentId];
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setReplies(state, data) {
      state.replies = { ...state.replies, ...data };
    },

    removeReplyItem(state, data) {
      const { commentId, replyId } = data;
      state.replies[commentId] = state.replies[commentId].filter(
        (item) => item.id !== replyId,
      );
    },

    addReplyItem(state, data) {
      const commentId = data.repliedComment.id;
      const commentReplies = state.replies[commentId];

      state.replies[commentId] = [...commentReplies, data];
    },

    setReplyItemContent(state, data) {
      const {
        id: replyId,
        repliedComment: { id: commentId },
        content,
      } = data;

      const commentReplies = state.replies[commentId];

      state.replies[commentId] = commentReplies.map((reply) => {
        if (reply.id === replyId) {
          reply.content = content;
        }

        return reply;
      });
    },
  },

  /**
   * 动作
   */
  actions: {
    async getReplies({ commit }, commentId: number) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(
          `comments/${commentId}/replies`,
        );
        commit('setReplies', {
          [commentId]: response.data,
        });
        commit('setLoading', false);

        return response;
      } catch (error: any) {
        commit('setLoading', false);

        throw error.response;
      }
    },
  },
};
