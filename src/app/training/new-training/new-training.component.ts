import { Component, OnInit} from '@angular/core';
import { TrainingService } from '../exercises.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.getTraining();
  }

  getTraining() {
    this.exercises = this.trainingService.getExercises();
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.exercise);
  }

}
