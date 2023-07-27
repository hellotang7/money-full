import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import s from './Welcome.module.scss'
import logo from '../assets/icon/logo.svg'

export const Welcome = defineComponent({
  setup:(props,context) => {
     return () => <div class={s.wrapper}>
<header>
  <img src={logo} />
  <h1>点滴记账</h1>
</header>
<main><div><RouterView/></div></main>
       


    </div>
  }
 })