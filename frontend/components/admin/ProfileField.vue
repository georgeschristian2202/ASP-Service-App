<template>
  <div>
    <label :for="fieldId" class="mb-2 block text-sm font-semibold text-slate-700">
      {{ label }} <span v-if="required" class="text-red-600">*</span>
    </label>
    <div class="relative">
      <component :is="fieldIcon" class="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
      <input
        :id="fieldId"
        :value="modelValue"
        :type="type"
        :required="required"
        :placeholder="placeholder"
        class="profile-field-control"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2, Image, Mail, MapPin, Phone, Sparkles } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  modelValue: string
  label: string
  placeholder?: string
  type?: string
  required?: boolean
  icon?: 'building' | 'sparkles' | 'image' | 'mail' | 'phone' | 'map'
}>(), {
  placeholder: '',
  type: 'text',
  required: false,
  icon: 'building'
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

const fieldId = useId()
const icons = {
  building: Building2,
  sparkles: Sparkles,
  image: Image,
  mail: Mail,
  phone: Phone,
  map: MapPin
}
const fieldIcon = computed(() => icons[props.icon])
</script>

<style scoped>
.profile-field-control {
  width: 100%;
  min-height: 3.25rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  background: #f8fafc;
  padding: 0.75rem 1rem 0.75rem 2.75rem;
  color: #0f172a;
  outline: none;
  transition: border-color 150ms ease, box-shadow 150ms ease, background-color 150ms ease;
}

.profile-field-control:focus {
  border-color: #2563eb;
  background: #fff;
  box-shadow: 0 0 0 4px rgb(37 99 235 / 12%);
}
</style>
