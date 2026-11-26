<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'
import { mainNav, brand, features } from '@/config/brand'
import { useI18n } from '@/i18n'
import { useLocaleToggle } from '@/composables/useLocaleToggle'
import { useAppTheme } from '@/composables/useAppTheme'
import type { MessageKey } from '@/i18n/messages'

const route = useRoute()
const { t } = useI18n()
const { toggleLocale } = useLocaleToggle()
const { isDark, toggleTheme } = useAppTheme()
const { lgAndUp } = useDisplay()

const drawer = ref(false)

const themeAria = computed(() => (isDark.value ? t('header.themeToLight') : t('header.themeToDark')))
const themeIcon = computed(() => (isDark.value ? 'mdi-weather-sunny' : 'mdi-weather-night'))

/** Active state compares the path part only, so hash anchors stay active on their page. */
function isActive(to: string): boolean {
  return route.path === to.split('#')[0]
}

function navLabel(key: MessageKey): string {
  return t(key)
}

function onDrawerNav(): void {
  drawer.value = false
}
</script>

<template>
  <header class="app-header">
    <v-app-bar height="72" flat class="app-bar" elevate-on-scroll>
      <!-- Physical LTR grid: brand LEFT, nav CENTER, actions RIGHT in both locales. -->
      <div class="bar-grid">
        <RouterLink to="/" class="brand" :aria-label="t('header.logoAria')">
          <img :src="brand.logoSrc" :alt="t('brand.logoAlt')" class="brand-logo" width="36" height="36" />
          <span class="brand-name">{{ t('brand.name') }}</span>
        </RouterLink>

        <nav v-if="lgAndUp" class="desktop-nav" :aria-label="t('header.navAria')">
          <v-btn
            v-for="item in mainNav"
            :key="item.to"
            :to="item.to"
            variant="text"
            color="primary"
            class="nav-btn"
            :class="{ 'nav-btn--active': isActive(item.to) }"
            :aria-current="isActive(item.to) ? 'page' : undefined"
          >
            {{ navLabel(item.labelKey) }}
          </v-btn>
        </nav>

        <div class="actions">
          <v-btn
            variant="text"
            class="action-btn"
            :aria-label="t('header.langAria')"
            @click="toggleLocale"
          >
            <span class="lang-label">{{ t('header.langLabel') }}</span>
          </v-btn>

          <v-btn
            variant="text"
            class="action-btn"
            :icon="themeIcon"
            :aria-label="themeAria"
            @click="toggleTheme"
          />

          <v-btn
            v-if="lgAndUp && features.auth"
            variant="flat"
            color="primary"
            class="signin-btn"
            to="/login"
          >
            {{ t('nav.login') }}
          </v-btn>

          <v-btn
            v-if="!lgAndUp"
            variant="text"
            class="action-btn menu-btn"
            :icon="drawer ? 'mdi-close' : 'mdi-menu'"
            :aria-label="drawer ? t('header.closeMenu') : t('header.openMenu')"
            :aria-expanded="drawer ? 'true' : 'false'"
            @click="drawer = !drawer"
          />
        </div>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="right"
      class="mobile-drawer"
      :aria-label="t('header.menuAria')"
    >
      <v-list nav>
        <v-list-item
          v-for="item in mainNav"
          :key="item.to"
          :to="item.to"
          :active="isActive(item.to)"
          :title="navLabel(item.labelKey)"
          @click="onDrawerNav"
        />
        <template v-if="features.auth">
          <v-divider class="my-2" />
          <v-list-item
            to="/login"
            prepend-icon="mdi-login-variant"
            :title="t('nav.login')"
            @click="onDrawerNav"
          />
          <v-list-item
            to="/signup"
            prepend-icon="mdi-account-plus-outline"
            :title="t('nav.signup')"
            @click="onDrawerNav"
          />
        </template>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<style scoped>
.app-bar {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background: rgb(var(--v-theme-surface));
}

/* Physical zones stay left/center/right regardless of document direction. */
.bar-grid {
  direction: ltr;
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: 24px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  column-gap: 16px;
  height: 100%;
}

.brand {
  grid-column: 1;
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  text-decoration: none;
}

.brand-logo {
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  display: block;
}

.brand-name {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: rgb(var(--v-theme-on-surface));
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.desktop-nav {
  grid-column: 2;
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-btn {
  min-height: 40px;
  font-size: 14.5px;
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0.1px;
  color: rgb(var(--v-theme-on-surface-variant));
  position: relative;
}

.nav-btn--active {
  color: rgb(var(--v-theme-primary));
}

.nav-btn--active :deep(.v-btn__overlay) {
  opacity: 0;
}

.nav-btn--active::after {
  content: '';
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 3px;
  height: 2px;
  border-radius: 2px;
  background: rgb(var(--v-theme-primary));
}

.actions {
  grid-column: 3;
  justify-self: end;
  display: flex;
  align-items: center;
  gap: 2px;
}

.action-btn {
  min-height: 40px;
  min-width: 40px;
  color: rgb(var(--v-theme-on-surface-variant));
}

.lang-label {
  font-size: 14px;
  font-weight: 600;
}

.signin-btn {
  margin-inline-start: 8px;
  text-transform: none;
  font-weight: 600;
}

@media (max-width: 1023px) {
  .bar-grid {
    padding-inline: 16px;
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .desktop-nav {
    display: none;
  }
}

@media (max-width: 600px) {
  .bar-grid {
    padding-inline: 12px;
    column-gap: 8px;
  }

  .brand-logo {
    width: 30px;
    height: 30px;
  }

  .brand-name {
    font-size: 15px;
  }
}

@media (max-width: 400px) {
  .bar-grid {
    padding-inline: 8px;
  }
}
</style>
