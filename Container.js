/* 
The LIFO based doubly linked list, that will be used as the 
container of the math expressions that have been inputed by 
the user. 
*/
export class Container {
    #head;
    #curr;
    #tail; 
    #numItems; 

    constructor() {
        this.#head = null;
        this.#curr = null;
        this.#tail = null; 
        this.#numItems = 0; 
    }

    setHead(data) {
        this.#head = data; 
    }

    setTail(data) {
        this.#tail = data; 
    }

    setCurr(data) {
        this.#curr = data; 
    }
    
    getHead() {
        return this.#head; 
    }

    getTail() {
        return this.#tail; 
    }

    getCurr() {
        return this.#curr; 
    }

    getNext() {
        if (this.getNumItems() <= 1) {
            return false; 
        } else {
            this.moveForward(); 
            let node = this.getCurr(); 
            this.goToFront(); 
            return node;
        }
    }

    getNumItems() {
        return this.#numItems; 
    }

    isHead() {
        return (this.#curr === this.#head); 
    }

    isTail() {
        return (this.#curr === this.#tail);
    }

    isEmpty() {
        return (this.getNumItems() === 0); 
    }

    push(data) {
        if (this.isEmpty()) {
            this.setHead(data);
            this.setTail(data);
            this.setCurr(data);
            this.#numItems += 1; 
        } else {
            var prevNode = this.#head; 
            prevNode.setPrev(data);
            data.setNext(prevNode);

            this.setHead(data); 
            this.setCurr(data); 
            this.#numItems += 1; 
        }
    }

    pop() {
        var node = this.#curr; 
        
        if (this.isEmpty()) {
            return null;
        } else if (this.#numItems === 1) {
            this.setHead(null); 
            this.setTail(null);
            this.setCurr(null); 
            this.#numItems = 0 
        } else {
           var prevNode = this.#head; 
           var newHead = prevNode.getNext();

           prevNode.setNext(null); 
           newHead.setPrev(null); 

           this.setHead(newHead); 
           this.setCurr(newHead); 
           this.#numItems -= 1; 
        }

        return node; 
    }

    moveForward() {
        if (this.isEmpty() || this.isTail()) {
            return false; 
        } else {
            var currNode = this.getCurr();
            this.setCurr(currNode.getNext()); 
            return true; 
        }
    }

    moveBackward() {
        if (this.isEmpty() || this.isHead()) {
            return false; 
        } else {
            var currNode = this.getCurr(); 
            this.setCurr(currNode.getPrev()); 
            return true; 
        }
    }

    goToFront() {
        if (this.isEmpty() || this.isHead()) {
            return false; 
        } else {
            this.setCurr(this.getHead());
            return true; 
        }
    }

    goToBack() {
        if (this.isEmpty() || this.isTail()) {
            return false; 
        } else {
            this.setCurr(this.getTail()); 
            return true; 
        }
    }
}