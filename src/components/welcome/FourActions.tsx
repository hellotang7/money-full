import {SkipFeatures} from '../../shared/Button';
import s from './welcome.module.scss';
import {RouterLink} from 'vue-router';

export const FourActions = () => (
    <div class={s.actions}>

        <RouterLink to="/start" class={s.button}>下一页</RouterLink>
        <SkipFeatures/>

    </div>
);

FourActions.displayName = 'FourActions';
