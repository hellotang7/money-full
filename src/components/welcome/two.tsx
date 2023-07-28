import s from './welcome.module.scss';
import clock from '../../assets/icons/clock.svg';


export const Two =  () => {
    return <div class={s.card}>
        <svg>
            <use xlinkHref='#clock'></use>
        </svg>
        <h2>每日提醒<br />不遗漏每一笔账单</h2>
    </div>
}
Two.displayName = 'Two'
