import { Injectable } from '@angular/core';
import { Article } from './article';

@Injectable({
  providedIn: 'root',
})

export class ArticleService {
  constructor() {}

  createArticle(article: Article) {
    // Ajout de l'article à la liste des articles
    const articles = this.getFromLocalStorage();
    articles.push(article);
    localStorage.setItem('articles', JSON.stringify(articles));
  }

  getFromLocalStorage(): Article[] {
    // Récupération des articles en format 'string'
    const stringData = localStorage.getItem('articles');
    // Conversion des données de type 'string' en objet Json
    const articles: Article[] = JSON.parse(stringData || '[]');

    return articles;
  }
}