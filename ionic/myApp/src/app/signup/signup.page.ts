import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  formGroup: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      userName: [
        "maria",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(120),
        ],
      ],
      userEmail: ["maria@gmail.com", [Validators.required, Validators.email]],
      userPassword: ["maria", Validators.required],
      userPerfil: ["", []],
    });
  }

  ngOnInit() {}

  signUpUser() {
    console.log("Send form data SignUp");
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter");
    this.formGroup.controls.userPerfil.setValue("1");
  }

  updatePerfil() {
    console.log("Update Perfil.");
  }
}
