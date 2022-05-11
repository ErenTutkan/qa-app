<template lang="">
  <div class="card-body">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Kategori Adı</th>
          <th scope="col">İşlemler</th>
        </tr>
      </thead>
      <CategoryListItem
        v-for="item in categoryList"
        :key="item.id"
        :item="item"
      ></CategoryListItem>
    </table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CategoryListItem from "./CategoryListItem.vue";
export default {
  components: {
    CategoryListItem,
  },
  computed: {
    ...mapGetters({ categoryList: "categories/categoryList" }),
  },
};
</script>
<style lang=""></style>
