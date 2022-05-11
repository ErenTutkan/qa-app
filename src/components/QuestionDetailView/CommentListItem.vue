<script>
import { mapGetters } from "vuex";
export default {
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      likes: [],
    };
  },
  mounted() {
    this.likes = this.item.likes;
  },
  methods: {
    Like(status) {
      if (this.currentUser === null) {
        return false;
      }
      let REQUEST_METHOD = "POST";
      let REQUEST_URL = `/likes`;
      let REQUEST_DATA = {
        userId: this.currentUser.id,
        commentId: this.item.id,
        status: status,
      };
      const userlike = this.likes.find(
        (l) => l.commentId === this.item.id && l.userId === this.currentUser.id
      );

      if (status) {
        if (this.GetLike) {
          REQUEST_METHOD = "DELETE";
          REQUEST_URL += `/${userlike.id}`;
          REQUEST_DATA = undefined;
        } else if (this.getDislike) {
          REQUEST_METHOD = "PATCH";
          REQUEST_URL += `/${userlike.id}`;
          REQUEST_DATA = {
            status: status,
          };
        }
      } else {
        if (this.GetLike) {
          REQUEST_METHOD = "PATCH";
          REQUEST_URL += `/${userlike.id}`;
          REQUEST_DATA = {
            status: status,
          };
        } else if (this.getDislike) {
          REQUEST_METHOD = "DELETE";
          REQUEST_URL += `/${userlike.id}`;
          REQUEST_DATA = undefined;
        }
      }
      this.$appAxios({
        method: REQUEST_METHOD,
        data: REQUEST_DATA,
        url: REQUEST_URL,
      }).then(({ status, data: like }) => {
        if (status === 201 && REQUEST_METHOD === "POST") {
          this.likes.push(like);
        }
        if (status === 200 && REQUEST_METHOD === "DELETE") {
          this.likes = this.likes.filter((l) => l.id !== userlike.id);
        }
        if (status === 200 && REQUEST_METHOD === "PATCH") {
          this.likes = this.likes.filter((l) => l.id !== userlike.id);
          this.likes.push(like);
        }
      });
    },
  },
  computed: {
    Likes() {
      return this.likes.filter((l) => l.status === true).length;
    },
    Dislike() {
      return this.likes.filter((l) => l.status === false).length;
    },
    ...mapGetters({
      currentUser: "users/currentUser",
    }),
    GetLike() {
      const like = this.likes.filter(
        (l) =>
          l.commentId === this.item.id &&
          l.userId === this.currentUser?.id &&
          l.status === true
      );
      return like.length > 0;
    },
    getDislike() {
      const dislike = this.likes.filter(
        (l) =>
          l.commentId === this.item.id &&
          l.userId === this.currentUser?.id &&
          l.status === false
      );

      return dislike.length > 0;
    },
  },
};
</script>
<template>
  <div class="card text-left mb-3 ms-1 w-100">
    <div class="card-body">
      <div class="mt-3">
        <p class="text-muted" v-html="item.details"></p>
      </div>
    </div>
    <div
      class="card-footer text-muted py-2 question-footer d-flex justify-content-between align-items-center"
    >
      <div class="custom-text-light">
        <i class="fa fa-user-circle me-1"></i>
        {{
          _createdAtInfo(item.user?.full_name, item?.created_at, "cevapladı")
        }}
      </div>
      <div class="question-action-container">
        <a @click="Like(true)" class="like-btn text-muted me-2"
          ><i class="fa fa-thumbs-up" :class="{ 'text-success': GetLike }"></i
          >({{ Likes }})</a
        >
        <a @click="Like(false)" class="dislike-btn text-muted">
          <i
            class="fa fa-thumbs-down"
            :class="{ 'text-danger': getDislike }"
          ></i>
          ({{ Dislike }})
        </a>
      </div>
    </div>
  </div>
</template>
