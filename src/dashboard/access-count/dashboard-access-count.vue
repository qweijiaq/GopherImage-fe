<template>
  <div class="dashboard-access-count">
    <DashboardAccessCountFilterDatetime />
    <DashboardAccessCountPanels />
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted } from 'vue';
import { socket } from '../../app/app.service';
import store from '../../app/app.store';
import DashboardAccessCountPanels from './components/dashboard-access-count-panels.vue';
import DashboardAccessCountFilterDatetime from './components/dashboard-access-count-filter-datetime.vue';

// 访问日志生成
const onAccessLogCreated = (action: string) => {
  store.commit('dashboard/accessCount/increaseAccessCount', action);
};

socket.on('accessLogCreated', onAccessLogCreated);

onUnmounted(() => {
  socket.off('accessLogCreated', onAccessLogCreated);
});
</script>

<style scoped>
@import './styles/dashboard-access-count.css';
</style>
