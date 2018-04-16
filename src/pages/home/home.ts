import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { File } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  path: string;
  dirName: string = 'Demo';
  directories: Array<any> = [];

  constructor(public navCtrl: NavController, private platform: Platform, private file: File) {
    this.platform.ready().then(() => { 
      
      if (this.platform.is('ios')) {
        this.path = this.file.documentsDirectory;
      } else {
        this.path = this.file.dataDirectory;
      }

      this.listDir();

    });
  }

  createDir() {
    //console.log('path: ' + this.path);
    
    this.file.createDir(this.path, this.dirName, true)
      .then(directoryEntry => {
        console.log('DirectoryEntry: ' + JSON.stringify(directoryEntry));
        this.listDir();
      })
      .catch(error => { 
        console.log('createDir error: ' + JSON.stringify(error));
      });
  }

  removeDir() {

    this.file.removeRecursively(this.path, this.dirName)
      .then(res => {
        console.log('removeDir: ' + JSON.stringify(res));
        this.listDir();
       })
      .catch(error => { 
        console.log('removeDir error: ' + JSON.stringify(error));
      });
  }

  listDir() {

    this.file.listDir(this.path, this.dirName)
      .then(entry => { 
        this.directories = entry;
      })
      .catch(error => { 
        console.log('listDir error: ' + JSON.stringify(error));
      });
  }

}
