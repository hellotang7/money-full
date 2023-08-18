import s from './welcome.module.scss';


export const Four =  () =>  (
    <div class={s.card}>
        <svg>
            <use xlinkHref='#cloud'></use>
        </svg>
        <h2>云备份<br />再也不怕数据丢失</h2>
        <p>云备份功能，助您"分"毫不失</p>
    </div>
)
 Four.displayName = 'Four'
