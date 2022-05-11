<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AppHeader",
  data: () => ({}),
  methods: {
    ...mapMutations({
      logout: "users/logout",
    }),
    searchQuestions(e) {
      this.$store.commit("questions/setQuery", e.target.value);
      this.$store.dispatch("questions/fetchList");
    },
    toggleMenu() {
      let show = false;
      if (this.menuOpened) {
        show = false;
      } else {
        show = true;
      }
      this.$store.commit("setShow", show);
    },
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "users/isAuthenticated",
      currentUser: "users/currentUser",
      menuOpened: "showMenu",
      isAdmin: "users/isAdmin",
    }),
  },
};
</script>
<template>
  <nav
    class="navbar navbar-dark navbar-expand-lg sticky-top"
    style="background-color: #8409de"
  >
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'HomeView' }"
        >QA</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              active-class="active"
              :to="{ name: 'HomeView' }"
              class="nav-link"
              >Anasayfa</router-link
            >
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" :to="{ name: 'CategoriesView' }"
              >Kategoriler</router-link
            >
          </li>
        </ul>

        <div class="d-flex me-auto">
          <input
            class="form-control searchBox"
            type="search"
            placeholder="Search"
            aria-label="Search"
            @keydown.enter="searchQuestions"
          />
        </div>

        <router-link
          v-if="!isAuthenticated"
          :to="{ name: 'LoginView' }"
          class="btn btn-outline-primary me-0 mb-2"
          >Giriş Yap</router-link
        >
        <ul v-else class="navbar-nav me-0 mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a
              @click="toggleMenu"
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >{{ currentUser.full_name }}</a
            >
            <ul
              :class="{ show: menuOpened }"
              class="dropdown-menu"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <router-link
                  :to="{ name: 'MyQuestionsView' }"
                  class="dropdown-item"
                  >Sorularım</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{ name: 'MyFavoritesView' }"
                  class="dropdown-item"
                  >Favorilerim</router-link
                >
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <router-link
                  :to="{ name: 'MyAccountView' }"
                  class="dropdown-item"
                  >Hesabım</router-link
                >
              </li>
              <li>
                <a class="dropdown-item" @click="logout">Çıkış Yap</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
