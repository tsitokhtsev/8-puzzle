import Node from '@/structures/Node';
import { store } from '@/store';
import { compareStates, discoverChildren, updateTree } from '@/utils';

async function bfs(initialState: number[][], goalState: number[][]) {
    const openList: Node[] = [];
    const closedList: Node[] = [];

    const initialNode = new Node(initialState);
    openList.push(initialNode);

    while (openList.length > 0) {
        const currentNode = openList.shift()!;
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

        openList.push(...nodesDiscoveredFiltered);
        updateTree(nodesDiscoveredFiltered);

        await new Promise((resolve) => setTimeout(resolve, store.speed));
    }

    return null;
}

export default bfs;
