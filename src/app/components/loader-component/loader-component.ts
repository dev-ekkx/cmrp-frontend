import {Component, input} from '@angular/core';
import {Skeleton} from 'primeng/skeleton';
import {TableModule} from 'primeng/table';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'cmrp-loader-component',
  imports: [
    Skeleton,
    TableModule,
    ProgressSpinner
  ],
  templateUrl: './loader-component.html',
  styleUrl: './loader-component.css'
})
export class LoaderComponent {
  public loaderType = input("spinner")
  protected readonly products = Array.from({length: 5}).map((_, i) => `Item #${i}`);
}
