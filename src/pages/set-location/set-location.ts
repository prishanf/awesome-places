import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Location } from '../../models/location.model';


@Component({
  selector: 'page-set-location',
  templateUrl: 'set-location.html',
})
export class SetLocationPage {

  title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  location : Location;
  marker : Location;

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl: ViewController) {
   this.location  =  this.navParams.get('location');
   const isSet = this.navParams.get('isSet');
   if(isSet){
     this.marker = this.location;
   }
   console.log(this.title,this.location);
   
  }

  onSetMarker(event:any){
    console.log(event.coords.lat,event.coords.lng);
    //this.location = event.coords; 
    this.marker = new Location(event.coords.lat, event.coords.lng);
    console.log( this.marker);
    // this.location.lat = event.coords.lat;
    // this.location.lng = event.coords.lng;
  }

  onClose(){
    this.viewCtrl.dismiss({locaiotn:this.marker});
  }

  onAbort(){
    this.viewCtrl.dismiss();
  }

}
