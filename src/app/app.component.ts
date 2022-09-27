import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames = ['Chris', 'Anna'];


  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this), Validators.minLength(3)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(
    //   value => console.log(value)
    // );
    this.signupForm.statusChanges.subscribe(
      value => console.log(value)
    );
    this.signupForm.setValue({
      'userData': {
        'username': 'Oleh',
        'email': 'oleg_bob@ukr.net'
      },
      'gender': 'male',
      'hobbies': []
    });
    this.signupForm.patchValue({
      'userData': {
        'username': 'Igor',
      },
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset({
      'userData': {
        'username': '',
        'email': ''
      },
      'gender': 'male',
      'hobbies': []
    });
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }
}
