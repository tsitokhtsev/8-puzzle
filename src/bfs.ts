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

let id = 1;

export class Node {
  id: number;
  state: number[][];
  parentNode: Node | null;
  action: string;
  pathCost: number;
  depth: number;

  constructor(
    id: number,
    state: number[][],
    parentNode: Node | null,
    action: string,
    pathCost: number,
    depth: number
  ) {
    this.id = id;
    this.state = state;
    this.parentNode = parentNode;
    this.action = action;
    this.pathCost = pathCost;
    this.depth = depth;
  }
}

export async function bfs(
  initialNode: Node,
  goalState: number[][],
  onActionsDiscovered: (nodes: Node[]) => void,
  isPaused: { value: boolean }
) {
  let openList: Node[] = [];
  let closedList: Node[] = [];

  openList.push(initialNode);

  while (openList.length > 0) {
    let currentNode = openList.shift()!;
    closedList.push(currentNode);

    if (compareStates(currentNode.state, goalState)) {
      return currentNode;
    }

    let nodesDiscovered = discoverChildren(currentNode);
    let nodesDiscoveredFiltered = nodesDiscovered.filter((node) => {
      return !closedList.some((closedNode) => {
        return compareStates(closedNode.state, node.state);
      });
    });

    openList.push(...nodesDiscoveredFiltered);
    onActionsDiscovered(nodesDiscoveredFiltered);

    await new Promise((resolve) => setTimeout(resolve, 300));

    while (isPaused.value) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  return null;
}

function compareStates(state1: number[][], state2: number[][]) {
  return JSON.stringify(state1) === JSON.stringify(state2);
}

function discoverChildren(node: Node) {
  const state = node.state;

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
        new Node(++id, newState, node, direction.name, 1, node.depth + 1)
      );
    }
  }

  return actions;
}
