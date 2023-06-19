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

    constructor(data) {
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

    isHead() {
        return (this.#curr === this.#head); 
    }

    isTail() {
        return (this.#curr === this.#tail);
    }

    isEmpty() {
        return (this.#numItems === 0); 
    }

    push(data) {
        if (this.isEmpty()) {
            this.setHead(data);
            this.setTail(data);
            this.setCurr(data);
            this.#numItems += 1; 
        } else {
            prevNode = this.#head; 
            prevNode.setPrev(data);

            this.setHead(data); 
            this.setCurr(data); 
            this.#numItems += 1; 
        }
    }

    pop() {
        node = this.#curr; 
        
        if (this.isEmpty()) {
            return false;
        } else if (this.#numItems === 1) {
            this.setHead(null); 
            this.setTail(null);
            this.setCurr(null); 
            this.#numItems = 0 
        } else {
           prevNode = this.#head; 
           newHead = prevNode.getNext();

           prevNode.setNext(null); 
           newHead.setPrev(null); 

           this.setHead(newHead); 
           this.setCurr(newHead); 
           this.#numItems -= 1; 
        }

        return node; 
    }
}