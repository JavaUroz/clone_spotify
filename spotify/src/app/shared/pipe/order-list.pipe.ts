import { Pipe, PipeTransform } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';

@Pipe({
  name: 'orderList',
  //standalone: true
})
export class OrderListPipe implements PipeTransform {

  transform(value: Array<any>, args: string | null = null, sort: string = 'asc'): TracksModel[] {
    try {
      if(!args){
        return value
      } else {
        const tmpList = value.sort((a, b) => {
          if (a[args] < b[args]){
            return -1
          } else if (a[args] === b[args]){
            return 0
          } else if (a[args] > b[args]){
            return 1
          }
          return 1
        })
        return (sort === 'asc') ? tmpList : tmpList.reverse()
      }
    } catch (e) {
      console.log('Algo salió mal:\n',e)
      return value;
    }    
  }
}
