<template>
  <div class="d-flex flex-column vh-100 overflow-hidden">
    <nav class="navbar navbar-expand-lg bg-light border-bottom">
      <div class="container-fluid">
        <router-link :to="{ name: 'Home' }" class="navbar-brand">picizen</router-link>
        <div v-show="(taskCount > 0)" id="activity-indicator" data-bs-toggle="tooltip" data-bs-placement="bottom" :data-bs-title="activityTooltip"><i class="bi bi-activity activity-animation" ></i></div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar"
          aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
    <div class="container-fluid px-0 flex-grow-1 overflow-hidden">
      <div class="d-flex h-100 overflow-hidden">
        <div class="collapse collapse-horizontal flex-shrink-1 border-end" id="sidebar" :class="{'show': defaultShowMenu}">
          <ul class="nav nav-pills nav-fill flex-column mb-auto text-center h-100">
            <li class="nav-item">
              <router-link :to="{ name: 'Home' }" class="nav-link text-reset py-3 border-bottom" active-class="active">
                <i class="bi bi-house"></i>
                <div>Home</div>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'PhotoList' }" class="nav-link text-reset py-3 border-bottom" active-class="active">
                <i class="bi bi-images"></i>
                <div>Photos</div>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'AlbumList' }" class="nav-link text-reset py-3 border-bottom" active-class="active">
                <i class="bi bi-journal-album"></i>
                <div>Albums</div>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Upload' }" class="nav-link text-reset py-3 border-bottom" active-class="active">
                <i class="bi bi-upload"></i>
                <div>Upload</div>
              </router-link>
            </li>
            <li class="flex-grow-1 border-bottom"></li>
            <li class="nav-item">
              <div v-if="userStore.isAuthenticated">
                <button @click="userStore.logout()" class="nav-link text-reset py-3">
                  <i class="bi bi-door-closed"></i>
                  <div>Logout</div>
                </button>
              </div>
              <div v-else>
                <router-link :to="{ name: 'Login' }" class="nav-link text-reset py-3" active-class="active">
                  <i class="bi bi-person-square"></i>
                  <div>Login</div>
                </router-link>
              </div>
            </li>
          </ul>
        </div>
        <div class="flex-grow-1 pt-2" style="overflow-y: scroll">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';
import { Collapse, Tooltip } from 'bootstrap';
import { onMounted, computed, watch } from 'vue';
import { graphql } from './gql';
import { useUserStore } from './stores/user';

const userStore = useUserStore();

onMounted(() => {
  new Collapse('#sidebar', {
    toggle: false
  })
  new Tooltip('#activity-indicator')
})

const defaultShowMenu = window.innerWidth > 576;

const { result: taskQueue } = useQuery(graphql(`
  query taskQueue{
    taskQueue
  }
`), null, {
  pollInterval: 1000
});

const taskCount = computed(() => taskQueue.value?.taskQueue ?? 0)

const activityTooltip = computed(() => {
  return `There are ${taskCount.value} running tasks`;
})

watch(activityTooltip, (newVal) => {
  const tooltip = Tooltip.getInstance('#activity-indicator')
  if (tooltip) {
    tooltip.setContent({ '.tooltip-inner': activityTooltip.value })
  }
})

</script>

<style scoped>
.nav-item {
  flex-grow:0;
}

.active {
  color: white !important;
  border-radius: 0;
}
.activity-animation {
  font-size: 1.5rem;
  background: linear-gradient(90deg,
      rgba(0, 0, 0, 1) 40%,
      rgba(255, 201, 0, 1) 50%,
      rgba(0, 0, 0, 1) 60%);
  background-size: 600% 600%;

  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  -webkit-animation: ColorTrace 2s linear infinite;
  -moz-animation: ColorTrace 2s linear infinite;
  animation: ColorTrace 2s linear infinite;
  animation-direction: normal;
}

@keyframes ColorTrace {
  0% {
    background-position: 100% 50%
  }

  100% {
    background-position: 0% 50%
  }
}
</style>
