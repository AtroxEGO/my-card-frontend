import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { UserState } from '../card-view.component';
import { ClipboardService } from 'ngx-clipboard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-share',
  standalone: true,
  imports: [QRCodeModule],
  templateUrl: './card-share.component.html',
})
export class CardShareComponent {
  constructor(private clipboardService: ClipboardService) {}
  @Output() cardClosed = new EventEmitter();
  cardURL = window.location.href;
  qrCodeDownloadURL: SafeUrl = '';
  copyButtonText = 'Copy URL';

  onChangeURL(url: SafeUrl) {
    console.log(url);
    this.qrCodeDownloadURL = url;
  }

  handleClose() {
    this.cardClosed.emit();
  }

  handleCopy() {
    this.clipboardService.copy(this.cardURL);
    this.copyButtonText = 'Copied!';
    setTimeout(() => {
      this.copyButtonText = 'Copy URL';
    }, 1000);
  }
}
