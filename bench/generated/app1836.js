  import { h, Component, render } from './preact.js?n=1836';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1836!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  