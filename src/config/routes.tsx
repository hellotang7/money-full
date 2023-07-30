import {Welcome} from '../views/Welcome';
import {One} from '../components/welcome/One';
import {Two} from '../components/welcome/Two';
import {Three} from '../components/welcome/Three';
import {Four} from '../components/welcome/Four';
import {FourActions} from '../components/welcome/FourActions';
import {OneActions} from '../components/welcome/OneActions';
import {ThreeActions} from '../components/welcome/ThreeActions';
import {TwoActions} from '../components/welcome/TwoActions';
import { StartPage } from '../views/StartPage';


export const routes = [
    {path: '/', redirect: '/welcome'},
    { path: '/start', component: StartPage },

    {
        path: '/welcome',
        component: Welcome,
        children: [
            {path: '', redirect: '/welcome/1'},
            {path: '1', name: 'Welcome1', components: {main: One, footer: OneActions},},
            {path: '2', name: 'Welcome2', components: {main: Two, footer: TwoActions},},
            {path: '3', name: 'Welcome3', components: {main: Three, footer: ThreeActions},},
            {path: '4', name: 'Welcome4', components: {main: Four, footer: FourActions},},
        ]
    },
    

];




