<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      currentUser: "users/currentUser",
      categoryList: "categories/categoryList",
      isAuthenticated: "users/isAuthenticated",
    }),
    colorMap() {
      return [
        "text-primary",
        "text-secondary",
        "text-danger",
        "text-info",
        "text-warning",
        "text-success",
        "text-dark",
        "text-muted",
      ];
    },
  },
  watch: {
    categoryList: {
      deep: true,
      immediate: true,
      handler(categoryList) {
        this.getCategoryQuestion(categoryList);
      },
    },
  },
  methods: {
    GoNewQuestion() {
      const categoryIds = this.categoryList
        ?.filter((c) => c.selected)
        ?.map((c) => c.id);
      let selected = null;
      if (categoryIds.length === 1) {
        selected = categoryIds[0];
      }
      this.$store.commit("categories/setSelected", selected);

      this.$router.push({ name: "NewQuestionView" });
    },
    getCategoryQuestion(categoryList) {
      const categoryIds = categoryList
        ?.filter((c) => c.selected)
        ?.map((c) => c.id);
      this.$store.commit("categories/setCategoryIds", categoryIds);
      this.$store.dispatch("questions/fetchList");
    },
  },
  mounted() {
    this.getCategoryQuestion(this.categoryList);
  },
};
</script>
<template>
  <div class="col-2">
    <div v-if="isAuthenticated" class="d-grid gap-2 mb-3">
      <button
        @click="GoNewQuestion"
        class="btn btn-primary d-flex justify-content-between align-items-center"
      >
        <span>Soru Sor</span>
        <i class="fa fa-edit"></i>
      </button>
    </div>
    <div class="list-group">
      <a
        v-for="(category, index) in categoryList"
        :key="category.id"
        href="#"
        :class="{ active: category.selected }"
        @click="category.selected = !category.selected"
        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center category-item"
        aria-current="true"
      >
        <div>
          <i
            :class="{ [colorMap[index % 8]]: true }"
            class="fa fa-hashtag custom-text-light me-2"
          ></i>
          <span> {{ category.title }} </span>
        </div>
        <i v-if="category.selected" class="check-icon fa fa-check-circle"></i>
      </a>
    </div>
  </div>
</template>
