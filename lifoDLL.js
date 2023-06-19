/* 
The LIFO based doubly linked list, that will be used as the 
container of the math expressions that have been inputed by 
the user. 
*/
export class Container {
    #head;
    #curr;
    #tail; 

    constructor(data) {
        this.#head = null;
        this.#curr = null;
        this.#tail = null; 
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
}