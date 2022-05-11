<script>
import NewCategory from "../../../../components/CategoriesView/NewCategory.vue";
import CategoryList from "@/components/CategoriesView/CategoryList.vue";
export default {
  data() {
    return {
      saveStatus: false,
    };
  },
  methods: {
    CloseSave() {
      this.saveStatus = false;
    },
  },
  computed: {
    showSave() {
      return this.saveStatus;
    },
  },
  components: { NewCategory, CategoryList },
};
</script>

<template>
  <div class="container-fluid">
    <div class="row mt-3">
      <div class="col-6 offset-3">
        <div class="card">
          <div class="card-header d-flex justify-content-between">
            <button @click="saveStatus = true" class="btn btn-primary btn-sm">
              Kategori Kaydet
            </button>
            <h4 class="">Kategoriler</h4>
            <div></div>
          </div>
          <NewCategory v-if="showSave" :saveStatus="CloseSave"></NewCategory>
          <CategoryList v-if="!saveStatus"></CategoryList>
        </div>
      </div>
    </div>
  </div>
</template>
