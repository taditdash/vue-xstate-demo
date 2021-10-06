import { createMachine } from 'xstate';

export const promiseMachine = createMachine({
  id: 'promise',
  initial: 'pending',
  states: {
    pending: {
      on: {
        RESOLVE: { target: 'resolved' },
        REJECT: { target: 'rejected' }
      }
    },
    resolved: {
      // on: {
      //   RESET: { target: 'pending' }
      // }
      type: 'final'
    },
    rejected: {
      // on: {
      //   RESET: { target: 'pending' }
      // }
      type: 'final'
    }
  }
});