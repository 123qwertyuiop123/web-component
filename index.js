// 借助工具
import {LitElement, html ,css} from "lit";


class MyComponent extends LitElement{

    // 写属性
    static properties = {
        count:{},
    }
    // 写css css传递通过css变量
    static styles = css`
    div{
        width:100px;
        height:100px;
        background-color:var(--bgc);
    }
    `;
    constructor(){
        super()
        this.count = 0;
    }
    addCount(){
        this.count++;
    }

    // 渲染函数
    render(){
        return html`
        <div @click=${this.addCount}>
        ${this.count}
        <slot></slot>
        </div>
        `
    }
}
customElements.define('my-component', MyComponent)


// 原生写法
class MyDiv extends HTMLElement {
    constructor() {
        super()
        // 解除黑盒限制
        this.attachShadow({ mode: 'open' })
        // 添加元素
        this.shadowRoot.innerHTML = `
        <style>
            div{
                width:100px;
                height:100px;
                background-color:pink;
            }
        </style>
        <div>
            <slot></slot>
        </div>
        `
    }
}
// 注册标签
customElements.define('my-div', MyDiv)

class Counter extends HTMLElement {
    // 监听属性
    static get observedAttributes() {
        return ['count']
    }
    get count() {
        return this.getAttribute('count') ?? 0;
    }
    set count(value) {
        this.setAttribute('count', value);
    }
    // 生命周期函数 触发页面刷新
    attributeChangedCallback(attr, oldValue, newValue) {
        if (attr == 'count') {
            this.btn.textContent = newValue;
        }
    }
    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.innerHTML = `
        <style>
        .btn{
            width:100px;
            height:20px;
        }
        </style>
        <button class="btn">${this.count}</botton>
        `
        this.btn = this.shadowRoot.querySelector('button')
        // 不会触发页面的刷新
        this.btn.addEventListener('click', () => this.count++)
    }
}
customElements.define('my-counter', Counter)