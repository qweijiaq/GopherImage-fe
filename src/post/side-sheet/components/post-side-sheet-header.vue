<template>
  <div class="post-side-sheet-header">
    <div class="media">
      <img :src="post.file.size.medium" class="image" />
    </div>
    <div class="content">
      <PostSideSheetHeaderPayment v-if="!canDownload" />
      <PostSideSheetHeaderDownload v-if="canDownload" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import store from '../../../app/app.store';
import PostSideSheetHeaderDownload from './post-side-sheet-header-download.vue';
import PostSideSheetHeaderPayment from './post-side-sheet-header-payment.vue';

const sideSheetProps = computed(() => store.getters['layout/sideSheetProps']);

const post = computed(() => sideSheetProps.value.post);

const canDownload = computed(() => store.getters['download/canDownload']);
</script>

<style scoped>
@import './styles/post-side-sheet-header.css';
</style>
