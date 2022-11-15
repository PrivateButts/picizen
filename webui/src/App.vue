<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">picizen</a>
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

</style>
