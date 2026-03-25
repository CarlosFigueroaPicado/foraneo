# Asset Optimization Quick Start Guide

This guide provides immediate steps to reduce the Foráneo app bundle size from 138 MB to ~50 MB.

## Priority 1: Remove Unused/Duplicate Files (5 minutes, 64 MB saved)

### Files to Delete Immediately

```bash
cd /home/runner/work/foraneo/foraneo/front

# Delete duplicate GIF (32 MB) - not referenced in code
rm -f "resources/Adobe Express - Generated File September 28, 2025 - 8_37AM.gif"

# Delete duplicate GIF (32 MB) - duplicate of another file
rm -f "resources/inicio/Sugerencia del dia/GIF cerro negro.gif"

# Delete duplicate patron login GIF (1.7 MB)
rm -f "resources/Adobe Express - patronloginn.gif"
```

**Total saved: 65.7 MB (48% reduction)**

## Priority 2: Optimize Large PNGs (30 minutes, 10 MB saved)

### Install Tools

```bash
npm install --save-dev sharp-cli @squoosh/cli
```

### Convert to WebP Format

```bash
# Optimize 84179-Puerto-Salvador-Allende.png (6.6 MB → ~600 KB)
npx sharp-cli \
  --input resources/84179-Puerto-Salvador-Allende.png \
  --output resources/84179-Puerto-Salvador-Allende.webp \
  --webp-quality 85 \
  --resize 1200

# Optimize 84181-Puerto-Salvador-Allende.png (4.7 MB → ~500 KB)
npx sharp-cli \
  --input resources/84181-Puerto-Salvador-Allende.png \
  --output resources/84181-Puerto-Salvador-Allende.webp \
  --webp-quality 85 \
  --resize 1200

# Optimize GRANADA.jpg (2.3 MB → ~300 KB)
npx sharp-cli \
  --input resources/inicio/cards/GRANADA.jpg \
  --output resources/inicio/cards/GRANADA.webp \
  --webp-quality 85 \
  --resize 1200
```

### Update Code References

**File: `front/constants/content.ts`**

```diff
 export const heroEvents: ShowcaseItem[] = [
   {
     id: 'catedral-leon',
     title: 'Catedral de León',
     description: 'Descubre la historia y la vista panorámica de la Basílica Catedral de la Asunción.',
-    image: require('../resources/84179-Puerto-Salvador-Allende.png'),
+    image: require('../resources/84179-Puerto-Salvador-Allende.webp'),
     category: 'Cultura',
     rating: 4.9,
     reviews: 128,
     price: 'Desde $12',
   },
   {
     id: 'patron-salvador',
     title: 'Puerto Salvador Allende',
     description: 'Gastronomía, música y vistas al lago Xolotlán.',
-    image: require('../resources/84181-Puerto-Salvador-Allende.png'),
+    image: require('../resources/84181-Puerto-Salvador-Allende.webp'),
     category: 'Gastronomía',
     rating: 4.6,
     reviews: 76,
     price: 'Gratis',
   },
 ];
```

### Delete Original Files

```bash
# After verifying WebP versions work correctly
rm -f resources/84179-Puerto-Salvador-Allende.png
rm -f resources/84181-Puerto-Salvador-Allende.png
rm -f resources/inicio/cards/GRANADA.jpg
```

**Total saved: ~13 MB (87% reduction on these files)**

## Priority 3: Convert GIF to MP4 (15 minutes, 1.5 MB saved)

### Convert Background Pattern

```bash
# Install ffmpeg (if not already installed)
# macOS: brew install ffmpeg
# Ubuntu: sudo apt install ffmpeg
# Windows: download from ffmpeg.org

# Convert GIF to optimized MP4
ffmpeg -i "resources/login y registro/GIF patron login.gif" \
  -vcodec libx264 \
  -crf 28 \
  -pix_fmt yuv420p \
  -vf "scale=720:-1" \
  resources/login-pattern.mp4
```

### Update Code

**File: `front/app/sign-up.tsx`**

```diff
+import { Video } from 'expo-av';

 <View pointerEvents="none" className="absolute inset-0">
-  <Image
-    source={require('../resources/login y registro/GIF patron login.gif')}
-    className="h-full w-full opacity-30"
-    resizeMode="cover"
-  />
+  <Video
+    source={require('../resources/login-pattern.mp4')}
+    style={{ height: '100%', width: '100%', opacity: 0.3 }}
+    resizeMode="cover"
+    isLooping
+    isMuted
+    shouldPlay
+  />
 </View>
```

