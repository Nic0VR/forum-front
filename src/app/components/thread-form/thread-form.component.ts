import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Thread } from 'src/app/models/thread';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-thread-form',
  templateUrl: './thread-form.component.html',
  styleUrls: ['./thread-form.component.css'],
})
export class ThreadFormComponent implements OnInit {
  constructor(private threadService: ThreadService) {}

  @Input()
  boardId!: number;
  @Output()
  threadEmitter: EventEmitter<Thread> = new EventEmitter<Thread>();
  files: File[] = [];
  
  threadFormGroup: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  submitThread() {
    if (this.threadFormGroup.valid) {
      let title = this.threadFormGroup.get('title')?.value;
      let text = this.threadFormGroup.get('text')?.value;
      let thread: Thread = { title: title, text: text, boardId: this.boardId };


      let formdata: FormData = new FormData();
      
      formdata.append('thread', new Blob( [JSON.stringify(thread)], {type:"application/json"}));
      for(let file of this.files){
        formdata.append("files",file as Blob);
      }
      this.threadService.saveWithImage(formdata).subscribe({
        next: (v) => {
          this.threadEmitter.emit(v);
        },
        error: (e) => {},
      });
    }
  }

  handleFileInput(event: Event, index: number) {
    const element = event.target as HTMLInputElement;
    let file: FileList | null = element.files;
    if (file?.item(0)) {
      this.files.splice(index, 1, file.item(0)!);
    }
  }
}
