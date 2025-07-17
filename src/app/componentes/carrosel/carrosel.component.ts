import { Component, OnInit, OnDestroy } from '@angular/core';

interface CarouselItem {
  img: string;
  
}

@Component({
  selector: 'app-carrosel',
  templateUrl: './carrosel.component.html',
  styleUrls: ['./carrosel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {
  carouselArr: CarouselItem[] = [
    { img: 'mustang.png' },
    { img: 'ranger.png' },
    { img: 'territory.png'},
  ];
  
  currentIndex = 0;
  currentItem!: CarouselItem;
  interval: any;

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  startCarousel() {
    if (this.carouselArr.length > 0) {
      this.currentItem = this.carouselArr[0];
      this.interval = setInterval(() => this.next(), 2000);
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselArr.length;
    this.currentItem = this.carouselArr[this.currentIndex];
  }
}
