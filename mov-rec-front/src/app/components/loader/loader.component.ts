import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  constructor(public service: LoaderService) {}

  ngOnInit(): void {}
}
