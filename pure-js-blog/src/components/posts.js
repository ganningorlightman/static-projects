import { Component } from '../core/component';
import { apiService } from '../services/api-service';
import { TransformService } from '../services/transform';
import { renderPost } from '../templates/post';

export class PostsComponent extends Component {
    constructor(id, { loader }) {
        super(id);
        this.loader = loader
    }

    init() {
        this.$el.addEventListener('click', buttonHandler.bind(this))
    }

    async onShow() {
        this.loader.show()
        const fbData = await apiService.fetchPost()
        const posts = TransformService.fbObjectToArray(fbData)
        const html = posts.map(post => renderPost(post, { withButton: true }))
        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', html.join(' '))
    }

    onHide() {
        this.$el.innerHTML = ''
        this.loader.hide()
    }
}

function buttonHandler(e) {
    const $el = e.target
    const id = $el.dataset.id
    const title = $el.dataset.title
    if (id) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []
        const candidate = favorites.find(p => p.id === id)
        if(candidate) {
            $el.textContent = 'Сохранить'
            $el.classList.add('button-primary')
            $el.classList.remove('button-danger')
            favorites = favorites.filter(p => p.id !== id)
        } else {
            $el.textContent = 'Удалить'
            $el.classList.add('button-danger')
            $el.classList.remove('button-primary')
            favorites.push({id, title})
        }
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }
}