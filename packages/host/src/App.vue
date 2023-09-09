<template>
  <div>
    <h1> microfrontend MFE react in vue</h1>
    <label>Show<input type="checkbox" v-model="showUI" /></label>
    <div v-if="showUI">

      <h1>vue: {{ counter  }} in vue</h1>
       <h1>react:</h1>
      <HelloWorld :count="counter" @click="testme" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import Loading from './components/Loading.vue'
import Error from './components/Error.vue'

import { defineReactComponent } from './react'

function defineFederatedReactComponent({
  loader = async () => ({ default: null }),
  component = 'default',
  ...options
} = {}) {
  return defineAsyncComponent({
    loader: async () => defineReactComponent({
      component: (await loader())[component],
      ...options
    }),
    loadingComponent: Loading,
    errorComponent: Error,
    timeout: 1000,
  })
}

const HelloWorld = defineFederatedReactComponent({
  loader: () => import('library1/HelloWorld'),
  props: {
    count: { type: Number, default: 'unknown' },
  },
  mounted() {
    console.log('in HelloWorld.mounted()')
  }
})

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      showUI: false,
      counter: 0
    }
  },
  methods: {
    async testme() {
      this.counter += 1
    }
  },
}
</script>

<style>
.h1 {
  color: red;
}
</style>
