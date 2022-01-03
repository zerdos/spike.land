  import { h, Component, render } from './preact.js?n=4006';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4006!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  