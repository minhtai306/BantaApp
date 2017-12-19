import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search';
import { TruncatePipe } from './truncate/truncate';
@NgModule({
	declarations: [SearchPipe,
    TruncatePipe],
	imports: [],
	exports: [SearchPipe,
    TruncatePipe]
})
export class PipesModule {}
