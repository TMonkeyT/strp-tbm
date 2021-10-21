<template>
    <div :class="'spinner-border ' + 'text-' + type" style="width: 3rem; height: 3rem;" role="status">
    </div>
</template>

<script>
export default {
    props: ["type"]
}
</script>

<style>

</style>