  import { h, Component, render } from './preact.js?n=66';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 66!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  