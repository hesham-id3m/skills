<script setup lang="ts">
import { computed } from 'vue'
import { features } from '@/config/brand'
import { useI18n } from '@/i18n'
import type { MessageKey } from '@/i18n/messages'

const { t } = useI18n()

/** Proper nouns — intentionally not translated. */
const stack = ['Vue 3', 'Vuetify 3', 'Vue Router', 'TypeScript', 'Vite']

const featureCards = computed(() => [
  { icon: 'mdi-theme-light-dark', titleKey: 'home.feat.theme.title' as const, descKey: 'home.feat.theme.desc' as const },
  { icon: 'mdi-translate', titleKey: 'home.feat.locale.title' as const, descKey: 'home.feat.locale.desc' as const },
  { icon: 'mdi-shield-lock-outline', titleKey: 'home.feat.auth.title' as const, descKey: 'home.feat.auth.desc' as const },
  { icon: 'mdi-cog-outline', titleKey: 'home.feat.config.title' as const, descKey: 'home.feat.config.desc' as const },
] satisfies Array<{ icon: string; titleKey: MessageKey; descKey: MessageKey }>)
</script>

<template>
  <main>
    <!-- HERO -->
    <section class="hero" aria-labelledby="hero-title">
      <div class="page-shell hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">{{ t('home.eyebrow') }}</p>
          <h1 id="hero-title" class="hero-title">{{ t('home.title') }}</h1>
          <p class="hero-sub">{{ t('home.sub') }}</p>
          <div class="hero-ctas">
            <v-btn
              v-if="features.auth"
              color="primary"
              size="large"
              class="text-none"
              to="/login"
            >
              {{ t('home.ctaSignin') }}
            </v-btn>
            <v-btn
              variant="outlined"
              color="secondary"
              size="large"
              class="text-none"
              href="#features"
            >
              {{ t('home.ctaFeatures') }}
            </v-btn>
          </div>
        </div>

        <div class="hero-media" aria-hidden="true">
          <div class="hero-mark">
            <v-icon icon="mdi-view-dashboard-outline" size="72" />
          </div>
        </div>
      </div>
    </section>

    <!-- WHAT'S INSIDE -->
    <section id="features" class="section" aria-labelledby="features-title">
      <div class="page-shell">
        <h2 id="features-title" class="section-title">{{ t('home.features.title') }}</h2>
        <p class="section-sub">{{ t('home.features.sub') }}</p>

        <v-row class="mt-4">
          <v-col v-for="card in featureCards" :key="card.titleKey" cols="12" sm="6" md="3">
            <div class="step-card">
              <div class="step-icon">
                <v-icon :icon="card.icon" size="26" />
              </div>
              <h3 class="step-title">{{ t(card.titleKey) }}</h3>
              <p class="step-desc">{{ t(card.descKey) }}</p>
            </div>
          </v-col>
        </v-row>
      </div>
    </section>

    <!-- STACK -->
    <section class="section section-alt" aria-labelledby="stack-title">
      <div class="page-shell">
        <h2 id="stack-title" class="section-title">{{ t('home.stack.title') }}</h2>
        <p class="section-sub">{{ t('home.stack.sub') }}</p>

        <div class="stack-chips">
          <v-chip v-for="item in stack" :key="item" variant="tonal" color="primary" size="large" class="stack-chip">
            {{ item }}
          </v-chip>
        </div>

        <v-alert type="info" variant="tonal" density="compact" class="stack-note">
          {{ t('home.stack.note') }}
        </v-alert>
      </div>
    </section>

    <!-- CLOSING CTA -->
    <section class="section">
      <div class="page-shell">
        <div class="cta-band">
          <div>
            <h2 class="cta-title">{{ t('cta.title') }}</h2>
            <p class="cta-sub">{{ t('cta.sub') }}</p>
          </div>
          <div v-if="features.auth" class="cta-actions">
            <v-btn color="primary" size="large" class="text-none" to="/login">
              {{ t('cta.signin') }}
            </v-btn>
            <v-btn variant="outlined" color="secondary" size="large" class="text-none" to="/signup">
              {{ t('cta.signup') }}
            </v-btn>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero {
  padding-block: 56px 64px;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 55fr) minmax(0, 45fr);
  align-items: center;
  gap: 48px;
}

.eyebrow {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 12px;
}

.hero-title {
  font-size: clamp(30px, 4.2vw, 44px);
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: rgb(var(--v-theme-on-background));
  margin: 0 0 16px;
}

.hero-sub {
  font-size: 16px;
  line-height: 1.65;
  color: rgb(var(--v-theme-on-surface-variant));
  max-width: 520px;
  margin-bottom: 28px;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* Placeholder brand panel — swap for your real hero imagery or product visual. */
.hero-media {
  display: grid;
  place-items: center;
}

.hero-mark {
  width: min(100%, 320px);
  aspect-ratio: 4 / 3;
  border-radius: 18px;
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background:
    radial-gradient(120% 120% at 20% 10%, rgba(var(--v-theme-primary), 0.14), transparent 55%),
    rgb(var(--v-theme-surface));
  display: grid;
  place-items: center;
  color: rgb(var(--v-theme-primary));
  box-shadow: 0 16px 40px rgba(15, 20, 24, 0.12);
}

.section-title {
  font-size: clamp(22px, 2.6vw, 30px);
  font-weight: 800;
  letter-spacing: -0.3px;
  color: rgb(var(--v-theme-on-background));
  margin: 0;
}

.section-sub {
  margin-top: 8px;
  font-size: 15px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface-variant));
  max-width: 640px;
}

.section-alt {
  background: rgb(var(--v-theme-surface-light));
}

.step-card {
  height: 100%;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 16px;
  padding: 24px;
}

.step-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
  margin-bottom: 14px;
}

.step-title {
  font-size: 16.5px;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 8px;
}

.step-desc {
  font-size: 14px;
  line-height: 1.6;
  color: rgb(var(--v-theme-on-surface-variant));
  margin: 0;
}

.stack-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.stack-chip {
  font-weight: 600;
}

.stack-note {
  margin-top: 20px;
  font-size: 13px;
}

.cta-band {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-inline-start: 4px solid rgb(var(--v-theme-primary));
  border-radius: 16px;
  padding: 32px;
}

.cta-title {
  font-size: clamp(20px, 2.4vw, 26px);
  font-weight: 800;
  color: rgb(var(--v-theme-on-surface));
  margin: 0;
}

.cta-sub {
  margin-top: 6px;
  font-size: 14.5px;
  color: rgb(var(--v-theme-on-surface-variant));
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 960px) {
  .hero {
    padding-block: 40px 48px;
  }

  .hero-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 600px) {
  .hero {
    padding-block: 32px 40px;
  }

  .cta-band {
    padding: 24px;
  }
}
</style>
