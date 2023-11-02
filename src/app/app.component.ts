import {Component, OnInit} from '@angular/core';

import {register} from 'swiper/element/bundle';
import {Swiper, SwiperOptions} from "swiper/types";

register();

interface HTMLSwiperElement extends HTMLElement {
  swiper?: Swiper,
  initialize: () => void,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  readonly swiperParams: SwiperOptions = {
    touchStartPreventDefault: false,
    preventClicks: false,
    preventClicksPropagation: false,

    effect: 'flip',
    cubeEffect: {
      shadow: false,
      slideShadows: true,
    },
    flipEffect: {
      limitRotation: true,
      slideShadows: false,
    },
    grabCursor: true,
    pagination: false,
    navigation: false,
    enabled: false,
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

  onToggle(details: HTMLDetailsElement, swiperElement: HTMLSwiperElement) {
    const {swiper} = swiperElement;
    if (details.open) {
      swiper?.enable();
      return;
    }
    swiperElement.swiper?.slideTo(0);
    swiper?.disable();
  }

  toggleOrFlip($event: Event, details: HTMLDetailsElement, swiperElement: HTMLSwiperElement): boolean {
    const targetEl = $event.target as HTMLElement;
    console.log(details.open, targetEl.tagName);
    if (details.open && targetEl.tagName.toLowerCase() !== 'summary') {
      $event.preventDefault();
      swiperElement.swiper?.slideTo(1);
      return false;
    }
    return true;
  }

  enableSwiper(swiperElement: HTMLSwiperElement): void {
    swiperElement.swiper?.enable();
    swiperElement.classList.add('swiper-enabled');
  }
}
