<template>
  <div class="comment-container">
    <comment-editor
      ref="editor"
      :isShowReplyContent="isShowReplyContent"
      @closeReplyContent="closeReply"
      @send="onSend"
    ></comment-editor>
    <div class="comment-list-wrapper">
      <comment-list :comments="comments" @reply="onReply" :loading="loading"></comment-list>
    </div>
  </div>
</template>

<script>
import CommentList from "./comment-list";
import CommentEditor from "@/components/base/comment-editor/comment-editor";

export default {
  components: {
    CommentEditor,
    CommentList
  },

  props: {
    comments: {
      type: Array,
      default: () => []
    },

    articleId: {
      type: Number
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isShowReplyContent: false,
      parentId: 0
    };
  },

  methods: {
    onReply(comment) {
      this.parentId = comment.id
      this.$refs.editor.reply = {
        nickname: comment.nickname,
        content: comment.content
      }
      this.isShowReplyContent = true;
    },

    closeReply() {
      this.isShowReplyContent = false
      this.parentId = 0
      this.$refs.editor.reply = {
        nickname: '',
        content: ''
      }
      this.$refs.editor.resetField()
    },

    async onSend(data) {
      if (!this.articleId) {
        return
      }
      if (this.isShowReplyContent) {
        // 回复评论
        if (!this.parentId) {
          return
        }
        try {
          data.articleId = this.articleId
          data.parentId = this.parentId
          const res = await this.$store.dispatch('article/replyComment', data)
          if (res.errorCode === 0) {
            this.closeReply()
            this.$emit('createCommentSuccess')
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e)
        }
      } else {
        // 创建评论
        try {
          data.articleId = this.articleId
          const res = await this.$store.dispatch('article/createComment', data)
          if (res.errorCode === 0) {
            this.$refs.editor.resetField()
            this.$emit('createCommentSuccess')
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e)
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.comment-list-wrapper {
  margin-top: 25px;
}
</style>
