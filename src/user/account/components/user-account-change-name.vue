<template>
  <div class="user-account-change-name">
    <div class="form">
      <h2 class="header">修改名称</h2>
      <TextField v-model="data.newName" placeholder="请输入新的用户名" />
      <TextField
        v-if="data.newName"
        v-model="data.password"
        placeholder="验证用户登录密码"
        type="password"
      />
      <ButtonField text="提交" size="large" @click="onClickSubmitBtn" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import TextField from '@/app/components/text-field.vue';
import ButtonField from '@/app/components/button-field.vue';
import { reactive, computed } from 'vue';
import store from '../../../app/app.store';

const data = reactive({
  // 修改后的用户名
  newName: '',
  // 密码
  password: '',
});

// 当前用户
const currentUser = computed(() => store.getters['user/currentUser']);

// 点击提交按钮
const onClickSubmitBtn = async () => {
  if (!data.newName) {
    return store.dispatch('notification/pushMessage', {
      content: '请输入新的用户名',
    });
  }
  try {
    await store.dispatch('user/account/updateUserAccount', {
      userId: currentUser.value.id,
      body: {
        update: {
          name: data.newName,
        },
        validate: {
          password: data.password,
        },
      },
    });
    store.dispatch('notification/pushMessage', {
      content: '成功修改了用户名',
    });
    data.newName = '';
    data.password = '';
  } catch (error: any) {
    store.dispatch('notification/pushMessage', {
      content: error.data.message,
    });
  }
};
</script>

<style scoped>
.user-account-change-name {
  padding-bottom: 32px;
}
</style>
