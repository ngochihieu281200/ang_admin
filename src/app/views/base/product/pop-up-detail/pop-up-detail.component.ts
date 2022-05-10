import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pop-up-detail',
  templateUrl: './pop-up-detail.component.html',
  styleUrls: ['./pop-up-detail.component.scss'],
})
export class PopUpDetailComponent implements OnInit {
  detail;
  @ViewChild(ModalDirective) public lgModal: ModalDirective;
  constructor() {}

  ngOnInit(): void {}

  showInfoModal = () => {
    console.log(this.lgModal);
    this.lgModal.show();
  };
}
