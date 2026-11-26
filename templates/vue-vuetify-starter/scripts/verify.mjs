/* eslint-disable no-console */
// Starter browser verification — adapted from the AutoHub v8 workspace harness
// (puppeteer-core + system Chrome). Browsers are isolated per section because
// long single-renderer sessions wedge intermittently in this environment.
// Run: npm run preview &  then  npm run verify
import puppeteer from 'puppeteer-core'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE_URL ?? 'http://localhost:4310'
const OUT = '/tmp/starter-shots'
mkdirSync(OUT, { recursive: true })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const consoleErrors = []

async function section(name, viewport, fn) {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH ?? '/usr/bin/google-chrome',
    headless: true,
    protocolTimeout: 120000,
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--hide-scrollbars'],
  })
  const page = await browser.newPage()
  await page.setViewport(viewport)
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(`console.error: ${msg.text()}`)
  })
  page.on('pageerror', (err) => consoleErrors.push(`pageerror: ${err}`))
  page.on('requestfailed', (req) =>
    consoleErrors.push(`requestfailed: ${req.url()} ${req.failure()?.errorText}`),
  )
  try {
    await fn(page)
    console.log(`-- section ok: ${name}`)
  } finally {
    await browser.close()
  }
}

async function appReady(page) {
  await page.waitForSelector('.v-application', { timeout: 20000 })
  await sleep(700)
}

async function shot(page, name, fullPage = false) {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage })
  console.log(`shot: ${name}`)
}

async function clickByAria(page, label) {
  const clicked = await page.evaluate((aria) => {
    const el = [...document.querySelectorAll('button')].find(
      (b) => b.getAttribute('aria-label') === aria,
    )
    if (!el) return false
    el.click()
    return true
  }, label)
  if (!clicked) throw new Error(`button not found: ${label}`)
}

async function overflow(page) {
  return page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
}

// ---------- 1. Home — desktop EN light, then RTL, then dark ----------
await section('home-rtl-dark', { width: 1440, height: 900 }, async (page) => {
  await page.goto(`${BASE}/`, { waitUntil: 'load' })
  await appReady(page)
  await shot(page, '01-home-desktop-light')
  console.log(`home overflow px: ${await overflow(page)}`)
  console.log(`home h1: ${await page.$eval('h1', (el) => el.textContent.trim())}`)
  console.log(`header nav buttons: ${(await page.$$('.desktop-nav .nav-btn')).length}`)
  console.log(`footer links: ${(await page.$$('.footer-link')).length}`)
  const brokenImgs = await page.evaluate(
    () => [...document.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
  )
  console.log(`broken images: ${brokenImgs.length ? brokenImgs.join(', ') : '(none)'}`)

  await clickByAria(page, 'Switch to Arabic')
  await sleep(700)
  console.log(`dir after switch: ${await page.evaluate(() => document.documentElement.dir)}`)
  console.log(`lang after switch: ${await page.evaluate(() => document.documentElement.lang)}`)
  const brandBox = await page.evaluate(() => {
    const r = document.querySelector('.brand').getBoundingClientRect()
    return { left: Math.round(r.left), right: Math.round(window.innerWidth - r.right) }
  })
  console.log(`RTL brand physical margins (left/right px): ${brandBox.left}/${brandBox.right}`)
  console.log(`ar overflow px: ${await overflow(page)}`)
  await shot(page, '02-home-desktop-ar')

  await clickByAria(page, 'التبديل إلى المظهر الداكن')
  await sleep(700)
  await shot(page, '03-home-desktop-ar-dark')

  // Anchor nav from the header ("What's inside") scrolls to the features section.
  await clickByAria(page, 'التبديل إلى الإنجليزية')
  await sleep(700)
})

// ---------- 2. Anchor navigation + hash scroll ----------
await section('anchor-nav', { width: 1440, height: 900 }, async (page) => {
  await page.goto(`${BASE}/`, { waitUntil: 'load' })
  await appReady(page)
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('.desktop-nav .nav-btn')].find((b) =>
      b.textContent.includes("What's inside"),
    )
    btn?.click()
  })
  await page.waitForFunction(() => location.hash === '#features', { timeout: 10000 })
  await sleep(900)
  const sectionTop = await page.evaluate(() => {
    const r = document.querySelector('#features').getBoundingClientRect()
    return Math.round(r.top)
  })
  console.log(`#features section top after anchor nav (px, near viewport top): ${sectionTop}`)
  await shot(page, '04-home-features-anchor')
})

