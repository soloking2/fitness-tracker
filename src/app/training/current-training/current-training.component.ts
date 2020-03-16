import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training-dialog.component';
import { TrainingService } from '../exercises.service';
import * as fromTraining from '../state/training.reducer';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer: number;

  constructor(private dialog: MatDialog,
              private trainingService: TrainingService,
              private store: Store<fromTraining.State>) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store.select(fromTraining.getActiveExercise).pipe(take(1)).subscribe(
      ex => {
      const step = ex.duration / 100 * 1000;
      this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer); }
    }, step);
  });
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
          this.trainingService.cancelExercise(this.progress);
        } else {
          this.startOrResumeTimer();
        }
      }
    );
  }

}
