import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Article } from '../common/article';
import { ArticleService } from '../common/article.service';

@Component({
  selector: 'app-articles-list-deleted',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articles-list-deleted.component.html',
  styleUrls: ['./articles-list-deleted.component.css']
})
export class ArticlesListDeletedComponent {
  // Liste des articles supprimés
  articlesDeleted: Article[] = [];

  private articleService = inject(ArticleService);

  ngOnInit() {
    // Récupération des articles supprimés à partir du service
    this.articlesDeleted = this.articleService.getDeletedArticlesFromStorage();
  }

  /**
   * Restaure un article supprimé
   */
  restore(article: Article) {
    // Utilisation du service pour restaurer l'article
    this.articleService.restoreArticle(article);
    // Mise à jour de la liste des articles supprimés
    this.articlesDeleted = this.articleService.getDeletedArticlesFromStorage();
  }
}
