import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WorkoutService} from '../../service';
import {Location} from '@angular/common';
import {Workout} from '../workout';

@Component({
  selector: 'app-workout-details',
  templateUrl: './workout-details.component.html',
  styleUrls: ['./workout-details.component.css']
})
export class WorkoutDetailsComponent implements OnInit {

  @Input() workout: Workout;

  constructor(private route: ActivatedRoute,
              private workoutService: WorkoutService,
              private location: Location) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.workoutService.getWorkout(id)
      .subscribe(workout => this.workout = workout);
  }

  goBack() {
    this.location.back();
  }

  save() {

  }

}
