  import { h, Component, render } from './preact.js?n=8732';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8732!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  