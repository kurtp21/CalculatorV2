/* 
The LIFO based doubly linked list, that will be used as the 
container of the math expressions that have been inputed by 
the user. 
*/

export class Container {
    constructor(exp, ans) {
        this.head = null; 
        this.expresion = exp;
        this.answer = ans;
        this.next = null;
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

    getHead(data) {
        return this.head;
    }

    getNext(next) {
        return this.next;
    }

    getPrev(prev) {
        return this.prev; 
    }

    goToFront() {
        
    }
}