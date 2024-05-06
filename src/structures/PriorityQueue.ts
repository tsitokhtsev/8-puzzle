import Node from '@/structures/Node';

class QueueItem {
    node: Node;
    priority: number;

    constructor(node: Node, priority: number) {
        this.node = node;
        this.priority = priority;
    }
}

class PriorityQueue {
    items: QueueItem[] = [];

    constructor() {}

    enqueue(node: Node, priority: number): void {
        const queueItem = new QueueItem(node, priority);
        let added = false;

        for (let i = 0; i < this.items.length; i++) {
            if (queueItem.priority < this.items[i].priority) {
                this.items.splice(i, 0, queueItem);
                added = true;
                break;
            }
        }

        if (!added) {
            this.items.push(queueItem);
        }
    }

    dequeue(): Node | null {
        if (this.isEmpty()) {
            return null;
        }

        return this.items.shift()!.node;
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

export default PriorityQueue;
