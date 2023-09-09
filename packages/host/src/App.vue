<template>
  <div>
    <h1>microfrontend react inside vue with MFE</h1>

     <h1> {{ counter }}</h1>
      <HelloWorld :count="counter" @click="testme" />

  </div>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue'
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
  setup() {
    const showUI = ref(false);
    const counter = ref(5);

    const testme = async () => {
      counter.value++
    }

    return {
      showUI,
      counter,
      testme
    }
  }
}
</script>

<style>
.h1 {
  color: red;
}
</style>
