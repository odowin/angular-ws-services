import { Injectable } from '@angular/core';
import { Article } from './article';

@Injectable({
  providedIn: 'root',
})

export class ArticleService {
  constructor() {}

  // Create and save article
  createArticle(article: Article) {
    const articles = this.getFromLocalStorage();
    articles.push(article);
    localStorage.setItem('articles', JSON.stringify(articles));
  }

  // Get articles from localStorage
  getFromLocalStorage(): Article[] {
    const stringData = localStorage.getItem('articles');
    const articles: Article[] = JSON.parse(stringData || '[]');
    return articles;
  }

  // Delete an article and store it in deleted articles
  deleteArticle(article: Article): void {
    const articles = this.getFromLocalStorage();
    const index = articles.findIndex((x) => x.id === article.id);
    if (index !== -1) {
      // Store the deleted article in a separate list
      this.storeDeletedArticle(articles.splice(index, 1)[0]);
      localStorage.setItem('articles', JSON.stringify(articles));
    }
  }

  // Store deleted article in a separate list
  storeDeletedArticle(article: Article) {
    const deletedArticles = this.getDeletedArticlesFromStorage();
    deletedArticles.push(article);
    localStorage.setItem('deletedArticles', JSON.stringify(deletedArticles));
  }

  // Get the list of deleted articles from localStorage
  getDeletedArticlesFromStorage(): Article[] {
    const stringData = localStorage.getItem('deletedArticles');
    const deletedArticles: Article[] = JSON.parse(stringData || '[]');
    return deletedArticles;
  }

  // Restore a deleted article
  restoreArticle(article: Article): void {
    const deletedArticles = this.getDeletedArticlesFromStorage();
    const index = deletedArticles.findIndex((x) => x.id === article.id);
    if (index !== -1) {
      // Remove the article from the deleted list and add it back to the active list
      const restoredArticle = deletedArticles.splice(index, 1)[0];
      localStorage.setItem('deletedArticles', JSON.stringify(deletedArticles));

      const articles = this.getFromLocalStorage();
      articles.push(restoredArticle);
      localStorage.setItem('articles', JSON.stringify(articles));
    }
  }
}
