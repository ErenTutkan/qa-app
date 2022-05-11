<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      category: null,
      editMode: false,
    };
  },
  mounted() {
    this.category = {
      ...this.item,
    };
  },
  methods: {
    deleteItem() {
      const isDelete = confirm(
        `${this.item.title} Adlı Kategori'yi silmek İstiyor musun`
      );
      if (isDelete) {
        this.$appAxios
          .delete(`/categories/${this.item.id}`)
          .then(({ status }) => {
            if (status === 200) {
              this.$store.commit("categories/deleteCategory", this.item.id);
            }
          });
      }
    },
    updateItem() {
      delete this.category.selected;
      this.$appAxios
        .patch(`/categories/${this.item.id}`, this.category)
        .then(({ status, data: updatedData }) => {
          if (status === 200) {
            this.$store.commit("categories/setCategoryItem", updatedData);
            this.editMode = false;
          }
        });
    },
  },
};
</script>

<template>
  <tbody>
    <tr v-if="editMode">
      <td>
        <input type="text" v-model="category.title" class="form-control" />
      </td>
      <td>
        <button class="btn btn-success mx-2" @click="updateItem">Kaydet</button>

        <button class="btn btn-warning" @click="editMode = false">İptal</button>
      </td>
    </tr>
    <tr v-else>
      <td>{{ item.title }}</td>
      <td>
        <button @click="editMode = !editMode" class="btn btn-warning mx-2">
          Düzenle
        </button>
        <button @click="deleteItem" class="btn btn-danger">Sil</button>
      </td>
    </tr>
  </tbody>
</template>
