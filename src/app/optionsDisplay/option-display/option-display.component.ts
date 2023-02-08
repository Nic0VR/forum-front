import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Preference } from 'src/app/models/preference';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-option-display',
  templateUrl: './option-display.component.html',
  styleUrls: ['./option-display.component.css'],
})
export class OptionDisplayComponent implements OnInit {
  constructor(private localService: LocalStorageService) {}

  maxThread?: string;
  maxPost?: string;
  loadFiles?:boolean;
  prefSubscription!: Subscription;

  ngOnInit(): void {
    this.loadUserPref();
  }

  close() {
    // console.log( this.closeOptionDisplayEvent.emit());

    dispatchEvent(new Event('closeOptionDisplayEvent', { bubbles: true }));
  }

  loadUserPref() {
    let userPref: Preference;
    // let userPref:Preference = JSON.parse(this.localService.getData("userPref")||"");
    this.prefSubscription = this.localService
      .getPreferences()
      .subscribe((v) => {
        if (v) {
          userPref = v;
          this.maxThread = userPref.maxThreadFetch?.toString();
          this.maxPost = userPref.maxPostFetch?.toString();
          this.loadFiles= userPref.displayImages;
        } else {
          this.maxThread = '';
          this.maxPost = '';
          this.loadFiles=true;
        }
      });
  }

  saveUserPref() {
    let maxP = parseInt(this.maxPost || '');
    let maxT = parseInt(this.maxThread || '');
    let displFiles = this.loadFiles||false;
    let userPref: Preference = {
      displayImages: displFiles,
      maxPostFetch: maxP,
      maxThreadFetch: maxT,
    };
    this.localService.savePreferences(userPref);
    this.close();
  }

  ngOnDestroy() {
    this.prefSubscription.unsubscribe();

  }

  resetPref() {
    // console.log(this.localService.getPreferences());
    this.localService.deletePreferences();
  }
}
