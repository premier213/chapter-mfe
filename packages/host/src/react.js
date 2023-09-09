import { h } from 'vue'

import React from 'react'
import ReactDOM from 'react-dom/client'

/**
 * Defines a Vue.js component that wraps a react component.
 * This enables writing parts of a system in React where a Vue.js host is present
 *
 * Please be aware that since the `setup()` function (from Composition API) has been used
 * to implement mounting and unmounting of React component it is unavailable for use
 * outside of the scope of this component. You can use anything else from the object definition
 * besides it and the `render()` method.
 *
 * @param {import('react').Component} component component to render
 * @param {import('vue').ComponentOptions} options other options for the wrapper, such as props passed on to the react component
 * @returns {import('vue').ComponentOptions} Vue.js component definition wrapping a React component
 */
export function defineReactComponent({ component, ...options }) {
  return {
    ...options,
    setup(props) {
      let app = null

      // by returning the result of call to `h()` setup acts as the `render()` method
      return () => h('div', {
        onVnodeMounted({ el }) {
          app = ReactDOM.createRoot(el)
          app.render(React.createElement(component, props))
        },
        onVnodeBeforeUnmount() {
          app.unmount()
          app = null
        }
      })
    }
  }
}
