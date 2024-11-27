/* Basic generic queue implementation in TypeScript
** 
** Author: Fabrício Galende M. de Carvalho DSc
*/

class MyNode<T>{
    value: T;
    next: MyNode<T>;
    constructor(v: T) {
        this.value = v;
        this.next = {} as MyNode<T>;
    }
}

class Queue<T>{
    includes(floor: number) {
      throw new Error("Method not implemented.");
    }
    length: number;
    head: MyNode<T>;
    tail: MyNode<T>;
    constructor() {
        this.head = {} as MyNode<T>;
        this.tail = {} as MyNode<T>;
        this.length = 0;
    }

    isEmpty(): boolean {
        return (this.length == 0);
    }

    add(node: MyNode<T>) {
        if (!this.isEmpty()) {
            this.tail.next = node;
        } else {
            this.head = node;
        }
        this.tail = node;
        ++this.length;
    }

    remove(): MyNode<T> {
        let removed_node = {} as MyNode<T>;
        if (!this.isEmpty()) {
            removed_node = this.head;
            this.head = this.head.next;
            --this.length;
        }
        return removed_node;
    }

    print(): void {
        let currentNode = this.head;
        const output: T[] = [];
        while (Object.keys(currentNode).length !== 0) {
            output.push(currentNode.value);
            currentNode = currentNode.next;
        }

        console.log("HEAD->", output.join("-"), "->TAIL");

    }
}

export { MyNode, Queue }