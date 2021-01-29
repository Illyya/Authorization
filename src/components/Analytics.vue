<template>
  <div>
    <h1>Аналитика</h1>
    <h2>Аналитика по визитам</h2>
    <lineChart></lineChart>
  </div>
</template>

<script>
import lineChart from "./LineChart";

export default {
  name: "Analytics",
  components: {
    lineChart,
  },
};
</script>

<style>
</style>