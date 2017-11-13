'use strict';
const {LinkedList} = require('./linkedlist');

class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    //this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    return this._slots[index].value;
  }

  set(key, value) {
    // const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    // if (loadRatio > HashMap.MAX_LOAD_RATIO) {
    //   this._resize(this._capacity * HashMap.SIZE_RATIO);
    // }

    const index = this._findSlot(key);
    
    if(!this._slots[index]) {
      this._slots[index] = new LinkedList();
      this.length++; 
      this._slots[index].insert(0, {key,
        value}
      // deleted: false}
      );
    } else {
      for (let current = this._slots[index].head; current; current = current.next){
      
        if(current.value.key === key){
          current.value.value = value;
          return;
        }
        
      }
      this._slots[index].insert(0, {key,
        value});
    }
    
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    //slot.deleted = true;
    this.length--;
    //this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    // for (let i=start; i<start + this._capacity; i++) {
    return start % this._capacity;
    //if(this._slots[index]){
    // const list = new LinkedList();
    // list.push
    //  this._slots[index].next = key;
    // }
    // const slot = this._slots[index];
    // if (slot === undefined || (slot.key === key && !slot.deleted)) {
    //   return index;
    // }
    // }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    // this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

const myHashMap = new HashMap();

myHashMap.set('Hobbit', 'Bilbo');
myHashMap.set('Wizard', 'Gandolf');
myHashMap.set('Hobbit', 'Frodo');
myHashMap.set('Human', 'Aragon');
myHashMap.set('Elf', 'Legolas');
//console.log(myHashMap._slots);
myHashMap.set('Maiar', 'The Necromancer');
myHashMap.set('RingBearer', 'Gollum');
myHashMap.set('LadyOfLight', 'Galadriel');
myHashMap.set('HalfElven', 'Arwen');
myHashMap.set('Ent', 'Treebeard');
myHashMap.set('Maiar', 'Sauron');
function PrintList(listIn){ 
  ////if (listIn.head !== undefined){
  let current = listIn.head;
  if(!current) { return 0; }
  while(current.next !== null)
  { console.log(current.value); 
    console.log(current);
    current = current.next;
  }
  console.log(current.value);
  console.log(current);
}
//}
for (let i = 0; i < 8; i++){
  if (myHashMap._slots[i]){
    console.log('---------------');
    PrintList(myHashMap._slots[i]);
  }
  
}


exports.HashMap = HashMap;