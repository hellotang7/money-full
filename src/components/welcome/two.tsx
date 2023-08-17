import s from './welcome.module.scss';
import clock from '../../assets/icons/clock.svg';


export const Two =  () => {
    return <div class={s.card}>
        <svg>
            <use xlinkHref='#notify'></use>
        </svg>
        <h2>每日提醒<br />不会遗漏每一笔账单</h2>
        <p>每日提醒功能，助您每"分"必争</p>
    </div>
}
Two.displayName = 'Two'
