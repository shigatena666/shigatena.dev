<script setup lang="ts">
defineProps({
  error: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div>
    <Html
      :lang="$i18n.locale"
      class="bg-zinc-950 text-main font-geist transition-colors duration-300 selection:bg-white/60 selection:text-zinc-800"
    >
      <Body>
        <LayoutScrollToTop />
        <NuxtLayout>
          <div class="flex items-center justify-center min-h-screen">
            <div class="text-center">
              <p class="text-accent text-base font-semibold">
                {{ error.statusCode }}
              </p>
              <h1 class="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
                {{ error.message }}
              </h1>
              <p class="mt-6 text-base leading-7 text-gray-600">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div class="mt-10 flex items-center justify-center gap-x-6">
                <SpotlightButton 
                  transparent
                  class="border border-white/10 flex size-10 items-center justify-center p-1 text-muted transition-all duration-200 hover:text-main">
                    <NuxtLink
                      :to="'/'"
                      class="flex"
                    >
                    <UIcon
                      name="heroicons-home"
                      class="size-6 text-white/80"
                    />
                    </NuxtLink>
                </SpotlightButton>
              </div>
            </div>
          </div>
        </NuxtLayout>
        <DotPattern class="absolute inset-0 -z-10 size-full fill-white/5" />
      </Body>
    </Html>
  </div>
</template>
