import {inject, Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messageService = inject(MessageService);

  public showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity,
      closable: true,
      summary,
      detail,
    })
  }
}
