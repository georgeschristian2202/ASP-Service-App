# Fix Logo White Background in Footer

## Issue
The logo in the footer appears with a white background instead of being transparent.

## Root Cause
The PNG file `/public/Logo-ASP-Service-sans fond.png` likely has an embedded white background instead of true transparency (alpha channel).

## Solutions Applied

### 1. CSS Fix (Already Applied)
Added to `components/layout/TheFooter.vue`:
```vue
<img 
  src="/Logo-ASP-Service-sans fond.png" 
  alt="ASP Services Gabon" 
  class="h-16 w-auto mb-4 bg-transparent" 
  style="mix-blend-mode: lighten;"
  @error="handleLogoError"
>
```

- `bg-transparent`: Ensures no CSS background
- `mix-blend-mode: lighten`: Makes white pixels blend with dark footer background

### 2. Permanent Fix (Recommended)
Replace the PNG file with a version that has:
- **True transparency** (alpha channel)
- **No white background pixels**

#### How to Create Transparent PNG:
1. Open `Logo-ASP-SERVICE.jpg` in image editor (Photoshop, GIMP, Photopea)
2. Remove white background using:
   - Magic wand tool
   - Background eraser
   - Or layer mask
3. Export as PNG with transparency
4. Save as `/public/Logo-ASP-Service-sans fond.png`

#### Online Tools:
- [remove.bg](https://www.remove.bg/) - Automatic background removal
- [Photopea](https://www.photopea.com/) - Free online Photoshop alternative

## Verification
After replacing the file:
1. Hard refresh browser (Ctrl + Shift + R)
2. Check footer logo on dark background
3. Logo should blend seamlessly without white box

## Address Configuration ✅
The following are already correctly configured:

### In Code:
- `nuxt.config.ts`: `address: 'Libreville, Likouala en face de l\'église Hebron'`
- `components/layout/TheFooter.vue`: Displays correct address
- All pages: Use correct address from config

### Google Maps:
- URL: `https://www.google.com/maps/search/?api=1&query=Libreville+Likouala+église+Hebron`
- Points to: **Libreville, Likouala en face de l'église Hebron** ✅

## Status
- ✅ Address updated everywhere
- ✅ Google Maps URL correct
- ⚠️ Logo CSS fix applied (may need PNG file replacement for perfect result)
