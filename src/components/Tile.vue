<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
    tile: number;
}>();
</script>

<template>
    <div :class="`tile ${tile === 0 ? 'black' : ''}`">
        {{ tile === 0 ? '' : tile }}
    </div>
</template>

<style scoped>
.tile {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    color: black;
    background-color: white;
    border: 1px solid black;

    &.black {
        background-color: black;
        color: white;
    }
}
</style>
