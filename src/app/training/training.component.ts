import { Component, OnInit } from '@angular/core';
import { TrainingService } from './exercises.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  trainingSub: Subscription;
  ongoing = false;
  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.trainingSub = this.trainingService.exerciseChanged.subscribe(
      exercise =>
      exercise ? this.ongoing = true : this.ongoing = false
    );
  }

}
