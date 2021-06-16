import { HeaderComponent } from './components/header';
import { LoaderComponent } from './components/loader';
import { NavigationComponent } from './components/navigation';
import { PostsComponent } from './components/posts';
import { CreateComponent } from './components/create';
import { FavoriteComponent } from './components/favorite';

new HeaderComponent('header')
const loader = new LoaderComponent('loader')
const navigation = new NavigationComponent('navigation')
const posts = new PostsComponent('posts', { loader })
const create = new CreateComponent('create')
const favorite = new FavoriteComponent('favorite', { loader })

navigation.registerTabs([
    { name: 'posts', component: posts },
    { name: 'create', component: create },
    { name: 'favorite', component: favorite },
])