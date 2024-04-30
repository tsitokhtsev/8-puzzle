<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { bfs, Node } from './bfs';
import Tile from './components/Tile.vue';
import { LinePath } from 'svg-dom-arrows';

const initialState = [
    [2, 8, 3],
    [1, 6, 4],
    [7, 0, 5],
];

// const initialState = [
//     [3, 1, 2],
//     [7, 0, 5],
//     [4, 8, 6]
// ];

// const initialState = [
//     [1, 2, 3],
//     [0, 8, 4],
//     [7, 6, 5],
// ];

const goalState = [
    [1, 2, 3],
    [8, 0, 4],
    [7, 6, 5],
];

const initialNode = new Node(1, initialState, null, '', 0, 0);

const levels = ref([[initialNode]]);
const isPaused = ref(false);
const solutionId = ref();

function onActionsDiscovered(nodes: Node[]) {
    const depth = nodes[0].depth;
    levels.value[depth] ? levels.value[depth].push(...nodes) : levels.value.push(nodes);

    nextTick(() => {
        drawPaths();
    });
};

function drawPaths() {
    document.querySelectorAll('svg').forEach((element) => element.remove());

    levels.value.forEach((level) => {
        level.forEach((node) => {
            const element = document.getElementById(`grid-${node.id}`);
            const parentElement = document.getElementById(`grid-${node.parentNode?.id}`);

            if (!element || !parentElement) {
                return;
            }

            const options = {
                start: {
                    element: parentElement,
                    position: {
                        top: 1,
                        left: 0.5
                    }
                },
                end: {
                    element: element,
                    position: {
                        top: 0,
                        left: 0.5
                    }
                },
                style: 'stroke:white;stroke-width:4;fill:transparent',
                appendTo: document.body
            };

            new LinePath(options);
        });
    });
}

const solvePuzzle = async () => {
    const solution = await bfs(initialNode, goalState, onActionsDiscovered, isPaused);

    if (!solution) {
        alert('No solution found');
        return;
    }

    solutionId.value = solution.id;
    // drawPaths();
};
</script>

<template>
    <div class="levels">
        <div v-for="(level, depth) in levels" class="level">
            <h2>Depth: {{ depth }}</h2>

            <div class="level-content">
                <div v-for="node in level" class="node">
                    <div :id="`grid-${node.id}`" :class="`grid ${node.id === solutionId ? 'solution' : ''}`">
                        <div v-for="(row, i) in node.state" :key="i" class="row">
                            <Tile v-for="(tile, j) in row" :key="j" :tile="tile" />
                        </div>
                    </div>

                    <div>ID: {{ node.id }}</div>
                    <!-- <div v-if="node.parentNode?.id">Parent ID: {{ node.parentNode.id }}</div> -->
                    <div v-if="node.action">Action: {{ node.action }}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="controls">
        <button @click="solvePuzzle">Solve</button>
        <button @click="isPaused = !isPaused">{{ isPaused ? 'Resume' : 'Pause' }}</button>
    </div>
</template>

<style>
#app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: none;
    min-height: 100vh;
}

.levels {
    display: flex;
    flex-direction: column;
    gap: 40px;

    .level {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;

        .level-content {
            display: flex;
            gap: 20px;

            .grid {
                border: 1px solid black;

                .row {
                    display: flex;
                }
            }

            .solution {
                border: 3px solid red;
            }
        }
    }
}

.controls {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 50px;

    button {
        padding: 10px 20px;
        font-size: 16px;
    }
}
</style>
