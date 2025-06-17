import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchResult: undefined | product[];
  constructor(
    private activeRouter: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    let query = this.activeRouter.snapshot.paramMap.get('query');
    console.log('query', query);
    query &&
      this.productService.getSearchProductByName(query).subscribe((res) => {
        console.log('res', res);
        this.searchResult = res;
        // console.log('TG', this.activeRouter.snapshot.queryParams);
      });
  }
}
