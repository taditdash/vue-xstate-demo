<template>
  <h1>Vue Demo App with XState</h1>
  <hr>
  <h2>Let's test a promise with it's states mentioned in a state machine</h2>
  <button @click="startPromiseTest()" style="margin-right: 20px;">Start Promise</button>
  <button @click="resetPromiseState()">Reset Promise Machine State</button>
  <p>Promise Machine State: {{ promiseState }}</p>
</template>

<script>
import { promiseMachine } from "./xstate/promiseMachine.js";
import { interpret } from "xstate";

export default {
  name: 'App',
  created() {
    this.promiseService.onTransition((state) => {
      this.currentPromiseMachineState = state;
      console.log(`Promise State ${state.value}`);
    });
  },
  data() {
    return {
      promiseService: interpret(promiseMachine),
      currentPromiseMachineState: promiseMachine.initialState
    };
  },
  methods: {
    startPromiseTest() {
      // Start the service
      this.promiseService.start();
      // => 'pending'
      this.promiseTest().then((res) => {
        console.log(res);
        this.promiseService.send({ type: 'RESOLVE' });
        // => 'resolved'
      }).catch((res) => {
        console.log(res);
        this.promiseService.send({ type: 'REJECT' });
        // => 'rejected'
      });
    },
    resetPromiseState() {
      this.promiseService.send({ type: 'RESET' });
    },
    promiseTest() {
      let promiseTestBoolean = false;
      return new Promise((resolve, reject) => {
        if (promiseTestBoolean) {
          setTimeout(function() {
            resolve("Promise resolved");
          }, 3000)
        } else {
          reject("Promise rejected");
        }
      })
    }
  },
  computed: {
    promiseState() {
      return this.currentPromiseMachineState.value;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
