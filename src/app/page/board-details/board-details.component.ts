import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Board } from 'src/app/models/board';
import { Thread } from 'src/app/models/thread';
import { BoardService } from 'src/app/service/board.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { ThreadService } from 'src/app/service/thread.service';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.css'],
})
export class BoardDetailsComponent implements OnInit {
  constructor(
    private boardService: BoardService,
    private threadService: ThreadService,
    private route: ActivatedRoute,
    private router: Router,
    private localService: LocalStorageService
  ) {
    this.prefSubscription = localService.getPreferences().subscribe((p) => {
      if (p && p.maxThreadFetch) {
        this.max = p.maxThreadFetch!;
      } else {
        //TODO : define default max fetch for pagination
        this.max = 10;
      }
      this.loadData();
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  board?: Board;
  threads: Thread[] = [];
  page: number = 1;
  max!: number;
  search: string = '';
  countThread?: number;
  prefSubscription: Subscription;

  loadData() {

    this.route.params.subscribe((params) => {
      this.boardService.findById(params['id']).subscribe({
        next: (v) => {
          this.board = v;
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          this.countThreads(this.board!.id);
          this.loadThreads();
        },
      });
    });
  }

  loadThreads() {
    this.threadService.findPageByBoardId(this.board!.id, this.page).subscribe({
      next: (v) => {
        this.threads = v;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  countThreads(boardId: number) {
    this.threadService.countByBoardId(boardId).subscribe({
      next: (v) => {
        this.countThread = v.count;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  changePage(page: number) {
    this.page = page;
    this.loadThreads();
  }

  addThread(thread: Thread) {
    // this.threads.push(thread);
    this.router.navigateByUrl('/thread/' + thread.id);
  }

  ngOnDestroy() {
    this.prefSubscription.unsubscribe();
  }
}
