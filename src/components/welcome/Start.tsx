import s from './welcome.module.scss';
import {RouterLink} from 'vue-router';
import {SkipFeatures} from '../../shared/Button';

const onClick = () => {

    localStorage.setItem("skipFeatures", "yes");
};
export const Start =  () =>  (
    <>
    <div class={s.card}>
        <svg>
            <use xlinkHref='#record'></use>
        </svg>
        <h2>聚沙成塔,集腋成裘, 集金成富</h2>
        <p>—— 集金记账</p>
    </div>
<div class={s.actions}>

      <span onClick={onClick} class={s.button}>
          <RouterLink to="/items">开始记账</RouterLink>
      </span>
    <SkipFeatures class={s.fake}/>

</div>
    </>
)
Start.displayName = 'Start'
