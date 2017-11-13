'use strict';
const {LinkedList} = require('./linkedlist');

class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    for (let current = this._slots[index].head; current; current = current.next){
      
      if(current.value.key === key){
        return current.value.value;
        
      }
    }
    throw new Error('Key error');
  }

  set(key, value) {

    const index = this._findSlot(key);
    
    if(!this._slots[index]) {
      this._slots[index] = new LinkedList();
      this.length++; 
      this._slots[index].insert(0, {key, value}
      );
    } 
    else {
      for (let current = this._slots[index].head; current; current = current.next){
        if(current.value.key === key){
          current.value.value = value;
          return;
        }
      }
      this._slots[index].insert(0, {key, value});
    }
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    this.length--;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    return start % this._capacity;
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    this.length = 0;
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
myHashMap.set('Maiar', 'The Necromancer');
myHashMap.set('RingBearer', 'Gollum');
myHashMap.set('LadyOfLight', 'Galadriel');
myHashMap.set('HalfElven', 'Arwen');
myHashMap.set('Ent', 'Treebeard');
myHashMap.set('Maiar', 'Sauron');

GetSelected(myHashMap);

function PrintList(listIn){ 
  let current = listIn.head;
  if(!current) { return 0; }
  while(current.next !== null)
  { console.log(current);
    console.log(' ');
    current = current.next;
  }
  console.log(current);
  console.log(' ');
}

function GetSelected(inHash) {
  for (let i = 0; i < 8; i++){
    if (inHash._slots[i]){
      console.log(' ');
      console.log('---------------');
      PrintList(myHashMap._slots[i]);
    }
  }
}


// ***** PALINDROME

function isPalindrome(str){
  let currentValue;
  let oddCt = 0;
  const newhash = new HashMap();

  for (let i = 0; i < str.length; i++){
    try {
      currentValue = newhash.get(str[i]);
    }
    catch(error) {
      currentValue = 0;
    }
    newhash.set(str[i], currentValue + 1);
  }

  for (let i = 0; i < 8; i++){
    if (newhash._slots[i]){
      for(let current = newhash._slots[i].head; current; current = current.next){
        if(current.value.value % 2 !== 0) {
          oddCt++;
          if(oddCt > 1) {
            return false;
          }
        }
      }
    }
  }
  return true;
}

//console.log(isPalindrome('madame'));


exports.HashMap = HashMap;