import s from './welcome.module.scss';


export const Three =  () => {
    return (
        <div class={s.card}>
            <svg>
                <use xlinkHref='#charts'></use>
            </svg>
            <h2>数据可视化<br />收支一目了然</h2>
            <p>数据可视化功能，助您"分"毫必究</p>
        </div>
    )
}
Three.displayName = 'Three'
