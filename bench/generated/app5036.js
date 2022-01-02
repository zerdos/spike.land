  import { h, Component, render } from './preact.js?n=5036';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5036!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  