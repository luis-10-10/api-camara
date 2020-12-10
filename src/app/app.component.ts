import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'angular-qrscanner';

  @ViewChild(QrScannerComponent, { static : false }) qrScannerComponent: QrScannerComponent ;

  ngOnInit() {
        
    }

    ngAfterViewInit(): void {
      
      this.qrScannerComponent.getMediaDevices().then(devices => {
        console.log(devices);
        const videoDevices: MediaDeviceInfo[] = [];
        for (const device of devices) {
            if (device.kind.toString() === 'videoinput') {
                videoDevices.push(device);
            }
        }
        if (videoDevices.length > 0){
            let choosenDev;
            for (const dev of videoDevices){
                if (dev.label.includes('front')){
                    choosenDev = dev;
                    break;
                }
            }
            if (choosenDev) {
                this.qrScannerComponent.chooseCamera.next(choosenDev);
            } else {
                this.qrScannerComponent.chooseCamera.next(videoDevices[1]);
            }
        }
    });

    this.qrScannerComponent.capturedQr.subscribe(result => {
        console.log(result);
        console.log(JSON.stringify(result));
    });
    }

}


/*
//import { Component } from '@angular/core';
//import { Subject } from 'rxjs';
//import {Subject} from 'rxjs';
//import {Subject} from 'rxjs-compat/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'leer-codigo-qr';

  ngOnInit() {
    
  }


 chosenCameraSubject = new Subject();
 
  decodedOutput($event: string) {
    console.log('Decoded', $event);
  }
 
  listCameras($event: MediaDeviceInfo[]) {
    console.log('MediaDeviceInfo', $event);
    this.chosenCameraSubject.next($event.filter(device => device.kind === 'videoinput')[0])
  }

}
*/