<template>
  <div class="relative flex flex-col">
    <input
      :id="label + '-input'"
      :value="modelValue"
      @input="updateValue"
      :type="type"
      :placeholder="label"
      :class="[
        inputClasses,
        'peer rounded-lg border-2 border-transparent bg-slate-100 placeholder-transparent transition duration-200 focus:bg-white focus:ring focus:ring-slate-200 disabled:text-slate-600',
        { 'hover:bg-white hover:ring hover:ring-slate-200': !disabled },
        [label ? 'px-4 pb-2 pt-5' : 'p-4'],
      ]"
      :disabled="disabled"
      :required="required"
    />
    <label
      v-if="label"
      :for="label + '-input'"
      class="absolute left-0.5 top-1.5 ml-4 text-xs text-slate-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-slate-500"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps({
  type: { type: String, required: true },
  modelValue: { type: String, required: true },
  label: { type: String, default: null },
  inputClasses: { type: String, default: "" },
  labelClasses: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
});

const emit = defineEmits<{ (e: "update:modelValue", value: string): void }>();
function updateValue(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>
