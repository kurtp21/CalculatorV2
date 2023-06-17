/* 
The LIFO based doubly linked list, that will be used as the 
container of the math expressions that have been inputed by 
the user. 
*/
export class Container {
    constructor(data) {
        this.head = null; 
        this.curr = null; 

        this.next = null;
        this.node = data; 
        this.prev = null; 
    }

    setHead(data) {
        this.head = data; 
    }

    setNext(next) {
        this.next = next;
    }

    setPrev(prev) {
        this.prev = prev; 
    }

    getHead() {
        return this.head;
    }

    getNext() {
        return this.next;
    }

    getPrev() {
        return this.prev; 
    }

    isFront() {
        if (this.curr === this.head) {
            return true; 
        } else {
            return false; 
        }
    }

    goToFront() {
        if (!(this.isFront())) {
            this.curr = this.head; 
        } else {
            alert("Already at the front of the list!"); 
        }
    }

    moveForward() {
        if ()
    }
}