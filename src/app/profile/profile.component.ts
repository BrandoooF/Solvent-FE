import { Component, OnInit } from '@angular/core';
import { DataserviceService } from '../dataservice.service'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user;
  profile;
  editForm: FormGroup
  editProfileForm: FormGroup
  newProfileData = {
    username: '',
    phone : '',
    location: '',
    occupation: '',
  }

  constructor(private dataservice: DataserviceService, private fb: FormBuilder, private authservice: AuthService) { }

  ngOnInit() {
    this.getUser()
    this.getProfile()
    
  }

  getUser(){
    this.dataservice.getUser().subscribe( user =>{
      this.user = user;
      //create form only once user data is retrieved (in order to populate defaults in fields)
      this.createForm()
      console.log(user)
    })
  }

  getProfile(){
    this.dataservice.getProfile().subscribe( profile =>{
      this.profile = profile;
      this.createProfileForm()
      console.log(profile)
      console.log('hello')

      
    })
  }

  createForm(){
    this.editForm = this.fb.group({
      username: [this.user.username , Validators.required],
      first : [this.user.first_name, Validators.required],
      last: [this.user.last_name, Validators.required],
      email: [this.user.email, Validators.required]
    })
  }

  createProfileForm(){
    this.editProfileForm = this.fb.group({
      phone: [this.profile.phone , Validators.required],
      occupation : [this.profile.occupation, Validators.required],
      location: [this.profile.location, Validators.required],
      profile_img: [this.profile.profile_img, Validators.required]
    })
  }

  updateProfile(){
    this.newProfileData.username = this.editForm.get('username').value
    this.newProfileData.phone = this.editProfileForm.get('phone').value
    this.newProfileData.location = this.editProfileForm.get('location').value
    this.newProfileData.occupation = this.editProfileForm.get('occupation').value

    this.authservice.updateProfile(this.newProfileData).subscribe(res => console.log(res))
  }


}
