import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController } from "@ionic/angular";
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
import { API_CONFIG } from "src/config/api.config";
import { UserDTO } from "src/models/user.dto";
import { UserService } from "src/services/user.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  formGroup: FormGroup;

  constructor(
    public http: HttpClient,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public alertController: AlertController
  ) {
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

  async showInsertOK() {
    //public alertController: AlertController
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Criando novo usuário",
      message: "Usuário adicionado",
      backdropDismiss: false,
      buttons: [
        {
          text: "OK",
          handler: () => {
            console.log("Confirm Okay");
          },
        },
      ],
    });
    await alert.present();
  }

  signUpUser() {
    console.log("Send form data SignUp");
    console.log(this.formGroup.value);
    let userDto: UserDTO = {
      name: "",
      email: "",
      password: "",
    };
    console.log("userEmail: " + this.formGroup.controls["userEmail"].value);
    userDto.email = this.formGroup.controls["userEmail"].value;
    userDto.name = this.formGroup.controls["userName"].value;
    userDto.password = this.formGroup.controls["userPassword"].value; //TODO: Create another DTO
    // without JsonIgnore field

    console.log("userDto: " + JSON.stringify(userDto));

    this.userService.insert(userDto).subscribe((response) => {
      this.showInsertOK();
    });
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter");
    this.formGroup.controls.userPerfil.setValue("1");
  }

  updatePerfil() {
    console.log("Update Perfil.");
  }
}