### Delete Original GIF

```bash
rm -f "resources/login y registro/GIF patron login.gif"
```

**Total saved: ~1.5 MB (88% reduction)**

## Priority 4: Audit All Resources (1 hour)

### Find All Large Files

```bash
# List all files larger than 500 KB
find resources/ -type f -size +500k -exec du -h {} + | sort -rh

# Count total size by file type
find resources/ -type f -name "*.png" -exec du -ch {} + | tail -1
find resources/ -type f -name "*.jpg" -exec du -ch {} + | tail -1
find resources/ -type f -name "*.gif" -exec du -ch {} + | tail -1
```

### Check for Unused Files

```bash
# Search for image usage in code
rg "require\(['\"].*resources/" front/ -o -N | sort | uniq > used-images.txt

# Compare with actual files
find resources/ -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.gif" \) > all-images.txt

# Find files not referenced in code (manual review needed)
comm -23 <(sort all-images.txt) <(sort used-images.txt)
```

## Verification Checklist

After each optimization step:

- [ ] Run `npm start` to verify app builds successfully
- [ ] Test on physical device to ensure images display correctly
- [ ] Check WebP format works on target platforms (iOS/Android)
- [ ] Verify animated elements (GIF → MP4) loop correctly
- [ ] Test offline image caching (if using expo-image)
- [ ] Compare bundle size: `du -sh resources/`

## Expected Results

| Step | Time | Size Before | Size After | Savings |
|------|------|-------------|------------|---------|
| Remove duplicates | 5 min | 138 MB | 72 MB | 66 MB (48%) |
| Optimize PNGs | 30 min | 72 MB | 59 MB | 13 MB (18%) |
| Convert GIFs | 15 min | 59 MB | 57 MB | 2 MB (3%) |
| **Total** | **50 min** | **138 MB** | **~55-60 MB** | **~80 MB (58%)** |

## Advanced Optimizations (Future)

### Install expo-image for Better Performance

```bash
npm install expo-image
```

Benefits:
- Automatic format conversion (PNG → WebP)
- Progressive loading
- Memory-efficient caching
- Native performance

### Implement CDN Delivery

Move large assets to cloud storage:

```typescript
// Instead of bundling images
const image = require('../resources/large-image.png');

// Load from CDN
const image = { uri: 'https://cdn.foraneo.com/images/large-image.webp' };
```

Benefits:
- Smaller app bundle (no images included)
- Faster updates (no re-download for image changes)
- Better caching control

### Use Asset Compression in Expo Config

**File: `app.json`**

```json
{
  "expo": {
    "assetBundlePatterns": [
      "**/*"
    ],
    "extra": {
      "imageCompressionQuality": 0.8
    }
  }
}
```

## Troubleshooting

### WebP Images Not Displaying

If WebP doesn't work on older devices:

```bash
# Create both WebP and fallback
npx sharp-cli --input image.png --output image.webp --webp-quality 85
npx sharp-cli --input image.png --output image-optimized.jpg --jpeg-quality 85
```

```typescript
// Runtime detection
import { Platform } from 'react-native';

const image = Platform.select({
  ios: require('./image.webp'),
  android: require('./image.webp'),
  default: require('./image-optimized.jpg'),
});
```

### FFmpeg Not Available

Use online converter:
- https://cloudconvert.com/gif-to-mp4
- https://convertio.co/gif-mp4/

### Sharp Installation Issues

Alternative using online tools:
- https://squoosh.app/ (Google's image optimizer)
- https://tinypng.com/ (PNG/JPEG optimizer)

## Monitoring Bundle Size

Add to `package.json`:

```json
{
  "scripts": {
    "check-bundle": "du -sh front/resources/ && find front/resources/ -type f | wc -l"
  }
}
```

Run after each optimization:

```bash
npm run check-bundle
```

## Next Steps

After completing asset optimization:

1. Review [PERFORMANCE_IMPROVEMENTS.md](./PERFORMANCE_IMPROVEMENTS.md) for code optimizations
2. Implement list virtualization (see [OptimizedHomeScreen.tsx](./examples/OptimizedHomeScreen.tsx))
3. Fix animation performance (see [OptimizedSplashScreen.tsx](./examples/OptimizedSplashScreen.tsx))
4. Add performance monitoring

## Support

For questions or issues:
- Check Expo documentation: https://docs.expo.dev/guides/assets/
- Sharp CLI docs: https://sharp.pixelplumbing.com/
- FFmpeg guide: https://ffmpeg.org/documentation.html
