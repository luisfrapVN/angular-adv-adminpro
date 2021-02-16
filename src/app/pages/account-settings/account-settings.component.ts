import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [],
})
export class AccountSettingsComponent implements OnInit {
  //Al ser un selector necesitamos saltar al DOM la menor cantidad de veces posibles, mejor hacerlo aqui solo una vez

  constructor(private settingService: SettingsService) {}

  ngOnInit(): void {
    this.settingService.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    this.settingService.changeTheme(theme);
  }


}
