<script>
export default {
  props: {
    saveStatus: Function,
  },
  data() {
    return {
      categoryItem: {
        title: null,
      },
    };
  },
  methods: {
    onSubmit() {
      this.$appAxios
        .post("/categories", this.categoryItem)
        .then(({ status, data: newCategory }) => {
          if (status === 201) {
            this.$store.commit("categories/addCategory", newCategory);
          }
        });

      this.saveStatus();
    },
  },
};
</script>
<template>
  <div class="card-body">
    <div class="mb-3">
      <label class="form-label">Kategori Adı</label
      ><input
        type="text"
        v-model="categoryItem.title"
        class="form-control"
        placeholder="VueJs"
      />
    </div>

    <div class="mb-3 d-flex justify-content-end align-items-center">
      <button @click="saveStatus" class="btn btn-sm btn-warning mx-2">
        İptal
      </button>

      <button @click="onSubmit" class="btn btn-sm btn-primary">Kaydet</button>
    </div>
  </div>
</template>
