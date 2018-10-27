import {Component, Input, OnInit} from '@angular/core';
import {Workout} from '../../../../shared/models/workout';
import {UserService, WorkoutService} from '../../../../shared/service';
import {Exercise} from '../../../../shared/models/exercise';

const EXERCISES_DATA: Exercise[] = [
  {id: 1, exerciseName: 'deadlift', exerciseType: ['POWERLIFTING'], description: 'deadlift'},
  {id: 2, exerciseName: 'muscle-up', exerciseType: ['GYMNASTIC'], description: 'muscle-up'},
  {id: 3, exerciseName: 'row', exerciseType: ['MONOSTRUCTURIAL'], description: 'row'}
];

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss']
})
export class WorkoutsComponent implements OnInit {

  @Input() isDescription: boolean;

  workouts: Workout[];

  constructor(private userService: UserService,
              private workoutService: WorkoutService) {

    this.isDescription = false;

  }

  ngOnInit() {
    this.getAll();

    // MOCK
    // this.workouts = [
    //   {id: 100001, title: '1A', workoutname: 'EMOM', dateTimedescription: '12122018T010101',
    //     exercises: EXERCISES_DATA, workoutTypes: ['EMOM'], description: ''},
    //   {id: 100002, title: '1B', workoutname: 'AMRAP', dateTimedescription: '12122018T010101',
    //     exercises: EXERCISES_DATA, workoutTypes: ['AMRAP'], description: ''},
    //   {id: 100003, title: '1C', workoutname: 'AFAP', dateTimedescription: '12122018T010101',
    //     exercises: EXERCISES_DATA, workoutTypes: ['AFAP'], description: ''},
    //   {id: 100004, title: '2A', workoutname: 'FORTIME', dateTimedescription: '12122018T010101',
    //     exercises: EXERCISES_DATA, workoutTypes: ['FORTIME'], description: ''},
    //   // {id: 100005, title: '2B', workoutname: 'NOTFORTIME', dateTimedescription: '12122018T010101',
    //   //   exercises: ['SPLIT JERK', 'PUSH JERK'], workoutTypes: ['NOTFORTIME'], description: ''},
    // ];
    // this.initDescription();
  }

  add() {

  }

  initDescription() {
    for (let workout of this.workouts) {
      for (let exercise of workout.exercises) {
        workout.description += exercise.exerciseName + '\n';
      }
    }
  }

  getAll() {
    this.workoutService.getWorkouts()
      .subscribe(workouts => this.workouts = workouts);
    this.initDescription();
  }

}
