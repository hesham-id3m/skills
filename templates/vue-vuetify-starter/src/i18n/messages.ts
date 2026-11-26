/**
 * Flat typed UI dictionaries for English (LTR) and Arabic (RTL).
 * `ar` is typed as Record<MessageKey, string>, so a missing or extra
 * key fails the typecheck — the two locales stay in parity.
 *
 * CUSTOMIZE: replace the shell strings and add your own domain keys here.
 * Every new key must exist in BOTH dictionaries (enforced by the type).
 */
export const en = {
  // Brand / shell
  'brand.name': 'Starter',
  'brand.tagline': 'Vue 3 + Vuetify 3 starter',
  'brand.logoAlt': 'Starter logo',

  // Navigation / header
  'nav.home': 'Home',
  'nav.features': "What's inside",
  'nav.login': 'Sign in',
  'nav.signup': 'Create account',
  'header.logoAria': 'Starter — home',
  'header.navAria': 'Primary navigation',
  'header.langLabel': 'العربية',
  'header.langAria': 'Switch to Arabic',
  'header.themeToDark': 'Switch to dark theme',
  'header.themeToLight': 'Switch to light theme',
  'header.openMenu': 'Open menu',
  'header.closeMenu': 'Close menu',
  'header.menuAria': 'Site menu',

  // Home — starter demo page (replace with your own landing)
  'home.eyebrow': 'Starter template',
  'home.title': 'A bilingual Vue 3 + Vuetify starter',
  'home.sub':
    'This starter ships a working shell in two directions and two themes: a branded header and footer, English/Arabic with real RTL, light/dark themes, three honest auth screens and a config-driven brand. Replace this page with your own.',
  'home.ctaSignin': 'Try sign in',
  'home.ctaFeatures': "What's inside",

  'home.features.title': "What's inside",
  'home.features.sub': 'Four working pieces of infrastructure, ready to keep or replace.',
  'home.feat.theme.title': 'Light and dark themes',
  'home.feat.theme.desc':
    'Semantic Vuetify theme tokens with persistence and an OS-preference default. Toggle it from the header right now.',
  'home.feat.locale.title': 'English and Arabic',
  'home.feat.locale.desc':
    'Typed EN/AR dictionaries with typechecked parity, a true RTL layout and a persisted locale toggle.',
  'home.feat.auth.title': 'Auth screens',
  'home.feat.auth.desc':
    'Sign in, sign up and forgot-password pages with shared validation. Demo mode — they never fake a successful sign-in.',
  'home.feat.config.title': 'Config-driven brand',
  'home.feat.config.desc':
    'Name, logo, navigation and links come from src/config/brand.ts. Change one file and the whole shell follows.',

  'home.stack.title': 'The stack',
  'home.stack.sub':
    'Vite, Vue 3 with TypeScript, Vuetify 3 and Vue Router — with a browser verification harness included.',
  'home.stack.note':
    'Next step: set your brand in src/config/brand.ts and your words in src/i18n/messages.ts.',

  // Closing CTA
  'cta.title': 'Start from the shell',
  'cta.sub': 'The header, footer, themes and auth screens above are yours to keep, restyle or replace.',
  'cta.signin': 'Open sign in',
  'cta.signup': 'Create account',

  // Auth
  'auth.login.title': 'Welcome back',
  'auth.login.sub': 'Sign in to your account.',
  'auth.login.submit': 'Sign in',
  'auth.login.noAccount': 'New here?',
  'auth.login.forgot': 'Forgot password?',
  'auth.signup.title': 'Create an account',
  'auth.signup.sub': 'One account for everything in this app.',
  'auth.signup.submit': 'Create account',
  'auth.signup.haveAccount': 'Already have an account?',
  'auth.signup.name': 'Full name',
  'auth.signup.confirm': 'Confirm password',
  'auth.forgot.title': 'Forgot your password?',
  'auth.forgot.sub': 'Enter your account email and we’ll send a reset link.',
  'auth.forgot.submit': 'Send reset link',
  'auth.forgot.back': 'Back to sign in',
  'auth.email': 'Email',
  'auth.password': 'Password',
  'auth.showPassword': 'Show password',
  'auth.hidePassword': 'Hide password',
  'auth.demoStatus.login':
    'Sign-in isn’t connected yet in this demo — no account was checked. The form, validation and states are ready for a real API.',
  'auth.demoStatus.signup':
    'Registration isn’t connected yet in this demo — no account was created. The form, validation and states are ready for a real API.',
  'auth.demoStatus.forgot':
    'Password recovery isn’t connected yet in this demo — nothing was sent and no email was stored.',
  'auth.toSignup': 'Create one',
  'auth.toLogin': 'Sign in',

  // Validation
  'rules.required': 'This field is required',
  'rules.email': 'Enter a valid email address',
  'rules.passwordMin': 'Use at least {n} characters',
  'rules.passwordMatch': 'Passwords don’t match',

  // Footer
  'footer.desc':
    'A bilingual Vue 3 + Vuetify 3 starter template — a config-driven shell, light/dark themes and honest auth screens, ready for a real project.',
  'footer.quickLinks': 'Quick links',
  'footer.resources': 'Resources',
  'footer.vueDocs': 'Vue guide',
  'footer.vuetifyDocs': 'Vuetify docs',
  'footer.routerDocs': 'Vue Router docs',
  'footer.rights': '© {year} {name}. All rights reserved.',
  'footer.note': 'Starter template — replace this footer text in src/i18n/messages.ts.',
  'footer.navAria': 'Footer navigation',

  // Errors
  'notfound.title': 'Page not found',
  'notfound.sub': 'The page you’re looking for doesn’t exist.',
  'notfound.action': 'Back home',
} as const

