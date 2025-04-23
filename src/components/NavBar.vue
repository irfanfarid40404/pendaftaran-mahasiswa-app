<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
    <div class="container">
      <router-link class="navbar-brand" to="/">Pendaftaran Mahasiswa</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/mahasiswa">Mahasiswa</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
