import appAxios from "@/axios/appAxios";

export default {
  namespaced: true,
  state: {
    list: [],
    query: null,
  },
  mutations: {
    setList(state, list) {
      state.list = list;
    },
    setQuery(state, queryString) {
      state.query = queryString;
    },
  },
  actions: {
    fetchList({ commit, state, rootGetters }) {
      let REQUEST_URL = `/questions?_expand=category&_expand=user&_embed=comments&_embed=favorites`;

      const categoryIds = rootGetters["categories/getCategoryIds"];
      if (categoryIds) {
        // [1, 2, 8]
        let categoryQueryParams = categoryIds?.map((c) => `categoryId=${c}`); // ['categoryId=1', 'categoryId=2', 'categoryId=8']
        categoryQueryParams = categoryIds
          ?.map((c) => `categoryId=${c}`)
          .join("&"); // categoryId=1&categoryId=2&categoryId=8
        REQUEST_URL += `&${categoryQueryParams}`;
      }

      if (state.query !== null) {
        REQUEST_URL += `&q=${state.query}`;
      }
      // _expand=category => questions array'inde categoryId = categories araması yapıp dokümani buraya ekliyor..
      appAxios.get(REQUEST_URL).then(({ data: questionList }) => {
        commit("setList", questionList || []);
      });
    },
  },
  getters: {
    questionList: (state) => state.list,
  },
};
