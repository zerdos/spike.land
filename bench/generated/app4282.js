  import { h, Component, render } from './preact.js?n=4282';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4282!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  