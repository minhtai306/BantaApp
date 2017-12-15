import {Injectable, Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'search',
  pure: true
})
@Injectable()
export class SearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(radiostations: any[], searchString: string): any[] {
    console.log(searchString)
    if(searchString!=''){
      return radiostations.filter(radiostation=>{
        if(radiostation.title.includes(searchString)){
          return true;
        }
        else {
          return  false;
        }
      })
    }
    else {
      return radiostations
    }
  }
}
