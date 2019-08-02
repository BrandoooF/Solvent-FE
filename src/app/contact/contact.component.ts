import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
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
      email: [this.user.email, Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
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

  sendContactRequest(){
   let content = {
      first_name : this.editForm.get('first').value,
      last_name : this.editForm.get('last').value,
      email : this.editForm.get('email').value,
      subject : this.editForm.get('subject').value,
      message : this.editForm.get('message').value,
    }

    this.dataservice.sendContactRequest(content).subscribe(
      res => console.log(res),
      err => console.log(err)
    )

    console.log('hello')
  }


}
