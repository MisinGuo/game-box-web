<template>
  <!-- 模板可以为空，逻辑会自动插入语言切换器 -->
  <div></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const languages = [
  { locale: '/', name: '繁體中文' },
  { locale: '/zh-CN/', name: '简体中文' }
]

const isDropdownOpen = ref(false)
const isMobileDropdownOpen = ref(false)

const getCurrentPath = () => window.location.pathname

const currentLocale = computed(() => {
  const path = getCurrentPath()
  return path.startsWith('/zh-CN/') ? '/zh-CN/' : '/'
})

const currentLanguage = computed(() =>
  languages.find(lang => lang.locale === currentLocale.value) || languages[0]
)

const currentLanguageName = computed(() => currentLanguage.value.name)

const getLanguageIcon = (locale: string) => {
  switch (locale) {
    case '/':
      return '🇹🇼'
    case '/zh-CN/':
      return '🇨🇳'
    default:
      return '🌐'
  }
}

const switchLang = (lang: typeof languages[0]) => {
  if (lang.locale === currentLocale.value) {
    isDropdownOpen.value = false
    isMobileDropdownOpen.value = false
    return
  }

  const currentPath = getCurrentPath()
  let newPath = ''

  if (lang.locale === '/') {
    newPath = currentPath.replace('/zh-CN', '')
  } else {
    newPath = '/zh-CN' + currentPath
  }

  if (newPath !== '/' && !newPath.endsWith('/')) {
    newPath += '/'
  }

  try {
    window.location.href = newPath
  } catch (error) {
    console.error('Language switch failed:', error)
  }
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('#GlobalLangSwitcher')) {
    const langDropdown = document.querySelector('#lang-dropdown') as HTMLElement
    const langBtn = document.querySelector('#lang-switcher-btn') as HTMLElement
    if (langDropdown && langBtn) {
      langDropdown.classList.remove('show')
      langBtn.classList.remove('active')
      setTimeout(() => {
        langDropdown.style.display = 'none'
      }, 300)
    }
    isDropdownOpen.value = false
    isMobileDropdownOpen.value = false
  }
}

const InsertLangSwitcher = () => {
  const navCenterElm = document.querySelector('.vp-navbar-end')
  if (!navCenterElm) return

  if (!document.querySelector('#GlobalLangSwitcher')) {
    const elm = document.createElement('div')
    elm.id = 'GlobalLangSwitcher'
    elm.classList.add('nav-item', 'lang-switcher-wrapper')
    elm.innerHTML = `
      <div class="lang-switcher-container">
        <button class="navbar-lang-button" id="lang-switcher-btn">
          <span class="lang-icon">🌐</span>
          <span class="current-lang">${currentLanguageName.value}</span>
          <span class="dropdown-arrow">▼</span>
        </button>
        <div class="navbar-lang-dropdown" id="lang-dropdown">
          ${languages
            .map(
              lang => `
            <button class="navbar-lang-option" data-locale="${lang.locale}">
              <span class="option-icon">${getLanguageIcon(lang.locale)}</span>
              <span class="option-text">${lang.name}</span>
              <span class="check-icon" style="display: ${
                lang.locale === currentLocale.value ? 'inline' : 'none'
              }">✓</span>
            </button>
          `
            )
            .join('')}
        </div>
      </div>
    `

    // 插入位置
    const docSearchContainer = document.querySelector('#docsearch-container')
    if (docSearchContainer) {
      navCenterElm.insertBefore(elm, docSearchContainer)
    } else {
      const colorModeSwitch = document.querySelector('.vp-color-mode-switch')
      if (colorModeSwitch && colorModeSwitch.parentElement) {
        colorModeSwitch.parentElement.insertAdjacentElement('afterend', elm)
      } else {
        navCenterElm.appendChild(elm)
      }
    }
  }

  // 绑定事件
  const langBtn = document.querySelector('#lang-switcher-btn') as HTMLElement
  const langDropdown = document.querySelector('#lang-dropdown') as HTMLElement
  const langOptions = document.querySelectorAll('.navbar-lang-option')

  if (langBtn) {
    langBtn.addEventListener('click', event => {
      event.stopPropagation()
      const isOpen = langDropdown.classList.contains('show')

      if (isOpen) {
        langDropdown.classList.remove('show')
        langBtn.classList.remove('active')
        setTimeout(() => (langDropdown.style.display = 'none'), 300)
      } else {
        langDropdown.style.display = 'block'
        langBtn.classList.add('active')
        langBtn.style.transform = 'scale(0.95)'
        setTimeout(() => (langBtn.style.transform = ''), 150)
        requestAnimationFrame(() => langDropdown.classList.add('show'))
      }
    })
  }

  langOptions.forEach(option => {
    option.addEventListener('click', event => {
      event.stopPropagation()
      const locale = (option as HTMLElement).dataset.locale
      if (locale) {
        const optionElement = option as HTMLElement
        optionElement.style.transform = 'scale(0.95)'
        optionElement.style.background = 'rgba(59,130,246,0.2)'
        setTimeout(() => {
          optionElement.style.transform = ''
          optionElement.style.background = ''
        }, 150)

        const selectedLang = languages.find(lang => lang.locale === locale)
        if (selectedLang) {
          setTimeout(() => switchLang(selectedLang), 200)
        }
      }
    })
  })
}

onMounted(() => {
  nextTick(() => {
    InsertLangSwitcher()

    const originalPushState = history.pushState
    const originalReplaceState = history.replaceState

    history.pushState = function (...args) {
      originalPushState.apply(history, args)
      setTimeout(() => InsertLangSwitcher(), 50)
    }

    history.replaceState = function (...args) {
      originalReplaceState.apply(history, args)
      setTimeout(() => InsertLangSwitcher(), 50)
    }

    window.addEventListener('popstate', () => {
      setTimeout(() => InsertLangSwitcher(), 50)
    })
  })

  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style>
/* ==== 全局样式（不要 scoped，否则动态插入样式失效） ==== */
#GlobalLangSwitcher {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 12px;
  font-family: "Inter", "Segoe UI", sans-serif;
  user-select: none;
}

/* 按钮样式 */
.navbar-lang-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  font-size: 14px;
  background: var(--vp-c-bg-soft, #f5f5f7);
  border: 1px solid var(--vp-c-border, #ccc);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--vp-c-text, #333);
}

.navbar-lang-button:hover {
  background: var(--vp-c-bg-hover, #e5e7eb);
}

.navbar-lang-button.active {
  background: var(--vp-c-brand, #3b82f6);
  color: white;
}

/* 图标和文字 */
.lang-icon {
  font-size: 16px;
}
.current-lang {
  font-weight: 500;
}
.dropdown-arrow {
  font-size: 10px;
}

/* 下拉菜单 */
.navbar-lang-dropdown {
  position: absolute;
  top: 110%;
  right: 0;
  background: var(--vp-c-bg, white);
  border: 1px solid var(--vp-c-border, #ddd);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  overflow: hidden;
  min-width: 140px;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.25s ease;
  z-index: 2000;
  pointer-events: none;
}

.navbar-lang-dropdown.show {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

/* 语言选项 */
.navbar-lang-option {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: none;
  border: none;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  color: var(--vp-c-text, #333);
  transition: all 0.15s ease;
}

.navbar-lang-option:hover {
  background: rgba(59, 130, 246, 0.08);
}

.option-icon {
  font-size: 16px;
}

.check-icon {
  margin-left: auto;
  color: var(--vp-c-brand, #3b82f6);
}
</style>
