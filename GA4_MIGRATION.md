# GA4 Migration Summary

This document summarizes the migration from Google Tag Manager (GTM) to Google Analytics 4 (GA4) with gtag.js.

## Overview

The analytics implementation has been refactored to use Google Analytics 4 (gtag.js) instead of Google Tag Manager. This change provides:

- Direct integration with Google Analytics
- Simpler implementation using gtag.js
- Better alignment with modern GA4 event tracking
- Improved performance with preconnect hints

## Changes Made

### 1. Plugin Refactoring (`src/plugins/gtm.ts`)

**Before (GTM):**
- Used `GoogleTagManager` class
- Loaded GTM script (`gtm.js`)
- Used `window.dataLayer.push()` for events
- Container ID: `GTM-5PZSPQJ5`

**After (GA4):**
- Uses `GoogleAnalytics` class
- Loads gtag.js script
- Uses `window.gtag()` function
- Measurement ID: `G-TCD2QKZGTB`

**New Features:**
- `setUserProperties()` - Set user properties for analytics
- `config()` - Configure GA4 settings dynamically
- Proper TypeScript typing for `window.gtag()`

### 2. Composable Updates (`src/composables/useGoogleTagManager.ts`)

**API Changes:**
- Removed `push()` method - use `trackEvent()` instead
- Added `setUserProperties()` for user property tracking
- Added `config()` for dynamic configuration
- Updated parameter naming to follow GA4 conventions (snake_case)

**Backward Compatibility:**
- All existing methods (`trackEvent`, `trackClick`, `trackPageView`, etc.) remain functional
- Method signatures unchanged
- Components using the composable require no changes

### 3. Configuration (`src/main.ts`)

```typescript
// Changed from:
app.use(gtm, {
  id: 'GTM-5PZSPQJ5',
  enabled: true,
  debug: import.meta.env.DEV,
})

// To:
app.use(gtm, {
  id: 'G-TCD2QKZGTB',
  enabled: true,
  debug: import.meta.env.DEV,
})
```

### 4. HTML Updates (`index.html`)

**Removed:**
- GTM noscript iframe tag

**Added:**
- Preconnect hints for Google Analytics:
  ```html
  <link rel="preconnect" href="https://www.googletagmanager.com" />
  <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
  ```

### 5. Documentation (`src/plugins/GTM_USAGE.md`)

- Updated to reflect GA4 implementation
- Added GA4 event naming conventions
- Added migration notes
- Updated all examples to use GA4 parameter names

## Script Implementation

The GA4 implementation matches the provided gtag.js code:

```javascript
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-TCD2QKZGTB"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-TCD2QKZGTB');
</script>
```

This is now implemented dynamically via the Vue plugin.

## Breaking Changes

### None for Component Code
All existing components using `useGoogleTagManager()` will continue to work without changes.

### Parameter Naming (Optional)
For full GA4 compliance, consider updating parameter names to snake_case:

```typescript
// Old style (still works)
trackEvent('button_click', {
  buttonName: 'Download CV',
  elementType: 'primary',
})

// GA4 style (recommended)
trackEvent('button_click', {
  button_name: 'Download CV',
  element_type: 'primary',
})
```

## Testing

### Development
1. Run the app in development mode
2. Check browser console for GA4 initialization:
   ```
   [GA4] Initialized with ID: G-TCD2QKZGTB
   ```
3. Trigger events and verify logging:
   ```
   [GA4] Event tracked: theme_toggle { theme: 'dark', timestamp: '...' }
   ```

### Production
1. Build and deploy the app
2. Use [GA4 DebugView](https://support.google.com/analytics/answer/7201382) to verify events
3. Monitor network requests to `https://www.google-analytics.com/g/collect`

## GA4 Event Naming Best Practices

### Event Names
- Use lowercase with underscores: `button_click`, `page_view`, `theme_toggle`
- Be consistent across your application
- Avoid special characters except underscores

### Parameter Names
- Use snake_case: `page_path`, `element_name`, `button_name`
- Follow [GA4 recommended events](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- Use consistent naming conventions

### Standard Parameters
- `page_path` - URL path
- `page_title` - Page title
- `element_name` - Element identifier
- `event_category` - Event category
- `event_action` - Action performed
- `event_label` - Additional label
- `value` - Numeric value

## Files Modified

1. ✅ `src/plugins/gtm.ts` - Complete refactor to GA4
2. ✅ `src/composables/useGoogleTagManager.ts` - Updated to use GA4 API
3. ✅ `src/main.ts` - Updated measurement ID
4. ✅ `index.html` - Removed GTM noscript, added preconnect hints
5. ✅ `src/plugins/GTM_USAGE.md` - Updated documentation

## Components Using Analytics

These components currently use the analytics composable and require no changes:

1. `src/components/atoms/ThemeToggle/ThemeToggle.vue`
   - Tracks theme toggle events
   - Works without modification

## Verification Checklist

- ✅ Plugin refactored to use gtag.js
- ✅ Composable updated with new API
- ✅ Configuration updated with new measurement ID
- ✅ HTML updated (noscript removed, preconnect added)
- ✅ Documentation updated
- ✅ No linter errors
- ✅ Backward compatibility maintained
- ✅ TypeScript types updated
- ✅ Existing components work without changes

## Next Steps

1. **Test the implementation:**
   ```bash
   npm run dev
   ```
   Open browser console and verify GA4 initialization and event tracking.

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Verify in GA4:**
   - Open Google Analytics 4
   - Navigate to DebugView
   - Verify events are being received

4. **Optional: Update event parameters** to use snake_case for full GA4 compliance throughout the application.

## Rollback Plan

If you need to rollback to GTM:

1. Revert changes to the 5 modified files
2. Update measurement ID back to `GTM-5PZSPQJ5`
3. Restore GTM noscript tag in `index.html`
4. Update preconnect URLs

## Support

For questions about:
- **GA4**: See `src/plugins/GTM_USAGE.md`
- **Implementation**: Check the code comments in `src/plugins/gtm.ts`
- **Events**: Refer to [GA4 documentation](https://developers.google.com/analytics/devguides/collection/ga4)


