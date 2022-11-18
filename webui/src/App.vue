<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">picizen</a>
      <i class="bi bi-activity activity-animation"></i>
    </div>
  </nav>

  <div class="container-fluid">
    <div class="row">
      <div class="col-1">
        <ul class="nav flex-column text-center">
          <li class="nav-item">
            <router-link :to="{ name: 'Home' }" class="nav-link" active-class="active">
              <i class="bi bi-house"></i>
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'PhotoList' }" class="nav-link" active-class="active">
              <i class="bi bi-images"></i>
              Photos
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'AlbumList' }" class="nav-link" active-class="active">
              <i class="bi bi-journal-album"></i>
              Albums
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Upload' }" class="nav-link" active-class="active">
              <i class="bi bi-upload"></i>
              Upload
            </router-link>
          </li>
        </ul>
      </div>
      <div class="col">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
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
