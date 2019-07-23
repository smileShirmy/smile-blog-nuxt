<template>
  <ul class="comment-list">
    <li class="comment-item" v-for="comment in comments" :key="comment.id">
      <img class="avatar" :src="gravatar(comment.email)" :alt="comment.nickname || '匿名用户'">
      <section class="comment-detail markdown">
        <div class="nickname">
          <img class="mobile-avatar" :src="gravatar(comment.email)" :alt="comment.nickname || '匿名用户'">
          <a v-if="comment.website" class="website icon icon-planet" :href="comment.website" target="_blank"></a>
          <span>{{comment.nickname}}</span>
        </div>
        <div class="content" v-html="comment.content"></div>
        <section class="reply-wrapper markdown" v-if="comment.parent_id !== 0">
          <div class="reply-nickname" v-if="comment.replyName">@{{comment.replyName}}:</div>
          <div v-html="comment.replyContent"></div>
        </section>
        <footer class="comment-footer">
          <time class="time" :datetime="comment.createdDate | filterTime">{{comment.created_date | filterTime}}</time>
          <div class="tools">
            <i class="icon icon-like" :class="{'is-like': isLike(comment.id)}" @click="likeComment(comment)">
              <span class="like-count">{{comment.like}}</span>
            </i>
            <i class="icon icon-reply" @click="reply(comment)"></i>
          </div>
        </footer>
        <div class="split"></div>
      </section>
    </li>
    <loading v-if="loading"></loading>
    <empty v-if="!loading && !comments.length" :message="'还没有评论 /(ㄒoㄒ)/~~'" :isBack="false"></empty>
  </ul>
</template>

<script>
import gravatar from '@/services/gravatar/gravatar'

export default {
  props: {
    comments: {
      type: Array,
      required: true
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      likeComments: []
    }
  },

  methods: {
    isLike(commentId) {
      return this.likeComments.includes(commentId)
    },

    reply(commentId) {
      this.$emit('reply', commentId)
    },

    gravatar(email) {
      return gravatar(email)
    },

    async likeComment(item) {
      if (this.likeComments.includes(item.id)) {
        return
      }
      try {
        const res = this.$store.dispatch('article/likeComment', item.id)
        this.likeComments.push(item.id)
        if (process.client) {
          window.localStorage.setItem('LIKE_COMMENTS', JSON.stringify(this.likeComments))
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      }
    },

    getLikeComments() {
      if (process.client) {
        this.likeComments = JSON.parse(window.localStorage.getItem('LIKE_COMMENTS') || '[]')
      }
    }
  },

  created() {
    this.getLikeComments()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.comment-item {
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  margin-bottom: 25px;

  &:last-child {
    margin-bottom: 0;
  }

  .avatar {
    display: inline-block;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #eee;

    @media (max-width: 479px) {
      display: none;
    }
  }

  .comment-detail {
    width: calc(100% - 50px);

    @media (max-width: 479px) {
      width: 100%;
    }

    .nickname {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .mobile-avatar {
        display: none;

        @media (max-width: 479px) {
          display: inline-block;
          width: 26px;
          height: 26px;
          margin-right: 10px;
          border-radius: 50%;
          background-color: #eee;
        }
      }

      .website {
        font-size: $font-size-extra-large;
        margin-right: 6px;
      }

      font-size: $font-size-base;
    }

    .content {
      display: flex;
      align-items: center;
      min-height: 42px;
      margin: 8px 0;
      font-size: 1rem;
    }

    .reply-wrapper {
      box-sizing: border-box;
      padding: 6px 10px;
      font-size: $font-size-base;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      background-color: var(--primary-light-0);

      .reply-nickname {
        font-weight: $font-weight-bold;
      }
    }

    .comment-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .time {
        font-size: $font-size-small;
      }

      .tools {
        display: flex;
        justify-content: flex-start;

        >i {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          margin-right: 10px;
          cursor: pointer;

          &:last-child {
            margin-right: 0;
          }

          .like-count {
            margin-left: 5px;
          }
        }

        .is-like {
          color: var(--theme-active);
        }
      }
    }

    .split {
      box-sizing: border-box;
      width: 100%;
      height: 1px;
      margin-top: 15px;
      background-color: var(--border-color);
    }
  }
}
</style>
