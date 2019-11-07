import { types as t } from 'mobx-state-tree';

const Book = t.model('Book', {
  id: t.identifier(),
  title: t.string,
  pageCount: t.number,
  authors: t.array(t.string),
  image: t.string,
  genre: t.maybe(t.string),
  inStock: t.optional(t.boolean, true),
});

const BookStore = t
    .model('BookStore', {
        books: t.array(Book)
    })
    .actions(self => {
        function updateBooks(books) {
            books.forEach(book => {
                self.books.push){
                    id: book.id,
                    title: book.volumeInfo.title,
                    authors: book.volumeInfo.authors,
                    publisher: book.volumeInfo.publisher,
                    image: book.volumeInfo.imageLinks.smallThumbnail,
                }
            })
        }

        const loadBooks = process(function* loadBooks() {
            try {
                const books = yield api.fetchBooks()
                updateBooks(books)
            } catch (err) {
                console.error('Failed to load books', err)
            }
        })

        return {
            loadBooks,
        }
    })

let store = null

export default () => {
    if (store) return store

    store = BookStore.create({ books: {} })
    return store
}