<template>
  <picture v-if="usePicture" class="block">
    <source
      v-if="sources.avif"
      :srcset="sources.avif"
      type="image/avif"
    />
    <source
      v-if="sources.webp"
      :srcset="sources.webp"
      type="image/webp"
    />
    <img
      :src="sources.jpg"
      :alt="alt"
      :width="width"
      :height="height"
      :class="imgClass"
      :loading="loading"
      :decoding="decoding"
      @error="handleError"
    />
  </picture>

  <img
    v-else
    :src="imageUrl"
    :srcset="srcset"
    :sizes="sizes"
    :alt="alt"
    :width="width"
    :height="height"
    :class="imgClass"
    :loading="loading"
    :decoding="decoding"
    @error="handleError"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  quality?: number
  format?: 'auto' | 'webp' | 'jpg' | 'png' | 'avif'
  blur?: number
  class?: string
  loading?: 'lazy' | 'eager'
  decoding?: 'async' | 'sync' | 'auto'
  responsive?: boolean
  responsiveWidths?: number[]
  sizes?: string
  usePicture?: boolean
  crop?: 'maintain_ratio' | 'force' | 'at_least' | 'at_max'
  focus?: 'auto' | 'face' | 'center'
}

const props = withDefaults(defineProps<Props>(), {
  quality: 80,
  format: 'auto',
  loading: 'lazy',
  decoding: 'async',
  responsive: false,
  responsiveWidths: () => [400, 800, 1200, 1600],
  usePicture: false,
  crop: 'maintain_ratio',
  focus: 'auto'
})

const emit = defineEmits<{
  error: [event: Event]
}>()

const { getImageUrl, getResponsiveSrcset, getPictureSources } = useImageKit()

// URL de l'image avec transformations
const imageUrl = computed(() => {
  return getImageUrl(props.src, {
    width: props.width,
    height: props.height,
    quality: props.quality,
    format: props.format,
    blur: props.blur,
    crop: props.crop,
    focus: props.focus
  })
})

// Srcset pour images responsives
const srcset = computed(() => {
  if (!props.responsive) return undefined
  
  return getResponsiveSrcset(props.src, props.responsiveWidths, {
    quality: props.quality,
    format: props.format,
    crop: props.crop,
    focus: props.focus
  })
})

// Sources pour <picture> avec différents formats
const sources = computed(() => {
  if (!props.usePicture) return {}
  
  return getPictureSources(props.src, {
    width: props.width,
    height: props.height,
    quality: props.quality,
    crop: props.crop,
    focus: props.focus
  })
})

const imgClass = computed(() => props.class || '')

const handleError = (event: Event) => {
  emit('error', event)
  console.error('Erreur de chargement d\'image:', props.src)
}
</script>
