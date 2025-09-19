import { Component, EventEmitter, inject, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { QRCodeComponent } from 'angularx-qrcode';
import { ClipboardService } from 'ngx-clipboard';
@Component({
  selector: 'app-card-share',
  imports: [QRCodeComponent],
  templateUrl: './card-share.component.html',
})
export class CardShareComponent {
  @Output() cardClosed = new EventEmitter();
  private clipboardService = inject(ClipboardService);
  cardURL = window.location.href;
  qrCodeDownloadURL: SafeUrl = '';
  copyButtonText = 'Copy URL';

  onChangeURL(url: SafeUrl) {
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
