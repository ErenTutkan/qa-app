import appAxios from "@/axios/appAxios";

export default {
  namespaced: true,
  state: {
    list: [],
    selected: null,
    categoryIds: [],
  },
  mutations: {
    setList(state, list) {
      state.list = list;
    },
    setSelected(state, id) {
      state.selected = id;
    },
    addCategory(state, category) {
      state.list.push(category);
    },
    deleteCategory(state, id) {
      state.list = state.list.filter((l) => l.id !== id);
    },
    setCategoryItem(state, item) {
      var categoryItem = state.list.find((l) => l.id === item?.id);
      categoryItem.title = item.title;
    },
    setCategorySelect(state, id) {
      var categoryItem = state.list.find((l) => l.id === id);
      categoryItem.selected = true;
    },
    setCategoryIds(state, categoryIds) {
      state.categoryIds = categoryIds;
    },
  },
  actions: {
    fetchList({ commit, rootGetters }) {
      appAxios.get("/categories").then(({ data: categoryList }) => {
        const currentUser = rootGetters["users/currentUser"];
        const userCategoryID = currentUser?.categoryId;
        const updatedList = categoryList?.map((c) => ({
          ...c,
          selected: userCategoryID === c.id,
        }));
        commit("setList", updatedList || []);
      });
    },
  },
  getters: {
    categoryList: (state) => state.list,
    getSelected: (state) => state.selected,
    getCategoryIds: (state) => state.categoryIds,
    // categoryList(state, getters, rootStates) {
    //     const userCategoryID = rootStates?.users?.user?.categoryId;
    //     return state.list?.map(c => {
    //         return {
    //             ...c,
    //             selected : userCategoryID === c.id
    //         }
    //     })
    // }
  },
};
