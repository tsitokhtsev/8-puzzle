<script setup lang="ts">
import aStar from '@/algorithms/aStar';
import bfs from '@/algorithms/bfs';
import Tile from '@/components/Tile.vue';
import Node from '@/structures/Node';
import { reset } from '@/utils';
import { store } from '@/store';

const initialState = [
    [2, 8, 3],
    [1, 6, 4],
    [7, 0, 5],
];

const goalState = [
    [1, 2, 3],
    [8, 0, 4],
    [7, 6, 5],
];

if (!store.levels.length) {
    store.levels.push([new Node(initialState)]);
}

async function solve(algorithm: 'aStar' | 'bfs') {
    reset();
    store.levels.push([new Node(initialState)]);

    switch (algorithm) {
        case 'aStar':
            await aStar(initialState, goalState);
            break;
        case 'bfs':
            await bfs(initialState, goalState);
            break;
        default:
            break;
    }
}
</script>

<template>
    <div class="controls">
        <button @click="solve('aStar')">A*</button>
        <button @click="solve('bfs')">BFS</button>
    </div>

    <div class="levels">
        <div v-for="(level, depth) in store.levels" class="level">
            <h2>Depth: {{ depth }}</h2>

            <div class="level-content">
                <div v-for="node in level" class="node">
                    <div
                        :id="`grid-${node.id}`"
                        :class="`grid ${
                            node.id === store.currentId ? 'current' : ''
                        } ${node.id === store.solutionId ? 'solution' : ''}`"
                    >
                        <div
                            v-for="(row, i) in node.state"
                            :key="i"
                            class="row"
                        >
                            <Tile
                                v-for="(tile, j) in row"
                                :key="j"
                                :tile="tile"
                            />
                        </div>
                    </div>

                    <div>Step: {{ node.id }}</div>
                    <div v-if="node.action">Action: {{ node.action }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
#app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    max-width: none;
    min-height: 100vh;
}

.controls {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 50px;
    min-width: 100%;

    button {
        padding: 10px 20px;
        font-size: 16px;
    }
}

.levels {
    display: flex;
    flex-direction: column;
    gap: 40px;
    min-width: 100%;

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

            .current {
                border: 3px solid yellow;
            }

            .solution {
                border: 3px solid green;
            }
        }
    }
}
</style>
