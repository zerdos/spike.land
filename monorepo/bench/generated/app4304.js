  import { h, Component, render } from './preact.js?n=4304';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4304!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  