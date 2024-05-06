import Node from '@/structures/Node';
import PriorityQueue from '@/structures/PriorityQueue';
import { store } from '@/store';
import { compareStates, discoverChildren, updateTree } from '@/utils';

async function aStar(initialState: number[][], goalState: number[][]) {
    const openList = new PriorityQueue();
    const closedList: Node[] = [];

    const initialNode = new Node(initialState);
    openList.enqueue(
        initialNode,
        initialNode.pathCost + calculateHeuristic(initialState, goalState)
    );

    while (!openList.isEmpty()) {
        const currentNode = openList.dequeue()!;
        closedList.push(currentNode);
        store.currentId = currentNode.id;

        if (compareStates(currentNode.state, goalState)) {
            store.solutionId = currentNode.id;
            return;
        }

        const nodesDiscovered = discoverChildren(currentNode);
        const nodesDiscoveredFiltered = nodesDiscovered.filter((node) => {
            return !closedList.some((closedNode) => {
                return compareStates(closedNode.state, node.state);
            });
        });

        nodesDiscoveredFiltered.forEach((node) => {
            openList.enqueue(
                node,
                node.pathCost + calculateHeuristic(node.state, goalState)
            );
        });
        updateTree(nodesDiscoveredFiltered);

        await new Promise((resolve) => setTimeout(resolve, store.speed));
    }

    return null;
}

function calculateHeuristic(state: number[][], goalState: number[][]) {
    let heuristic = 0;

    for (const i in state) {
        for (const j in state[i]) {
            const value = state[i][j];
            const goalIndex = findIndex(goalState, value);

            heuristic += Math.abs(parseInt(i) - goalIndex[0]);
            heuristic += Math.abs(parseInt(j) - goalIndex[1]);
        }
    }

    return heuristic;
}

function findIndex(state: number[][], value: number) {
    for (const i in state) {
        for (const j in state[i]) {
            if (state[i][j] === value) {
                return [parseInt(i), parseInt(j)];
            }
        }
    }

    return [-1, -1];
}

export default aStar;
