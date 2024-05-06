class Node {
    state: number[][];
    parentNode: Node | null;
    action: string;
    pathCost: number;
    depth: number;
    id: number;

    constructor(
        state: number[][],
        parentNode: Node | null = null,
        action: string = '',
        pathCost: number = 0,
        depth: number = 0,
        id: number = 0
    ) {
        this.state = state;
        this.parentNode = parentNode;
        this.action = action;
        this.pathCost = pathCost;
        this.depth = depth;
        this.id = id;
    }
}

export default Node;
