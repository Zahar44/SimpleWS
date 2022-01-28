import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutorizationService } from './autorization.service';

@Component({
  selector: 'app-autorization',
  templateUrl: './autorization.component.html',
  styleUrls: ['./autorization.component.css']
})
export class AutorizationComponent implements OnInit {
  title = 'Autorization';
  name: string = '';

  constructor(
    private readonly autorizationService: AutorizationService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  @Input() enter() {
    this.autorizationService.setUser({ name: this.name });
  }

  onKeydown(event: Event) {
    this.enter();
    this.router.navigate(['chat']);
  }
}
