import { AfterContentChecked, Component, DoCheck, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-pin-comp',
  templateUrl: './add-pin-comp.component.html',
  styleUrls: ['./add-pin-comp.component.scss']
})
export class AddPinCompComponent implements OnInit {
  title: any;
  image: any;
  privacy: any = 'private';
  customersList = JSON.parse(localStorage.getItem('customers') as string)
  collaboratorsList: any = this.customersList != null && this.customersList?.length != 0 ? this.customersList[0].title : []
  collaborators: any
  pin: any = JSON.parse(localStorage.getItem('pin') as string) || []
  file: any;
  uploader: FileUploader = new FileUploader({ url: '' });
  err: boolean = false;
  errMessage: string = '';
  @ViewChild('close')
  closebtnRef!: ElementRef;
  @ViewChild('file')
  fileRef!: ElementRef;
  @Output() closedPin: EventEmitter<any> = new EventEmitter();

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.customersList) {
      this.collaboratorsList = this.customersList.map((m: any) => {
        return m.title
      })
      this.collaborators = this.collaboratorsList[0]
    }
    this.uploader.onAfterAddingFile = (fileItem: any) => {
      // Check file size 
      if (fileItem.file.size < (5 * 1024 * 1024)) {
        this.file = fileItem._file;
      } else {
        this.err = true
        this.errMessage = 'file size should be less than 5MB'
      }
    };
  }

  ngDoCheck(): void {
    this.customersList = JSON.parse(localStorage.getItem('customers') as string)
    this.ngOnInit()
  }

  closeModal() {
    this.fileRef.nativeElement.value = ''
    this.title = ''
    this.file = ''
    this.closedPin.emit();
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      // Convert file to base64 string and create the object
      const base64String = reader.result as string;
      let pin: any = {
        title: this.title,
        image: base64String,
        collaborators: this.collaborators,
        privacy: this.privacy
      };

      // validations on submit

      if (this.title == '' || this.title == undefined || this.title == null) {
        this.err = true;
        this.errMessage = 'Title is required';
      } else if (this.file == '' || this.file == undefined || this.file == null) {
        this.err = true;
        this.errMessage = 'Image is required';
      } else {
        this.err = false
        this.errMessage = ''
        let exists = this.pin.some((obj: any) => obj.title === pin.title); // Duplicate customer check
        if (!exists) {
          this.pin.push(pin);
          // Save pin to localStorage
          localStorage.setItem('pin', JSON.stringify(this.pin));
          this.toastr.success('Pin added successfully');
          this.closebtnRef.nativeElement.click(); // Trigger modal close
        } else {
          this.err = true;
          this.errMessage = 'Pin already exists'
        }
      }

    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    if (this.file) {
      this.readFile(this.file);
    } else {
      this.err = true;
      this.errMessage = 'Image is required';
    }
  }

}
