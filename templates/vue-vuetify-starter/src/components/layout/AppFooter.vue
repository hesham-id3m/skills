<script setup lang="ts">
import { brand, mainNav, resourceLinks, features } from '@/config/brand'
import { useI18n } from '@/i18n'
import type { MessageKey } from '@/i18n/messages'

const { t } = useI18n()

const year = new Date().getFullYear()

const quickLinks: Array<{ labelKey: MessageKey; to: string }> = [
  ...mainNav,
  ...(features.auth
    ? ([
        { labelKey: 'nav.login', to: '/login' },
        { labelKey: 'nav.signup', to: '/signup' },
      ] as Array<{ labelKey: MessageKey; to: string }>)
    : []),
]
</script>

<template>
  <v-footer class="app-footer">
    <div class="footer-inner">
      <v-container max-width="1280" class="pa-0">
        <v-row no-gutters class="footer-main">
          <v-col cols="12" md="5" class="pe-md-8">
            <div class="brand-row">
              <img :src="brand.logoSrc" :alt="t('brand.logoAlt')" width="30" height="30" class="brand-logo" />
              <span class="brand-name">{{ t('brand.name') }}</span>
            </div>
            <p class="brand-desc">{{ t('footer.desc') }}</p>
            <p class="footer-note">{{ t('footer.note') }}</p>
          </v-col>

          <v-col cols="6" md="3" sm="6">
            <nav :aria-label="t('footer.navAria')">
              <h3 class="col-title">{{ t('footer.quickLinks') }}</h3>
              <ul class="link-list">
                <li v-for="link in quickLinks" :key="link.to">
                  <RouterLink :to="link.to" class="footer-link">{{ t(link.labelKey) }}</RouterLink>
                </li>
              </ul>
            </nav>
          </v-col>

          <v-col cols="6" md="4" sm="6">
            <h3 class="col-title">{{ t('footer.resources') }}</h3>
            <ul class="link-list">
              <li v-for="link in resourceLinks" :key="link.href">
                <a
                  :href="link.href"
                  class="footer-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >{{ t(link.labelKey) }}</a>
              </li>
            </ul>
          </v-col>
        </v-row>

        <v-divider class="footer-divider" />

        <div class="footer-bottom">
          <span>{{ t('footer.rights', { year, name: t('brand.name') }) }}</span>
        </div>
      </v-container>
    </div>
  </v-footer>
</template>

<style scoped>
.app-footer {
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background: rgb(var(--v-theme-surface));
  padding-block: 40px 20px;
}

.footer-inner {
  width: 100%;
}

.footer-main {
  row-gap: 24px;
}

/* Brand stays on the physical left in both directions. */
.brand-row {
  direction: ltr;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  justify-content: flex-start;
}

.brand-logo {
  display: block;
}

.brand-name {
  font-size: 16px;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
}

.brand-desc {
  margin-top: 12px;
  max-width: 420px;
  font-size: 13.5px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface-variant));
}

.footer-note {
  margin-top: 8px;
  font-size: 12.5px;
  color: rgb(var(--v-theme-on-surface-variant));
  opacity: 0.85;
}

.col-title {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 12px;
}

.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
}

.footer-link {
  font-size: 13.5px;
  color: rgb(var(--v-theme-on-surface-variant));
  text-decoration: none;
}

.footer-link:hover,
.footer-link:focus-visible {
  color: rgb(var(--v-theme-primary));
  text-decoration: underline;
}

.footer-divider {
  margin-block: 24px 16px;
  opacity: 0.6;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 12.5px;
  color: rgb(var(--v-theme-on-surface-variant));
}

@media (max-width: 600px) {
  .app-footer {
    padding-block: 32px 16px;
  }
}
</style>
