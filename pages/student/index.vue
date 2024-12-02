<script setup lang="ts">
import { columns } from "~/utils/students/columns";
import tasks from "~/utils/students/tasks.json";
import { useQuery } from "@tanstack/vue-query";

const { data, isLoading, isError } = useQuery({
  queryKey: ["example-data"],
  queryFn: async () => $fetch("/api/student"),
});

const { setBreadcrumb } = useBreadcrumb();

onBeforeMount(() => {
  setBreadcrumb([
    {
      text: "Home",
      to: "/",
    },
    {
      text: "Student",
      to: "/student",
    },
  ]);
});
</script>

<template>
  <div class="container py-10 mx-auto">
    <AppHeader class="mb-10">Student</AppHeader>
    <DataTable v-if="!isLoading" :data="data.data" :columns="columns" />
    <Skeleton v-else class="w-full h-60" />
  </div>
</template>
