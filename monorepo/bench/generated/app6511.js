  import { h, Component, render } from './preact.js?n=6511';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6511!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  