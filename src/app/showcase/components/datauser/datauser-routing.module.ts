import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router'
import { DataUser } from './datauser';
import { TableTemplatingDemo } from './tabletemplatingdemo';
import { TableSizeDemo } from './tablesizedemo';
import { TableGridLinesDemo } from './tablegridlinesdemo';
import { TableStripedDemo } from './tablestripeddemo';
import { TablePageDemo } from './tablepagedemo';
import { TableSortDemo } from './tablesortdemo';
import { Reprefilter } from './reprefilter';
import { TableSelectionDemo } from './tableselectiondemo';
import { TableStyleDemo } from './tablestyledemo';
import { TableLazyDemo } from './tablelazydemo';
import { TableExportDemo } from './tableexportdemo';
import { TableColGroupDemo } from './tablecolgroupdemo';
import { TableRowExpansionDemo } from './tablerowexpansiondemo';
import { TableScrollDemo } from './tablescrolldemo';
import { TableVirtualScrollDemo } from './tablevirtualscrolldemo';
import { TableFlexScrollDemo } from './tableflexscrolldemo';
import { TableColToggleDemo } from './tablecoltoggledemo';
import { Salesitem } from './salesitem';
import { TableResponsiveDemo } from './tableresponsivedemo';
import { TableContextMenuDemo } from './tablecontextmenudemo';
import { TableColResizeDemo } from './tablecolresizedemo';
import { TableReorderDemo } from './tablereorderdemo';
import { TableEditDemo } from './tableeditdemo';
import { TableRowGroupDemo } from './tablerowgroupdemo';
import { Reprekeyword } from './reprekeyword';
import { TableStickyDemo } from './tablestickydemo';
import { TableBasicDemo } from './tablebasicdemo';
import { TableDynamicDemo } from './tabledynamicdemo';

@NgModule({
	imports: [
		RouterModule.forChild([
			{ path: '', component: DataUser },
			{ path: 'page', component: TablePageDemo },
			{ path: 'basic', component: TableBasicDemo },
			{ path: 'dynamic', component: TableDynamicDemo },
            { path: 'templating', component: TableTemplatingDemo },
            { path: 'size', component: TableSizeDemo },
            { path: 'gridlines', component: TableGridLinesDemo },
            { path: 'striped', component: TableStripedDemo },
			{ path: 'sort', component: TableSortDemo },
			{ path: 'selection', component: TableSelectionDemo },
			{ path: 'reprefilter', component: Reprefilter },
			{ path: 'style', component: TableStyleDemo },
			{ path: 'lazy', component: TableLazyDemo },
			{ path: 'export', component: TableExportDemo },
			{ path: 'colgroup', component: TableColGroupDemo },
			{ path: 'rowexpansion', component: TableRowExpansionDemo },
            { path: 'scroll', component: TableScrollDemo },
            { path: 'virtualscroll', component: TableVirtualScrollDemo },
            { path: 'flexscroll', component: TableFlexScrollDemo },
			{ path: 'coltoggle', component: TableColToggleDemo },
			{ path: 'salesitem', component: Salesitem },
			{ path: 'responsive', component: TableResponsiveDemo },
			{ path: 'contextmenu', component: TableContextMenuDemo },
			{ path: 'colresize', component: TableColResizeDemo },
			{ path: 'reorder', component: TableReorderDemo },
			{ path: 'edit', component: TableEditDemo },
            { path: 'rowgroup', component: TableRowGroupDemo },
            { path: 'reprekeyword', component: Reprekeyword },
            { path: 'sticky', component: TableStickyDemo }
		])
	],
	exports: [
		RouterModule
	]
})
export class DataUserRoutingModule {}
