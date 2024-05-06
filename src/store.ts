import { reactive } from 'vue';

import Node from '@/structures/Node';

export const store = reactive<{
    solutionId: number | null;
    currentId: number;
    steps: number;
    levels: Node[][];
    speed: number;
}>({
    solutionId: null,
    currentId: 0,
    steps: 0,
    levels: [],
    speed: 1000,
});
