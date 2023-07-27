import { defineComponent } from 'vue';
import s from './One.module.scss';
import pig from '../../assets/icon/pig.svg';

export const One = defineComponent({
  setup:(props,context) => {
     return () => (
       <div class={s.wrapper}>
        <div class={s.card}>
          <img class={s.pig} src={pig}/>
          <h2>会挣钱<br />还要会省钱</h2>
        </div>
        <div class={s.actions}>
          <router-lick class={s.fake} to="/start">跳过</router-lick>
          <router-lick to="/welcome/2">下一页</router-lick>
          <router-lick class={s.next} to="/start">跳过</router-lick>

        </div>
      </div>
    )
  }
 })