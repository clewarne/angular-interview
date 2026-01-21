import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private mockBooks: Book[] = [
    { id: 1, title: 'The Great Gatsby' },
    { id: 2, title: 'To Kill a Mockingbird' },
    { id: 3, title: '1984' },
    { id: 4, title: 'Pride and Prejudice' },
    { id: 5, title: 'The Catcher in the Rye' },
    { id: 6, title: 'Animal Farm' },
    { id: 7, title: 'Lord of the Flies' },
    { id: 8, title: 'Brave New World' },
  ];

  getByQuery(query: string): Observable<Book[]> {
    const filteredBooks = this.mockBooks.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );

    return of(filteredBooks).pipe(delay(500));
  }
}
