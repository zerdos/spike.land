import * as React from 'preact'
import {render, hydrate, Component} from "preact";
import { FC } from "preact/compat";

export const createRoot= (container: Element)=>({
    render: (App: FC)=>render(App, container)
})
export const  hydrateRoot = (container: Element, App: FC)=>hydrate(App,container)

export default {
    createRoot, hydrateRoot
};
