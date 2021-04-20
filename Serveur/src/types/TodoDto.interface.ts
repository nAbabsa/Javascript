export default interface TodoDTO
 {
    _id: string;
    name: string;
    state: 'DONE' | 'PENDING';
  }