// ---------- 3. Auth pages ----------
await section('auth', { width: 1440, height: 900 }, async (page) => {
  await page.goto(`${BASE}/login`, { waitUntil: 'load' })
  await appReady(page)
  await page.waitForSelector('input[autocomplete="username"]', { timeout: 15000 })
  await shot(page, '05-login-desktop')

  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button[type="submit"]')].find((b) =>
      b.textContent.includes('Sign in'),
    )
    btn?.click()
  })
  await page.waitForSelector('.v-input--error', { timeout: 10000 })
  console.log(`login empty-submit field errors: ${(await page.$$('.v-input--error')).length}`)
  await shot(page, '06-login-errors')

  await page.type('input[autocomplete="username"]', 'demo@example.com')
  await page.type('input[autocomplete="current-password"]', 'secret123')
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button[type="submit"]')].find((b) =>
      b.textContent.includes('Sign in'),
    )
    btn?.click()
  })
  await page.waitForSelector('.auth-card .v-alert', { timeout: 10000 })
  const loginNotice = await page.evaluate(() =>
    [...document.querySelectorAll('.v-alert')].some((a) => a.textContent.includes('connected yet')),
  )
  console.log(`login honest demo notice (no fake success): ${loginNotice}`)
  await shot(page, '07-login-demo-notice')

  await page.goto(`${BASE}/signup`, { waitUntil: 'load' })
  await appReady(page)
  await page.waitForSelector('input[autocomplete="name"]', { timeout: 15000 })
  await shot(page, '08-signup-desktop')
  await page.type('input[autocomplete="name"]', 'Demo User')
  await page.type('input[autocomplete="email"]', 'demo@example.com')
  await page.waitForFunction(
    () => document.querySelectorAll('input[autocomplete="new-password"]').length === 2,
    { timeout: 10000 },
  )
  await page.evaluate(() => {
    const pw = [...document.querySelectorAll('input[autocomplete="new-password"]')]
    const native = (el, v) => {
      Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(el, v)
      el.dispatchEvent(new Event('input', { bubbles: true }))
    }
    native(pw[0], 'secret123')
    native(pw[1], 'different456')
    const btn = [...document.querySelectorAll('button[type="submit"]')].find((b) =>
      b.textContent.includes('Create account'),
    )
    btn?.click()
  })
  await page.waitForSelector('.v-input--error', { timeout: 10000 })
  console.log(`signup mismatch errors: ${(await page.$$('.v-input--error')).length}`)
  await shot(page, '09-signup-mismatch')

  await page.goto(`${BASE}/forgot-password`, { waitUntil: 'load' })
  await appReady(page)
  await shot(page, '10-forgot-desktop')
})

// ---------- 4. 404 ----------
await section('notfound', { width: 1440, height: 900 }, async (page) => {
  await page.goto(`${BASE}/nope`, { waitUntil: 'load' })
  await appReady(page)
  console.log(`404 title: ${await page.$eval('h1', (el) => el.textContent.trim())}`)
  await shot(page, '11-notfound')
})

// ---------- 5. Mobile 375 — home, drawer, auth nav ----------
await section('mobile-375', { width: 375, height: 812 }, async (page) => {
  await page.goto(`${BASE}/`, { waitUntil: 'load' })
  await appReady(page)
  console.log(`mobile overflow px: ${await overflow(page)}`)
  await shot(page, '12-home-mobile')

  await clickByAria(page, 'Open menu')
  await page.waitForSelector('.v-navigation-drawer--active', { timeout: 10000 })
  await sleep(400)
  await shot(page, '13-mobile-drawer')

  await page.evaluate(() => {
    const item = [...document.querySelectorAll('.v-navigation-drawer .v-list-item')].find((el) =>
      el.textContent.includes('Sign in'),
    )
    item?.click()
  })
  await page.waitForFunction(() => location.pathname === '/login', { timeout: 20000 })
  await sleep(600)
  console.log(`mobile route after drawer nav: ${await page.evaluate(() => location.pathname)}`)
  console.log(`mobile login overflow px: ${await overflow(page)}`)
  await shot(page, '14-login-mobile')
})

// ---------- 6. 320px + Arabic ----------
await section('narrow-320', { width: 320, height: 700 }, async (page) => {
  await page.goto(`${BASE}/`, { waitUntil: 'load' })
  await appReady(page)
  console.log(`320 overflow px: ${await overflow(page)}`)
  await shot(page, '15-home-320')

  await page.evaluate(() => {
    localStorage.clear()
    ;[...document.querySelectorAll('button')].find((b) => b.getAttribute('aria-label') === 'Switch to Arabic')?.click()
  })
  await sleep(900)
  console.log(`320 ar overflow px: ${await overflow(page)}`)
  const brandLeft = await page.evaluate(() =>
    Math.round(document.querySelector('.brand').getBoundingClientRect().left),
  )
  console.log(`320 AR brand physical left px: ${brandLeft}`)
  await shot(page, '16-home-320-ar')
  await page.evaluate(() => localStorage.clear())
})

console.log('\n--- console/page errors ---')
console.log(consoleErrors.length ? consoleErrors.join('\n') : '(none)')
if (consoleErrors.length) process.exitCode = 2
