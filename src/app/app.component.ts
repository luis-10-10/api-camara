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
          alert(" device.kind.toString()  "+ JSON.stringify(device) )
            if (device.kind.toString() === 'videoinput') {
                videoDevices.push(device);
            } 
        }
        if (videoDevices.length > 0){
            let choosenDev;
            for (const dev of videoDevices){
              alert(dev+ " dev.label.  "+ dev.label) 
                if (dev.label.includes('front')){
                    choosenDev = dev;
                    break;
                }
            }
            alert(0 + "---"+
                  JSON.stringify(choosenDev)  +"---"+ 
                  JSON.stringify(videoDevices[0]) +"--"+ 
                  JSON.stringify(videoDevices[1]))
            if (choosenDev) {
              alert(1+ "---"+JSON.stringify(choosenDev) )
                this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
            } else {
              alert(2 + "---"+ JSON.stringify(videoDevices[0]) +"--"+ JSON.stringify(videoDevices[2]))
                this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
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