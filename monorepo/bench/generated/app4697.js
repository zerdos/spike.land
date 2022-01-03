  import { h, Component, render } from './preact.js?n=4697';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4697!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  