import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { SetLocationPage } from '../set-location/set-location';
import { Location } from '../../models/location.model';
import { Geolocation } from '@ionic-native/geolocation';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private modalCtrl:ModalController,
  private geolocation: Geolocation ) {
  }

 onSubmit(form:NgForm){
   console.log(form);
   
 }

 onLocate(){
  this.geolocation.getCurrentPosition().then((resp) => {
    if(resp){
      this.location.lat = resp.coords.latitude;
      this.location.lng = resp.coords.longitude;
      this.locationIsSet = true;
      console.log('My Location', this.location);
      this.onOpenMap();
    }
    // resp.coords.latitude
    // resp.coords.longitude
   }).catch((error) => {
     console.log('Error getting location', error);
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

 }

}
