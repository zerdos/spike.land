  import { h, Component, render } from './preact.js?n=6696';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6696!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  