import {Component, Input, OnInit} from '@angular/core';
import {Exercise} from '../exercise';
import {ActivatedRoute} from '@angular/router';
import {ExerciseService} from '../../service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.css']
})
export class ExerciseDetailsComponent implements OnInit {

  @Input() exercise: Exercise;

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private location: Location
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.exerciseService.getExercise(id)
      .subscribe(exercise => this.exercise = exercise);
  }

  goBack() {
    this.location.back();
  }

  save() {

  }

}
