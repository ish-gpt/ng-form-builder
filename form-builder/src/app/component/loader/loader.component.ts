import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { LoaderService } from 'src/template/service/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule]
})
export class LoaderComponent implements OnInit {
  loading!: boolean;
  subs: Subscription = new Subscription();;
  constructor(private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.subs.add(
      this.loaderService.isloading$.subscribe((value) => {
        this.loading = value;
      })
    )

  }
}
