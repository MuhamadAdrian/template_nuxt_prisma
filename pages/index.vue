<script setup lang="ts">
const { setBreadcrumb } = useBreadcrumb();

onBeforeMount(() => {
  setBreadcrumb([
    {
      text: "Home",
      to: "/",
    },
  ]);
});
</script>

<template>
  <AppHeader>Dashboard</AppHeader>
</template>