export type MessageKey = keyof typeof en

export const ar: Record<MessageKey, string> = {
  // Brand / shell
  'brand.name': 'ستارتر',
  'brand.tagline': 'قالب Vue 3 + Vuetify 3',
  'brand.logoAlt': 'شعار ستارتر',

  // Navigation / header
  'nav.home': 'الرئيسية',
  'nav.features': 'المكوّنات',
  'nav.login': 'تسجيل الدخول',
  'nav.signup': 'إنشاء حساب',
  'header.logoAria': 'ستارتر — الرئيسية',
  'header.navAria': 'التنقل الرئيسي',
  'header.langLabel': 'English',
  'header.langAria': 'التبديل إلى الإنجليزية',
  'header.themeToDark': 'التبديل إلى المظهر الداكن',
  'header.themeToLight': 'التبديل إلى المظهر الفاتح',
  'header.openMenu': 'فتح القائمة',
  'header.closeMenu': 'إغلاق القائمة',
  'header.menuAria': 'قائمة الموقع',

  // Home — starter demo page (replace with your own landing)
  'home.eyebrow': 'قالب بداية',
  'home.title': 'قالب Vue 3 + Vuetify ثنائي اللغة',
  'home.sub':
    'يأتي هذا القالب بواجهة عاملة باتجاهين ومظهرين: ترويسة وتذييل بعلامة تجارية، وإنجليزية/عربية مع RTL حقيقي، ومظاهر فاتح/داكن، وثلاث شاشات مصادقة صادقة، وعلامة تجارية من ملف إعدادات واحد. استبدل هذه الصفحة بصفحتك الخاصة.',
  'home.ctaSignin': 'جرّب تسجيل الدخول',
  'home.ctaFeatures': 'المكوّنات',

  'home.features.title': 'المكوّنات',
  'home.features.sub': 'أربع قطع بنية تحتية عاملة، جاهزة للإبقاء عليها أو استبدالها.',
  'home.feat.theme.title': 'مظهر فاتح وداكن',
  'home.feat.theme.desc':
    'رموز ألوان دلالية في Vuetify مع حفظ التفضيل واتّباع إعداد النظام افتراضيًا. جرّبه من الترويسة الآن.',
  'home.feat.locale.title': 'الإنجليزية والعربية',
  'home.feat.locale.desc':
    'قواميس إنجليزية/عربية مُنمَّطة يتحقق TypeScript من توازن مفاتيحها، مع تخطيط RTL حقيقي ومفتاح لغة محفوظ.',
  'home.feat.auth.title': 'شاشات المصادقة',
  'home.feat.auth.desc':
    'صفحات تسجيل الدخول وإنشاء الحساب واستعادة كلمة المرور مع تحقق مشترك. وضع تجريبي — لا تدّعي نجاح تسجيل الدخول أبدًا.',
  'home.feat.config.title': 'علامة من الإعدادات',
  'home.feat.config.desc':
    'الاسم والشعار والتنقل والروابط تأتي من الملف src/config/brand.ts. عدّل ملفًا واحدًا فتتبعك الواجهة كلها.',

  'home.stack.title': 'التقنيات',
  'home.stack.sub': 'Vite وVue 3 مع TypeScript وVuetify 3 وVue Router — مع أداة تحقق بالمتصفح مضمّنة.',
  'home.stack.note': 'الخطوة التالية: اضبط علامتك في src/config/brand.ts وكلماتك في src/i18n/messages.ts.',

  // Closing CTA
  'cta.title': 'ابدأ من الواجهة',
  'cta.sub': 'الترويسة والتذييل والمظاهر وشاشات المصادقة أعلاه لك أن تحتفظ بها أو تعيد تنسيقها أو تستبدلها.',
  'cta.signin': 'افتح تسجيل الدخول',
  'cta.signup': 'إنشاء حساب',

  // Auth
  'auth.login.title': 'مرحبًا بعودتك',
  'auth.login.sub': 'سجّل الدخول إلى حسابك.',
  'auth.login.submit': 'تسجيل الدخول',
  'auth.login.noAccount': 'جديد هنا؟',
  'auth.login.forgot': 'نسيت كلمة المرور؟',
  'auth.signup.title': 'إنشاء حساب',
  'auth.signup.sub': 'حساب واحد لكل شيء في هذا التطبيق.',
  'auth.signup.submit': 'إنشاء الحساب',
  'auth.signup.haveAccount': 'لديك حساب بالفعل؟',
  'auth.signup.name': 'الاسم الكامل',
  'auth.signup.confirm': 'تأكيد كلمة المرور',
  'auth.forgot.title': 'نسيت كلمة المرور؟',
  'auth.forgot.sub': 'أدخل بريد حسابك وسنرسل رابط إعادة التعيين.',
  'auth.forgot.submit': 'إرسال رابط الإعادة',
  'auth.forgot.back': 'العودة لتسجيل الدخول',
  'auth.email': 'البريد الإلكتروني',
  'auth.password': 'كلمة المرور',
  'auth.showPassword': 'إظهار كلمة المرور',
  'auth.hidePassword': 'إخفاء كلمة المرور',
  'auth.demoStatus.login':
    'تسجيل الدخول غير متصل بعد في هذا العرض التجريبي — لم يُتحقق من أي حساب. النموذج والتحقق والحالات جاهزة لواجهة برمجية حقيقية.',
  'auth.demoStatus.signup':
    'التسجيل غير متصل بعد في هذا العرض التجريبي — لم يُنشأ أي حساب. النموذج والتحقق والحالات جاهزة لواجهة برمجية حقيقية.',
  'auth.demoStatus.forgot':
    'استعادة كلمة المرور غير متصلة بعد في هذا العرض التجريبي — لم يُرسل شيء ولم يُخزَّن أي بريد.',
  'auth.toSignup': 'أنشئ حسابًا',
  'auth.toLogin': 'تسجيل الدخول',

  // Validation
  'rules.required': 'هذا الحقل مطلوب',
  'rules.email': 'أدخل بريدًا إلكترونيًا صحيحًا',
  'rules.passwordMin': 'استخدم {n} أحرف على الأقل',
  'rules.passwordMatch': 'كلمتا المرور غير متطابقتين',

  // Footer
  'footer.desc':
    'قالب بداية ثنائي اللغة بـ Vue 3 وVuetify 3 — واجهة من الإعدادات ومظاهر فاتح/داكن وشاشات مصادقة صادقة، جاهز لمشروع حقيقي.',
  'footer.quickLinks': 'روابط سريعة',
  'footer.resources': 'مصادر',
  'footer.vueDocs': 'دليل Vue',
  'footer.vuetifyDocs': 'توثيق Vuetify',
  'footer.routerDocs': 'توثيق Vue Router',
  'footer.rights': '© {year} {name}. جميع الحقوق محفوظة.',
  'footer.note': 'قالب بداية — استبدل نص هذا التذييل في src/i18n/messages.ts.',
  'footer.navAria': 'تنقل التذييل',

  // Errors
  'notfound.title': 'الصفحة غير موجودة',
  'notfound.sub': 'الصفحة التي تبحث عنها غير موجودة.',
  'notfound.action': 'العودة للرئيسية',
}
