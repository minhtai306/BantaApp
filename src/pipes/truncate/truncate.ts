import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TruncatePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'truncate',
  pure: true
})
export class TruncatePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  private static limit = 125;

  transform(value: string, seeMore:boolean): string {
    console.log(value)
    if(seeMore){
      return value;
    }
    else{
      return value.slice(0,TruncatePipe.limit) + " ..."
    }
  }
}
