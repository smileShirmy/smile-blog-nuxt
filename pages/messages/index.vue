<template>
  <div class="messages-container">
    <split-line :icon="'message'" :desc="'留言墙'"></split-line>
    <section class="editor-wrapper">
      <comment-editor ref="editor" :isMessageEditor="true" @send="onSend"></comment-editor>
    </section>
    <ul class="messages-wrapper markdown">
      <li class="message-item" v-for="message in messages" :key="message.id">
        <span v-if="message.nickname" class="nickname">@{{message.nickname}}</span>
        <div class="content">
          <p v-html="marked(message.content)">
          </p>
        </div>
        <time class="time" :datetime="message.createTime | filterTime">{{message.createTime | filterTime}}</time>
      </li>
    </ul>
    <div v-show="isLoadMore" class="load-more" @click="loadMore"></div>
    <loading v-show="loading"></loading>
    <empty v-if="!loading && !messages.length" :message="'还没有留言 /(ㄒoㄒ)/~~'" :isBack="false"></empty>
  </div>
</template>

<script>
import SplitLine from '@/components/base/split-line/split-line'
import CommentEditor from '@/components/base/comment-editor/comment-editor'
import markdown from '@/plugins/marked'
import { mapState } from 'vuex'

export default {
  components: {
    SplitLine,
    CommentEditor
  },

  async fetch({ store, params }) {
    await store.dispatch('message/getMessages', {
      page: 0
    })
  },

  data() {
    return {
      page: 0
    }
  },

  computed: {
    ...mapState({
      messages: state => state.message.messages,
      total: state => state.message.total,
      loading: state => state.message.loading
    }),

    isLoadMore() {
      if (this.messages.length && !this.loading) {
        return this.total % this.messages.length > 0
      } else {
        return false
      }
    }
  },

  methods: {
    // markdown 解析
    marked(content) {
      if (typeof content !== 'string') {
        return ''
      }
      return markdown(content)
    },

    loadMore() {
      if (this.loading) {
        return
      }
      this.page++
      this.$store.dispatch('message/getMoreMessages', {
        page: this.page
      })
    },

    // async getMessages() {
    //   try {
    //     this.loading = true
    //     const res = await message.getMessages(this.page)
    //     if (this.page > 0) {
    //       this.messageList = this.messageList.concat(res.collection)
    //     } else {
    //       this.messageList = res.collection
    //       this.total = res.total
    //     }
    //     this.initImage()
    //     this.loading = false
    //   } catch (e) {
    //     this.loading = false
    //     // eslint-disable-next-line no-console
    //     console.log(e)
    //   }
    // },

    initImage() {
      import('../../services/utils/lazy-img').then(res => {
        res.default('.image-popper')
      })
    },

    async onSend() {

    }

    // async onSend({nickname, content}) {
    //   try {
    //     const res = await message.createMessage({
    //       nickname,
    //       content
    //     })
    //     if (res.errorCode === 0) {
    //       this.$refs.editor.resetField()
    //       this.getMessages()
    //     }
    //   } catch (e) {
    //     // eslint-disable-next-line no-console
    //     console.log(e)
    //   }
    // }
  },

  // created() {
  //   this.getMessages()
  // }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
@import '@/assets/scss/mixin.scss';

.messages-container {
  @include container;

  .editor-wrapper {
    margin: .5em;
  }
}

.messages-wrapper {
  display: flex;
  flex-wrap: wrap;

  .message-item {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: .4em .5em;
    padding: 1em;
    background-color: var(--tag-color);
    transition: all .25s ease-in-out;

    @media (max-width: 479px) {
      margin: .2em .5em;
      padding: .5em;
    }

    &:hover {
      transform: translateY(-2px);
    }

    .nickname {
      height: 24px;
      font-size: $font-size-base;
      font-weight: $font-weight-bold;
    }

    .content {
      flex: 1;
      font-size: $font-size-base;
      padding: .5em 0;

      img {
        width: 50%;
      }
    }

    .time {
      margin-top: 1em;
      font-size: $font-size-base;
      text-align: right;
    }
  }
}

.load-more {
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  margin: 10px auto 0;
  border: 8px solid #dcdfe7;
  border-radius: 50%;
  transition: all .25s ease-in-out;
  cursor: pointer;

  @media (max-width: 479px) {
    width: 30px;
    height: 30px;
  }

  &:hover {
    border-color: var(--theme-active);
    background-color: var(--theme-active);
    transform: scale(.65);
  }
}
</style>
