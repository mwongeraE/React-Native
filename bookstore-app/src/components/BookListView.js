import React, { Component } from 'react'
import { observer } from 'mobx-react'
import BookStore from '../stores/book'
import BookList from './BookList'

@observer 
class BookListView extends Component {
    async componentWillMount() {
        this.store = BookStore()
        await this.store.loadBooks()
    }

    render() {
        return <BookList books={this.store.books} />
    }
}