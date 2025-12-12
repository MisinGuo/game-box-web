<template>
  <a 
    :href="finalHref" 
    :style="linkStyle"
    :class="linkClass"
    @click="handleClick"
  >
    <slot>{{ text }}</slot>
  </a>
</template>

<script>
import { computed } from 'vue';
import siteConfig from '../config/site';

export default {
  name: 'CustomLink',
  props: {
    // 链接文本
    text: {
      type: String,
      default: ''
    },
    // 目标路径（相对于域名的路径）
    to: {
      type: String,
      default: ''
    },
    // 外部链接（完整URL）
    href: {
      type: String,
      default: ''
    },
    // 自定义样式
    style: {
      type: Object,
      default: () => ({})
    },
    // 自定义CSS类
    class: {
      type: String,
      default: ''
    },
    // 是否使用跳转域名
    useJumpDomain: {
      type: Boolean,
      default: false
    },
    // 是否在新窗口打开
    target: {
      type: String,
      default: '_self'
    }
  },
  setup(props) {
    // 计算最终的链接地址
    const finalHref = computed(() => {
      // 如果提供了完整的外部链接
      if (props.href) {
        return props.href;
      }
      
      // 如果使用跳转域名
      if (props.useJumpDomain) {
        const baseUrl = siteConfig.jumpDomain;
        const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
        return `${baseUrl}?source=${encodeURIComponent(currentUrl)}`;
      }
      
      // 使用配置的域名
      const baseUrl = siteConfig.hostname;
      return props.to ? `${baseUrl}${props.to}` : baseUrl;
    });

    // 计算链接样式
    const linkStyle = computed(() => {
      const defaultStyle = {
        textDecoration: 'none'
      };
      
      return { ...defaultStyle, ...props.style };
    });

    // 计算链接类名
    const linkClass = computed(() => {
      return props.class || 'custom-link';
    });

    // 处理点击事件
    const handleClick = (event) => {
      // 如果使用跳转域名，添加当前页面参数
      if (props.useJumpDomain) {
        const currentUrl = window.location.href;
        const jumpUrl = `${siteConfig.jumpDomain}?source=${encodeURIComponent(currentUrl)}`;
        event.target.href = jumpUrl;
      }
    };

    return {
      finalHref,
      linkStyle,
      linkClass,
      handleClick
    };
  }
};
</script>

<style scoped>
.custom-link {
  transition: opacity 0.3s ease;
}

.custom-link:hover {
  opacity: 0.8;
}
</style>
