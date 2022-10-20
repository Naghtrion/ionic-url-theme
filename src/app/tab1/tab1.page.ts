import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(private route: ActivatedRoute) {
    const root: HTMLElement = document.querySelector(':root');

    const setThemeVariables = (vars: { [key: string]: string }) =>
      Object.entries(vars).forEach((v) => root.style.setProperty(v[0], v[1]));

    const encodedTheme = this.route.snapshot.queryParamMap.get('theme');

    if (encodedTheme) {
      const theme = JSON.parse(window.atob(encodedTheme));

      let reMap: any = {};

      Object.entries(theme.colors).forEach(([variable, value]) => {
        reMap = {
          ...reMap,
          [`--ion-color-${variable}`]: value[0],
          [`--ion-color-${variable}-rgb`]: value[1],
          [`--ion-color-${variable}-contrast`]: value[2],
          [`--ion-color-${variable}-contrast-rgb`]: value[3],
          [`--ion-color-${variable}-shade`]: value[4],
          [`--ion-color-${variable}-tint`]: value[5],
        };
      });

      setThemeVariables(reMap);
    }
  }
}
