import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-img-upload',
  standalone: true,
  imports: [],
  templateUrl: './img-upload.component.html',
  styleUrl: './img-upload.component.css'
})
export class ImgUploadComponent {

  imagePath: any;
  myImage:string | undefined
  constructor(private sanitizer: DomSanitizer) {}

  // for safety reasons, sanitize image
  sanitizeImage(base64String: string) {
  this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64,${base64String}`);
}
  
  onFileSelected(event: Event) {
    // Cast the event target to an HTMLInputElement to access the files property.
    const input = event.target as HTMLInputElement;
    // If there are no files selected (or the files property does not exist), exit the function.
    if (!input.files?.length) return;
    // Access the first file in the FileList object.
    const file = input.files[0];
    // Create a new FileReader object to read the content of the file.
    const reader = new FileReader();
    // Set the onload event handler for the FileReader.
    // This function is called once the read operation is successfully completed.
    reader.onload = (e) => {
      // Convert the file content to a base64 encoded string.
      const base64String = btoa(reader.result as string);
      // Call the uploadImage function and pass the base64 encoded string.
      this.uploadImage(base64String);
    };
    // Start reading the file's content as a binary string.
    reader.readAsBinaryString(file);
  }
  // Assign the string to a variable
  uploadImage(base64String: string) {
    console.log(base64String)
    this.myImage = base64String
  }
}
