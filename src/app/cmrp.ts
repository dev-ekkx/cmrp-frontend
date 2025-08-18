import {Component, inject, OnDestroy, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Toast} from 'primeng/toast';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './cmrp.html',
  styleUrl: './cmrp.css'
})
export class Cmrp implements OnDestroy {
  protected destroy$ = new Subject<void>();
  protected breakpointObserver = inject(BreakpointObserver);
  protected isSmallerScreen = signal(false)

  // isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');

  constructor() {
    this.breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(
        takeUntil(this.destroy$),
        map(res => res.matches),
      ).subscribe(res => {
      this.isSmallerScreen.set(res);
    })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
