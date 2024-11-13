import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from '../common/article';
import { ArticleService } from '../common/article.service';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css'],  // Corrected typo here
})
export class ArticlesListComponent {
  // Model of an article and initialization
  article: Article = {
    id: '',
    name: '',
    price: '',
    contact: '',
    stock: '',
  };

  // List of available articles
  articles: Article[] = [];

  // Injecting the article service
  private articleService = inject(ArticleService);

  ngOnInit() {
    // Fetching articles from the service
    this.articles = this.articleService.getFromLocalStorage();
  }

  // Creating a new article and adding it to the list
  createArticle(article: Article) {
    // Using ArticleService to create and save article
    this.articleService.createArticle(article);
    
    // Fetch the updated list of articles
    this.articles = this.articleService.getFromLocalStorage();

    // Resetting the article model
    this.article = {
      id: '',
      name: '',
      price: '',
      contact: '',
      stock: '',
    };
  }

  // Deleting an article
  deleteArticle(article: Article) {
    // Using ArticleService to delete the article
    this.articleService.deleteArticle(article);

    // Fetch the updated list of articles
    this.articles = this.articleService.getFromLocalStorage();
  }
}
