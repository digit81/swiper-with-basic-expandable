import {Component, OnInit} from '@angular/core';

import {register} from 'swiper/element/bundle';
import {Swiper, SwiperOptions} from "swiper/types";
register();

interface HTMLSwiperElement extends HTMLElement {
  swiper: Swiper,
  initialize: () => void,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  readonly swiperParams: SwiperOptions = {
    effect: 'flip',
    cubeEffect: {
      shadow: false,
      slideShadows: true,
    },
    flipEffect: {
      limitRotation: true,
      slideShadows: true,
    },
    grabCursor: true,
    pagination: true,
    navigation: true,
    enabled: true,
    on: {
      beforeTransitionStart: () => window.getSelection()?.removeAllRanges(),
      init() {
        console.log('INITIALIZED');
      },
    },
  };


  ngOnInit() {
    this.initMultipleSwiper()
  }

  private initMultipleSwiper(): void {
    const swiperElements = document.querySelectorAll<HTMLSwiperElement>('swiper-container');
    swiperElements.forEach(el => this.initSwiper(el));
  }

  private initSwiper(swiperEl: HTMLSwiperElement): void {
    Object.assign(swiperEl, this.swiperParams);
    swiperEl.initialize();
  }

}
