  import { h, Component, render } from './preact.js?n=9671';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9671!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  