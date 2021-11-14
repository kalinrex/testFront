import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent implements OnDestroy{
  public parent: any;
  public title: any;
  public titleSubs: Subscription;

  constructor(private router: Router) {
    this.titleSubs = this.getParams().subscribe(({ parent, title }) => {
      this.parent = parent;
      this.title = title;
      document.title = title;
    });
  }
  ngOnDestroy(): void {
    this.titleSubs.unsubscribe();
  }

  getParams() {
    return this.router.events.pipe(
      filter((event: any) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
