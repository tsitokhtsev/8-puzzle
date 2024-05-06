import { nextTick } from 'vue';
// @ts-ignore
import { LinePath } from 'svg-dom-arrows';

import Node from '@/structures/Node';
import { store } from '@/store';

export const directions = [
    {
        name: 'up',
        direction: [-1, 0],
    },
    {
        name: 'down',
        direction: [1, 0],
    },
    {
        name: 'left',
        direction: [0, -1],
    },
    {
        name: 'right',
        direction: [0, 1],
    },
];

export function compareStates(state1: number[][], state2: number[][]) {
    return JSON.stringify(state1) === JSON.stringify(state2);
}

export function discoverChildren(parentNode: Node) {
    const state = parentNode.state;

    let actions = [];
    let zeroIndex = [0, 0];

    for (let i in state) {
        for (let j in state[i]) {
            if (state[i][j] === 0) {
                zeroIndex = [parseInt(i), parseInt(j)];
                break;
            }
        }
    }

    for (let direction of directions) {
        let newZeroIndex = [
            zeroIndex[0] + direction.direction[0],
            zeroIndex[1] + direction.direction[1],
        ];

        if (
            newZeroIndex[0] >= 0 &&
            newZeroIndex[0] < state.length &&
            newZeroIndex[1] >= 0 &&
            newZeroIndex[1] < state[0].length
        ) {
            let newState = JSON.parse(JSON.stringify(state));
            newState[zeroIndex[0]][zeroIndex[1]] =
                newState[newZeroIndex[0]][newZeroIndex[1]];
            newState[newZeroIndex[0]][newZeroIndex[1]] = 0;
            actions.push(
                new Node(
                    newState,
                    parentNode,
                    direction.name,
                    parentNode.pathCost + 1,
                    parentNode.depth + 1,
                    ++store.steps
                )
            );
        }
    }

    return actions;
}

export function updateTree(nodesDiscoveredFiltered: Node[]) {
    const depth = nodesDiscoveredFiltered[0].depth;
    store.levels[depth]
        ? store.levels[depth].push(...nodesDiscoveredFiltered)
        : store.levels.push(nodesDiscoveredFiltered);

    nextTick(() => {
        document.getElementById(`grid-${store.currentId}`)?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        });

        document
            .querySelectorAll('.line-path')
            .forEach((element) => element.remove());

        store.levels.forEach((level) => {
            level.forEach((node) => {
                const element = document.getElementById(`grid-${node.id}`);
                const parentElement = document.getElementById(
                    `grid-${node.parentNode?.id}`
                );

                if (!element || !parentElement) {
                    return;
                }

                const options = {
                    start: {
                        element: parentElement,
                        position: {
                            top: 1,
                            left: 0.5,
                        },
                    },
                    end: {
                        element: element,
                        position: {
                            top: 0,
                            left: 0.5,
                        },
                    },
                    style: 'stroke:green;stroke-width:4;fill:transparent',
                    appendTo: document.body,
                    customClass: {
                        container: 'line-path',
                    },
                };

                new LinePath(options);
            });
        });
    });
}

export function reset() {
    document
        .querySelectorAll('.line-path')
        .forEach((element) => element.remove());

    store.solutionId = null;
    store.currentId = 0;
    store.steps = 0;
    store.levels = [];
}
