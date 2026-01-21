import { Component, computed, effect, inject, signal } from '@angular/core';
import { BookSearchStore } from './store/book-search-store';
import { NgClass } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    NgClass
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [BookSearchStore]
})
export class App {
  protected readonly title = signal('AngularInterview');
  protected readonly store = inject(BookSearchStore);

  isLoading = signal<any>('false');

  booksIsLoading = computed(() => this.isLoading() ?? 'false');

  constructor() {
    effect(() => {
      const isLoading = this.store.isLoading();
      console.log(isLoading);
      if (isLoading) {
        this.isLoading.set('true');
      } else {
        this.isLoading.set('false');
      }
    });

    effect(() => {
      this.booksCount.set(this.store.booksCount().toString());
    });

    of(this.store.sortedBooks()).subscribe((books) => {
      setTimeout(() => {
        this.books = books;
      })
    })
  }

  booksCount = signal<any>('0');

  protected fetchBooks(): void {
    this.store.loadByQuery('');
  }

  books: any;
}
