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
  postFieldEditable: boolean = false;
  threadFieldEditable: boolean = false;
  form: FormControl = new FormControl({}, [Validators.pattern(/^[0-9]\d*$/)]);

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
        } else {
          this.maxThread = '';
          this.maxPost = '';
        }
      });
  }

  saveUserPref() {
    let maxP = parseInt(this.maxPost || '');
    let maxT = parseInt(this.maxThread || '');
    let userPref: Preference = {
      displayImages: true,
      maxPostFetch: maxP,
      maxThreadFetch: maxT,
    };
    this.localService.savePreferences(userPref);
    this.close();
  }
  togglePostField() {
    this.postFieldEditable = !this.postFieldEditable;
  }

  toggleThreadField() {
    this.threadFieldEditable = !this.threadFieldEditable;
  }

  ngOnDestroy() {
    this.prefSubscription.unsubscribe();

  }

  resetPref() {
    // console.log(this.localService.getPreferences());
    this.localService.deletePreferences();
  }
}
