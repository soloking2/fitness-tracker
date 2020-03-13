import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training-dialog.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter<void>();
  progress = 0;
  timer: number;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
         clearInterval(this.timer); }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogResult = this.dialog.open(StopTrainingComponent, {data:
    {
      progress: this.progress
    }
    });

    dialogResult.afterClosed().subscribe(
      result => {
        if (result) {
          this.trainingExit.emit();
        } else {
          this.startOrResumeTimer();
        }
      }
    );
  }

}
