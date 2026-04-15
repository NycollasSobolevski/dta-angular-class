import { Injectable } from '@angular/core';
import { Api } from './api';
import { Observable, Subject } from 'rxjs';
import { IPixel } from '../features/main-page/components/pixel/IPixel';

@Injectable({
  providedIn: 'root',
})
export class PixelApi extends Api{


  public GetAll = (): Observable<IPixel[]> => {
    return this.client.get<IPixel[]>(`${this.URL}/pixel`).pipe();
  }

  public UpdatePixel = (data: IPixel): Observable<void> => {
    return this.client.post<void>(`${this.URL}/pixel`, data).pipe()
  }

}
