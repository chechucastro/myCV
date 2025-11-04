# GA4 Quick Test Guide

## 🚀 Quick Start

### 1. Start Development Server

```bash
npm run dev
```

### 2. Open Browser Console

Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows/Linux)

### 3. Verify Initialization

Look for this message in the console:

```
[GA4] Initialized with ID: G-TCD2QKZGTB
```

✅ If you see this, GA4 is working!

## 🧪 Test Event Tracking

### Test 1: Theme Toggle

1. Click the theme toggle button (dark/light mode switch)
2. Check console for:

```
[GA4] Event tracked: theme_toggle { theme: 'dark', timestamp: '...' }
```

### Test 2: Manual Event Test

Open browser console and run:

```javascript
// Check if gtag is loaded
console.log('gtag available:', typeof window.gtag)
// Should output: gtag available: function

// Check dataLayer
console.log('dataLayer:', window.dataLayer)
// Should show an array with events

// Send a test event
window.gtag('event', 'test_event', { test: 'value' })
```

## 🔍 Verify Network Traffic

### Chrome DevTools Network Tab

1. Open DevTools → **Network** tab
2. Filter by: `gtag` or `google-analytics`
3. Look for:
   - ✅ Request to: `https://www.googletagmanager.com/gtag/js?id=G-TCD2QKZGTB`
   - ✅ Analytics hits to: `https://www.google-analytics.com/g/collect`

## 📊 Verify in GA4 Console

### Real-time Reports

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property for `G-TCD2QKZGTB`
3. Click **Reports** → **Realtime**
4. You should see active users and events

### Debug View (Recommended)

1. Go to **Admin** (gear icon bottom-left)
2. Select **DebugView** under **Configure** section
3. Interact with your app
4. Events should appear in real-time

> **Note:** DebugView only works when debug mode is enabled (automatically enabled in `npm run dev`)

## 🔧 Common Issues

### Issue: "GA4 not initialized" warning

**Cause:** Plugin not loaded correctly

**Solution:** Check `src/main.ts` has:
```typescript
app.use(gtm, {
  id: 'G-TCD2QKZGTB',
  enabled: true,
  debug: import.meta.env.DEV,
})
```

### Issue: No network requests

**Cause:** Ad blocker or browser extension

**Solution:** 
- Disable ad blockers during testing
- Try incognito/private browsing mode
- Check browser console for errors

### Issue: Events not showing in GA4

**Cause:** Property configuration or timing

**Solution:**
- Wait 24-48 hours for data to appear in standard reports
- Use **Realtime** or **DebugView** for immediate verification
- Verify measurement ID is correct

## ✅ Success Checklist

Run through this checklist to verify everything works:

- [ ] Development server starts without errors
- [ ] Console shows `[GA4] Initialized with ID: G-TCD2QKZGTB`
- [ ] `window.gtag` is a function
- [ ] `window.dataLayer` is an array
- [ ] Theme toggle triggers event in console
- [ ] Network requests to `googletagmanager.com` appear
- [ ] Analytics hits to `google-analytics.com` appear
- [ ] Events appear in GA4 Realtime or DebugView

## 🎯 Quick Event Test Examples

### Test in Browser Console

```javascript
// Test 1: Simple event
window.gtag('event', 'test_click', { button_name: 'test' })

// Test 2: Page view
window.gtag('event', 'page_view', { page_path: '/test', page_title: 'Test Page' })

// Test 3: Custom parameters
window.gtag('event', 'custom_event', { 
  category: 'engagement',
  action: 'test',
  value: 123 
})
```

### Test with Composable

In any Vue component:

```vue
<script setup lang="ts">
import { useGoogleTagManager } from '@/composables/useGoogleTagManager'

const { trackEvent } = useGoogleTagManager()

// Test on component mount
onMounted(() => {
  trackEvent('component_loaded', {
    component_name: 'TestComponent',
    timestamp: new Date().toISOString()
  })
})
</script>
```

## 📱 Test on Different Devices

### Desktop
```bash
npm run dev
# Visit http://localhost:5173
```

### Mobile (same network)
```bash
npm run dev -- --host
# Visit http://[your-ip]:5173 from mobile
```

## 🐛 Debug Mode

Force enable debug mode:

```typescript
// In src/main.ts
app.use(gtm, {
  id: 'G-TCD2QKZGTB',
  enabled: true,
  debug: true, // Always on
})
```

## 📚 Next Steps

After verifying everything works:

1. ✅ Test in production build: `npm run build`
2. ✅ Deploy to staging/production
3. ✅ Verify with GA4 DebugView in production
4. ✅ Set up custom events for key user actions
5. ✅ Configure conversions in GA4 admin

## 🆘 Need Help?

- **Documentation:** See `src/plugins/GTM_USAGE.md`
- **Migration Guide:** See `GA4_MIGRATION.md`
- **Summary:** See `GA4_REFACTOR_SUMMARY.md`
- **GA4 Docs:** https://developers.google.com/analytics/devguides/collection/ga4

---

**Happy Testing! 🎉**


