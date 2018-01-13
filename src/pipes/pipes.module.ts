import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search';
import { TruncatePipe } from './truncate/truncate';
import { AbsPipe } from './abs/abs';
@NgModule({
	declarations: [SearchPipe,
    TruncatePipe,
    AbsPipe],
	imports: [],
	exports: [SearchPipe,
    TruncatePipe,
    AbsPipe]
})
export class PipesModule {}
