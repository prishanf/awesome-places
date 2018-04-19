import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location.model';
import { Geolocation } from '@ionic-native/geolocation';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  location: Location = {
    lat: 51.678418,
    lng: 7.809007
  }
  locationIsSet = false;
  imageUrl ='';
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private modalCtrl:ModalController,
  private geolocation: Geolocation,
  private loadingCtrl: LoadingController,
  private toastCtrl:ToastController,
  private camera: Camera,
  public domSanitizer: DomSanitizer ) {
  }

 onSubmit(form:NgForm){
   console.log(form);
   
 }

 onLocate(){
  const loader = this.loadingCtrl.create({
    content:'Getting your Location...'
  });
  loader.present();
  this.geolocation.getCurrentPosition().then((resp) => {
    if(resp){
      this.location.lat = resp.coords.latitude;
      this.location.lng = resp.coords.longitude;
      this.locationIsSet = true;
      console.log('My Location', this.location);
      //this.onOpenMap();
      loader.dismiss();
    }
    // resp.coords.latitude
    // resp.coords.longitude
   }).catch((error) => {
    loader.dismiss();
     console.log('Error getting location', error);
     this.toastCtrl.create({
       message:'Error getting location',
       duration: 2500
     }).present();
     
   });
 }

 onOpenMap(){
    const modal = this.modalCtrl.create(SetLocationPage,{ location : this.location,isSet:this.locationIsSet});
    console.log(modal);
    modal.present();
    modal.onDidDismiss(data=>{
      console.log("locaiton from modal" , data);
      if(data){
        this.locationIsSet = true;
        this.location = data.locaiotn;
      }
      console.log(this.location);
      
    });
 }

 onOpenCamera(){
  
  const options: CameraOptions = {
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        sourceType: this.camera.PictureSourceType.CAMERA,
        
  }
  
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.imageUrl = 'data:image/jpeg;base64,' + imageData;
      console.log(this.imageUrl);
      //this.imageUrl = imageData;
      
    }, (err) => {
      console.log(err);
    });
  }

}
