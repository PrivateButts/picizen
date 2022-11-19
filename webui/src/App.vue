<template>
  <div class="d-flex flex-column vh-100">
    <nav class="navbar navbar-expand-lg bg-light border-bottom">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">picizen</a>
        <i class="bi bi-activity activity-animation"></i>
      </div>
    </nav>
    <div class="container-fluid px-0 flex-grow-1">
      <div class="d-flex h-100">
        <div class="flex-shrink-1 border-end">
          <ul class="nav nav-pills nav-fill flex-column mb-auto text-center">
            <li class="nav-item">
              <router-link :to="{ name: 'Home' }" class="nav-link py-3 border-bottom" active-class="active">
                <i class="bi bi-house"></i>
                <div>Home</div>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'PhotoList' }" class="nav-link py-3 border-bottom" active-class="active">
                <i class="bi bi-images"></i>
                <div>Photos</div>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'AlbumList' }" class="nav-link py-3 border-bottom" active-class="active">
                <i class="bi bi-journal-album"></i>
                <div>Albums</div>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Upload' }" class="nav-link py-3 border-bottom" active-class="active">
                <i class="bi bi-upload"></i>
                <div>Upload</div>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="flex-grow-1 pt-2">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.nav-link {
  border-radius: 0px;
}

.activity-animation {
  font-size: 1.5rem;
  background: linear-gradient(
    90deg,
    rgba(0,0,0,1) 40%,
    rgba(255,201,0,1) 50%,
    rgba(0,0,0,1) 60%
  );
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
