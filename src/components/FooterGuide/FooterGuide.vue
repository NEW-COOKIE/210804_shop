<template>
  <div class="footer_guide">
    <span class="guide_item" :class="{on: $route.path === '/msite'}" @click="goto('/msite')">
      <span>
        <i class="iconfont icon-icon-test"></i>
      </span>
      <span>{{$t('footer_home')}}</span>
    </span>

    <span class="guide_item" :class="{on: $route.path === '/search'}" @click="goto('/search')">
      <span>
        <i class="iconfont icon-search"></i>
      </span>
      <span>{{$t('footer_search')}}</span>
    </span>

    <span class="guide_item" :class="{on: $route.path === '/order'}" @click="goto('/order')">
      <span>
        <i class="iconfont icon-emaxcitygerenxinxitubiaoji03"></i>
      </span>
      <span>{{$t('footer_order')}}</span>
    </span>

    <span class="guide_item" :class="{on: $route.path === '/profile'}" @click="goto('/profile')">
      <span>
        <i class="iconfont icon-yonghudianji"></i>
      </span>
      <span>{{$t('footer_own')}}</span>
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      goto(path) {
        
        /* // 如果新的路由地址不等于旧的路由地址 则跳转到新的路由地址
        if (path !== this.$route.path) {
          this.$router.replace(path);
        } */

        // 如果新的路由地址不等于旧的路由地址 则跳转到新的路由地址 如果重复点击则刷新页面
        if (path !== this.$route.path) {
          this.$router.replace(path);
        }else {
          window.location = path;
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl";
  .footer_guide
    display flex
    width 100%
    height 50px
    background #fff
    position fixed
    left 0
    bottom 0
    .guide_item
      top-border-1px(#ccc)
      display flex
      flex-direction column
      width 25%
      text-align center
      &.on
        color $green
      span
        font-size 14px
        margin-top 3px
        i
          font-size 24px
</style>
