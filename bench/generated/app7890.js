  import { h, Component, render } from './preact.js?n=7890';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7890!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  