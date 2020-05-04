import React, { Component } from 'react'
import axios from 'axios'
import Main from '../templates/main'

import './props.css'

const headerProps = {
    icon: 'instagram',
    title: 'Posts',
    subtitle: 'Listagem de posts instagram'
}

const baseUrl = 'http://localhost:3001/user'
const initialState = {
    user: { url: ''},
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })
        window.location.reload()
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>URL do post</label>
                            <input type="text" className="form-control"
                                name="url"
                                value={this.state.user.url}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite a url..." />
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <div className="container-post">
                <p>Postagens</p>
                <br/><br/>
                <div className="posts">
                    {this.renderRows()}
                </div>
            </div>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <div className="bts">
                    <blockquote class="instagram-media"
                        id="frame" 
                        data-instgrm-captioned 
                        data-instgrm-permalink={user.url}
                        data-instgrm-version="10">
                    </blockquote>
                    

                    <script async src="//www.instagram.com/embed.js"></script>
                    <div >
                        <button className="btn btn-info"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
            )
        })
    }
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
                
            </Main>
        )
    }
}