  import { h, Component, render } from './preact.js?n=9158';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9158!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  